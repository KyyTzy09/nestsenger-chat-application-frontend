import React from "react";
import { Link, useParams } from "react-router";
import { defaultImage } from "shared/constants/image-default";
import { RoomTypeEnum } from "shared/enums/room-type";
import type { FriendType } from "shared/types/friend-type";
import type { RoomType } from "shared/types/room-type";
import type { UserType } from "shared/types/user-type";
import RoomLastChatSection from "../section/room-lastchat-section";
import { motion } from "motion/react";
import type { AliasType } from "shared/types/alias-type";

interface RoomCardProps {
  data:
    | {
        room: RoomType;
        user?: AliasType;
      }[]
    | [];
}

export default function RoomCard({ data }: RoomCardProps) {
  const params = useParams<{ roomId: string }>();
  return (
    <div className="flex flex-col items-center justify-start w-full h-full gap-2">
      {data?.map(({ room, user }, index) => {
        return (
          <motion.div
            className={`${params.roomId === room.roomId ? "bg-[#45494f]" : "bg-transparent"} flex items-center justify-start w-full h-[70px] rounded-sm p-2 hover:bg-[#45494f]/50`}
            initial={{ translateY: 20, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ opacity: 0, translateY: -20 }}
            transition={{ duration: 0.5 }}
          >
            {" "}
            <Link
              to={`/chat/${room.roomId}`}
              key={index}
              className="flex w-full h-full gap-2"
            >
              <section className="w-16 h-full rounded-full overflow-hidden">
                <img
                  src={
                    user && room.type === RoomTypeEnum.PRIVATE
                      ? user.avatar
                      : room.avatar || defaultImage
                  }
                  alt="Default"
                  className="w-full h-full"
                />
              </section>
              <RoomLastChatSection room={room!} alias={user!} />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
