import type { ChatType } from "./chat-type"

export type ChatMediaType = {
    chatId: string
    mediaUrl: string
    createdAt: Date
    updatedAt: Date

    chat: ChatType
}

// model ChatMedia {
//   chatId    String   @id @default(ulid())
//   mediaUrl  String
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//   chat Chat @relation("Chat Media", fields: [chatId], references: [chatId], onUpdate: Cascade, onDelete: Cascade)
// }