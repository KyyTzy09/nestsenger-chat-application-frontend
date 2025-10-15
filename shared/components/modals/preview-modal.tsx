import React from "react";
import { motion } from "motion/react";
import { ArrowBigLeftIcon, ArrowLeft, XIcon } from "lucide-react";
import { Button } from "shared/shadcn/button";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import PreviewImageHeader from "../preview-image-header";

interface PreviewImageProps {
  image: string;
  isOpen: boolean;
  width: number;
  height: number;
  setIsPreviewAction: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PreviewImageModal({
  image,
  isOpen,
  width,
  height,
  setIsPreviewAction,
}: PreviewImageProps) {
  const [disablePan, setDisablePan] = React.useState<boolean>(true);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className={`${
        isOpen ? "flex" : "hidden"
      } fixed p-4 sm:p-10 w-full min-h-screen items-center justify-center bg-[#232323] z-50 top-0 bottom-0 left-0 right-0`}
    >
      <TransformWrapper
        onZoom={(era) => {
          if (era.state.scale > 1) {
            setDisablePan(false);
          } else {
            setDisablePan(true);
          }
        }}
        minScale={1}
        maxScale={5}
        panning={{ disabled: disablePan }}
        initialScale={1}
        doubleClick={{ mode: "zoomIn" }}
      >
        <TransformComponent
          wrapperClass="relative"
          contentClass={`${!disablePan ? "cursor-grab" : ""}`}
        >
          <motion.img
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: 50 }}
            transition={{ duration: 0.3 }}
            src={image}
            alt={"All"}
            width={width}
            height={height}
            draggable={false}
            className="select-none cursor-grab object-contain max-h-[90vh] max-w-[100vh] sm:max-w-[90vw]"
          />
        </TransformComponent>
        <div className="fixed flex items-center justify-between w-full gap-2 top-1 p-1">
          <PreviewImageHeader onClose={() => setIsPreviewAction(false)} />
        </div>
      </TransformWrapper>
    </motion.div>
  );
}
