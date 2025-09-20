import { CheckIcon, LoaderIcon, XIcon } from "lucide-react";
import React from "react";
import Cropper, { type Area } from "react-easy-crop";
import { Button } from "shared/shadcn/button";

interface ImageCropperProps {
  image: string | null;
  width: number;
  height: number;
  aspect?: number;
  cropShape?: "rect" | "round";
  isCrop: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  setimageUpload: React.Dispatch<React.SetStateAction<Blob | null>>;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  setIsCrop: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ImageCropper({
  image,
  width,
  height,
  isLoading = false,
  aspect = 1,
  cropShape = "rect",
  isCrop,
  onSuccess = () => {},
  onClose,
  setImage,
  setimageUpload,
  setIsCrop,
}: ImageCropperProps) {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<null | Area>(
    null
  );

  const onCropComplete = React.useCallback(
    (_croppedArea: Area, croppedArea: Area) => {
      setCroppedAreaPixels(croppedArea);
    },
    []
  );

  const getCroppedBlob = async (): Promise<Blob | null> => {
    if (!image || !croppedAreaPixels) return null;

    const img = new Image();
    img.src = image;
    await new Promise((res) => (img.onload = res));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const { x, y, width, height } = croppedAreaPixels;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

    return new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg");
    });
  };

  const handleCrop = React.useCallback(async () => {
    const blob = await getCroppedBlob();
    if (!blob) return;
    setimageUpload(blob);
    const url = URL.createObjectURL(blob);
    setImage(url);
    onSuccess();
  }, [image, croppedAreaPixels]);

  const cropperButtons = [
    {
      Icon: XIcon,
      action: onClose,
      iconClass: "",
    },
    {
      Icon: isLoading && isLoading === true ? LoaderIcon : CheckIcon,
      action: async () => await handleCrop(),
      iconClass: isLoading ? "animate-spin" : "",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <section className="bg-[#202020] w-full flex items-center justify-start p-2">
        {cropperButtons.map(({ action, Icon, iconClass }) => {
          return (
            <Button
              onClick={action}
              className="bg-transparent hover:bg-[#303030]"
              type="button"
            >
              <Icon className={iconClass} />
            </Button>
          );
        })}
      </section>
      <section
        className={`flex items-center justify-center w-full h-full bg-black`}
      >
        {image && !isCrop && (
          <div className={`relative w-full h-full min-h-[300px]`}>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              zoomSpeed={0.2}
              aspect={aspect}
              cropShape={cropShape}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        )}
      </section>
    </div>
  );
}
