import React, { createContext } from "react";

interface CropperProviderProps {
  children: React.ReactNode;
}

type CropperContextType = {
  isOpen: boolean;
  image: string | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
};

const CropperContext = React.createContext<CropperContextType | null>(null);
export function CropperProvider({ children }: CropperProviderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [image, setImage] = React.useState<string | null>(null);

  return (
    <CropperContext.Provider value={{ isOpen, image, setIsOpen, setImage }}>
      {children}
    </CropperContext.Provider>
  );
}

export const useCropper = () => React.useContext(CropperContext);
