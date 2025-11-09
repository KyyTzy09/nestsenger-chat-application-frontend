import { DeletedChatTypeEnum } from "shared/enums/deleted-type";
import type { DeletedChatType } from "shared/types/deleted-chat";

export function isChatDeletedLogic(deletedData: DeletedChatType[], chat: { chatId: string, currentUserId: string }) {
    const deletedChat = deletedData?.find(({ type, chatId: deletedChatId }) => {
        return deletedChatId === chat.chatId && type === DeletedChatTypeEnum.ALL;
    });

    if (deletedChat?.userId === chat.currentUserId && deletedChat?.isDeleted === true) {
        return "deleted"
    }
    else if (deletedChat?.type === DeletedChatTypeEnum.ALL) {
        return "all";
    } else {
        return null;
    }
}

export function chatDeletedOwnedLogic(deletedData: DeletedChatType[], chat: { chatId: string, currentUserId: string, senderId: string }): boolean {
    return (
        deletedData?.some(
            ({ chatId: deletedChatId }) =>
                chat.senderId === chat.currentUserId && chat.chatId === deletedChatId
        ) ?? false
    );
}