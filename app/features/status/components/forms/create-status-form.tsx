import {
  CropIcon,
  Loader2Icon,
  Music2Icon,
  RedoDotIcon,
  SendIcon,
  SmileIcon,
  Trash2Icon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import { defaultImage } from "shared/constants/image-default";
import { Button } from "shared/shadcn/button";
import { cn } from "~/lib/utils";
import AlertModal from "shared/components/modals/alert-modal";
import { useCreateStatusStore } from "../../stores/create-status-store";
import ChatEmojiPicker from "~/features/chat/components/chat-emoji";

export default function CreateStatusForm() {
  // Store
  const { statuses, resetState } = useCreateStatusStore();
  // State
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [deletedStatusesUrl, setDeletedStatusesUrl] = React.useState<string[]>(
    []
  );
  const [statusMessages, setStatusMessages] = React.useState<
    { index: number; message: string }[]
  >([]);
  const [showEmoji, setShowEmoji] = React.useState<boolean>(false);
  const [showAlert, setShowAlert] = React.useState<boolean>(false);

  // Message validation
  const isValidMessage =
    selectedIndex >= 0 && selectedIndex < statusMessages?.length;

  // Mutation

  // Data Mutation
  const filteredStatuses = statuses?.filter(({ fileUrl }) => {
    return !deletedStatusesUrl.includes(fileUrl);
  });

  const selectedStatus = filteredStatuses?.find((_, i) => {
    return i === selectedIndex;
  });

  // Header items
  const headerMenu = [
    {
      title: "Potong",
      Icon: CropIcon,
      action: () => {},
      enable: selectedStatus?.fileType === "image",
    },
    {
      title: "Putar",
      Icon: RedoDotIcon,
      action: () => {},
      enable: selectedStatus?.fileType === "image",
    },
    {
      title: "Hapus",
      Icon: Trash2Icon,
      action: () => handleDelete(selectedStatus?.fileUrl || ""),
      enable: true,
    },
  ];

  // Handler Delete
  const handleDelete = (mediaUrl: string) => {
    if (mediaUrl !== "") {
      if (
        deletedStatusesUrl?.length > 0 &&
        deletedStatusesUrl.includes(mediaUrl)
      ) {
        setDeletedStatusesUrl((prev) => [...prev]);
      } else {
        setDeletedStatusesUrl((prev) => [...prev, mediaUrl]);
      }
      setSelectedIndex(filteredStatuses?.length! - 2);
    }
  };

  // Normal Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (filteredStatuses && filteredStatuses?.length > 0) {
      await Promise.all(filteredStatuses?.map((status, i) => {}));
      resetState();
    }
  };

  // Enter Submit
  const handleEnterSubmit = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  // Handle initial render
  React.useEffect(() => {
    setDeletedStatusesUrl([]);
    if ((statuses?.length as number) > 0) {
      setSelectedIndex((statuses?.length as number) - 1);
      const initialMessage = statuses?.map((_, i) => {
        return {
          i,
          message: "",
        };
      }) as [];
      setStatusMessages(initialMessage);
    }
  }, [statuses]);

  return (
    <AnimatePresence>
      {statuses && (filteredStatuses?.length as number) > 0 && (
        <>
          <AlertModal
            onOpen={showAlert}
            setOnOpen={setShowAlert}
            alertDesc="Yakin ingin membatalkan?"
            alertTitle="Batalkan?"
            onConfirm={() => {
              resetState();
              setShowAlert(false);
            }}
          />
          <ChatEmojiPicker
            isOpen={showEmoji}
            onClose={() => setShowEmoji(false)}
            onSelect={(emoji) =>
              setStatusMessages((prev) =>
                prev.map((item, i) =>
                  i === selectedIndex
                    ? {
                        ...item,
                        message: item.message + emoji,
                      }
                    : item
                )
              )
            }
          />
          <motion.div
            onClick={() => setShowAlert(true)}
            className="top-0 left-0 fixed w-full h-full bg-black/60 z-50"
          />
          <motion.form
            onSubmit={handleSubmit}
            initial={{ translateY: 50, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: 50, opacity: 0 }}
            className="absolute flex flex-col items-center justify-between min-w-[40%] min-h-[60%] w-auto max-w-[50%] max-h-[90%] rounded-sm bg-[#252525]/70 text-white shadow-lg backdrop-blur border-black border bottom-5 left-10 z-50 overflow-hidden"
          >
            <section className="flex items-center justify-start w-full h-[10%] bg-[#141414] px-2 py-1 gap-2">
              {headerMenu.map(({ title, Icon, action, enable }, i) => {
                return (
                  <React.Fragment key={i}>
                    {enable && (
                      <Button
                        key={i}
                        title={title}
                        onClick={action}
                        type="button"
                        className="w-10 h-10 p-1 bg-transparent hover:bg-gray-600"
                      >
                        <Icon />
                      </Button>
                    )}
                  </React.Fragment>
                );
              })}
            </section>
            {selectedStatus && (
              <section className="flex items-center justify-center min-w-[40%] max-w-[90%] max-h-[60vh] overflow-hidden bg-black/20">
                {selectedStatus.fileType === "image" ? (
                  <img
                    className="w-auto h-auto max-w-full max-h-full object-contain"
                    src={selectedStatus.fileUrl ?? defaultImage}
                    alt="default"
                  />
                ) : (
                  <video
                    className="w-auto h-auto max-w-full max-h-full object-contain"
                    src={selectedStatus.fileUrl}
                    controls
                  ></video>
                )}
              </section>
            )}
            {/* Input */}
            <section className="flex flex-col items-center justify-center w-full h-[20%] bg-[#141414] py-2 px-5 gap-5">
              <div className="flex items-start justify-between w-full h-auto gap-1">
                <Button
                  onClick={() => setShowEmoji(true)}
                  type="button"
                  className="w-9 h-9 p-1 bg-transparent hover:bg-gray-600"
                >
                  <SmileIcon />
                </Button>
                <TextAreaAutoSize
                  value={
                    isValidMessage ? statusMessages[selectedIndex]?.message : ""
                  }
                  onKeyDown={handleEnterSubmit}
                  onChange={(e) => {
                    setStatusMessages((prev) =>
                      prev.map((item, i) =>
                        i === selectedIndex
                          ? { ...item, message: e.target.value }
                          : item
                      )
                    );
                  }}
                  minRows={1}
                  maxRows={5}
                  placeholder="Ketik Pesan"
                  className={cn(
                    "w-full min-h-7 text-white resize-none no-scrollbar text-justify p-2 text-sm",
                    "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring"
                  )}
                />
                <Button
                  type="submit"
                  className="flex items-center justify-center w-8 h-8 p-1 bg-transparent hover:bg-gray-600"
                >
                  {false ? (
                    <Loader2Icon className="w-full h-full animate-spin" />
                  ) : (
                    <SendIcon className="w-full h-full " />
                  )}
                </Button>
              </div>
              {/* Card */}
              <div className="flex items-center justify-center w-full gap-2">
                {(statuses?.length as number) > 0 &&
                  filteredStatuses?.map(({ file, fileUrl, fileType }, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() => setSelectedIndex(i)}
                        className={`w-12 h-12 rounded-sm overflow-hidden ${selectedIndex === i ? "border-blue-500 border-3" : "border-1"}`}
                      >
                        {fileType === "image" ? (
                          <img
                            className="w-full h-full object-cover"
                            src={fileUrl}
                            alt={file.name}
                          />
                        ) : fileType === "video" ? (
                          <video
                            src={fileUrl}
                            className="w-full h-full object-cover"
                          ></video>
                        ) : (
                          <div className="w-full h-full p-1">
                            <Music2Icon
                              strokeWidth={2}
                              className="w-full h-full text-white"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </section>
          </motion.form>
        </>
      )}
    </AnimatePresence>
  );
}
