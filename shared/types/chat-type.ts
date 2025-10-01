import type { RoomType } from "./room-type"
import type { UserType } from "./user-type"

export type ChatType = {
    chatId: string

    userId: string
    roomId: string
    message: string
    createdAt: Date
    updatedAt: Date

    sender: UserType
    room: RoomType
    lastChatOf: RoomType[]
}

// model Chat {
//   chatId String @id @default(ulid())

//   userId    String
//   roomId    String
//   message   String   @db.Text
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//   sender     User   @relation("Chat Sender", fields: [userId], references: [userId], onDelete: Cascade, onUpdate: Cascade)
//   room       Room?  @relation("Room Chats", fields: [roomId], references: [roomId], onDelete: Cascade, onUpdate: Cascade)
//   lastChatOf Room[] @relation("Room Last Chat")
// }