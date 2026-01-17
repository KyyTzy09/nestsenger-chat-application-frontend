import React from "react";
import { Label } from "shared/shadcn/label";
import { useGetUserFriends } from "~/features/friends/hooks/friend-hook";
import PickMemberSection from "./pick-member-section";
import { Button } from "shared/shadcn/button";
import { XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface AddMemberGroupProps {
  onOpen: boolean;
  onClose: () => void;
}

export default function AddMemberGroup({
  onOpen,
  onClose,
}: AddMemberGroupProps) {
  const { data: userFriendsResponse } = useGetUserFriends();

  return (
    <AnimatePresence>
      {onOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-30 bg-black/30"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed flex flex-col items-center w-full md:w-[350px] max-w-[350px] h-[30rem] p-2 top-[5%] md:right-[35%] z-50 bg-[#353535] text-white rounded-md"
          >
            <section className="flex flex-col w-full h-full p-2 gap-2">
              <div className="flex items-center justify-between w-full">
                <Label className="text-white font-semibold text-lg">
                  Tambahkan Anggota
                </Label>
                <Button
                  onClick={onClose}
                  className="p-0 w-5 h-5 bg-transparent hover:bg-transparent"
                >
                  <XIcon className="w-full h-full" />
                </Button>
              </div>
              <PickMemberSection data={userFriendsResponse?.data as []} />
            </section>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
