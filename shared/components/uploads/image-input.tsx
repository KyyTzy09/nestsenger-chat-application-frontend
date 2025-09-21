import React from "react";
import { Label } from "shared/shadcn/label";

interface ImageInputProps {
  className: string;
  children: React.ReactNode;
  setImage: (show: string) => void;
  onComplete?: () => void;
  onClose: () => void;
}

export default function ImageInput({
  className,
  children,
  setImage,
  onComplete,
  onClose,
}: ImageInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      if (onComplete) onComplete();
      onClose();
    }
    e.target.value = "";
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
