import { AlignCenterIcon, ArrowLeft, RefreshCwIcon } from "lucide-react";
import React from "react";
import { FaCentercode, FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import { useControls } from "react-zoom-pan-pinch";
import { Button } from "shared/shadcn/button";

interface PreviewImageHeaderProps {
  onClose: () => void;
}

export default function PreviewImageHeader({
  onClose,
}: PreviewImageHeaderProps) {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  const previewMenuButton = [
    {
      Icon: FaSearchMinus,
      action: () => zoomOut(),
    },
    {
      Icon: FaSearchPlus,
      action: () => zoomIn(),
    },
    {
      Icon: RefreshCwIcon,
      action: () => resetTransform()
    },
  ];
  return (
    <div className="flex items-center justify-between w-full gap-2">
      <Button
        onClick={onClose}
        className="group w-10 h-10 bg-transparent p-0 flex items-center justify-center hover:bg-[#353535]"
      >
        <ArrowLeft
          strokeWidth={4}
          className="w-full h-full text-gray-400 group-hover:text-white transition duration-700"
        />
      </Button>
      <div className="flex items-center justify-center gap-1">
        {previewMenuButton.map(({ Icon, action }, i) => {
          return (
            <Button
              key={i}
              onClick={action}
              className="group w-10 h-10 bg-transparent p-0 flex items-center justify-center hover:bg-[#353535]"
            >
              <Icon
                strokeWidth={4}
                className="w-full h-full text-gray-400 group-hover:text-white transition duration-700"
              />
            </Button>
          );
        })}
      </div>
    </div>
  );
}
