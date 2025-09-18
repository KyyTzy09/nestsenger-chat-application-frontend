import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Input } from "shared/shadcn/input";

type ImageCropperProps = {
  aspect?: number; // rasio crop (1 / 1, 4 / 5, 16 / 9, dll)
  cropShape?: "rect" | "round";
  setimageUpload: React.Dispatch<React.SetStateAction<Blob | null>>;
};

export default function ImageCropper({
  aspect = 1, // default square
  cropShape = "rect",
  setimageUpload,
}: ImageCropperProps) {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 }); // ⬅️ WAJIB
  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | any>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onCropComplete = useCallback(
    (_croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
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

  const handleCrop = useCallback(async () => {
    const blob = await getCroppedBlob();
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    setPreview(url);
    setimageUpload(blob);
  }, [image, croppedAreaPixels, setimageUpload]);

  return (
    <div className="flex flex-col gap-4">
      {!image && (
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setImage(URL.createObjectURL(file));
          }}
        />
      )}
      {image && (
        <div className="relative w-80 h-80 bg-black">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            cropShape={cropShape}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}
      {image && <button onClick={handleCrop}>Crop</button>}
      {preview && (
        <div>
          <h3>Preview:</h3>
          <img
            src={preview}
            alt="Cropped"
            className={`w-40 h-40 ${cropShape === "round" ? "rounded-full" : ""}`}
          />
        </div>
      )}
    </div>
  );
}
