import { ImageDownIcon } from "lucide-react";
import React from "react";
import { Input } from "shared/shadcn/input";
import { Label } from "shared/shadcn/label";
import CropperDialog from "../../../app/features/profile/components/cropper-dialog";
import { useCropper } from "shared/contexts/cropper-context";

interface ImageInputProps {
  className: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function ImageInput({
  className,
  children,
  onClose,
}: ImageInputProps) {
  const cropper = useCropper();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onClose();
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      cropper?.setImage(url);
      cropper?.setIsOpen(true);
    }
  };

  return (
    <div className="w-full h-full">
      <Label
        htmlFor="upload"
        className={
          className ||
          "flex items-center justify-center absolute bottom-0 right-0 bg-white cursor-pointer rounded-l"
        }
      >
        {children}
      </Label>
      <input
        title="upload"
        id="upload"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
}
