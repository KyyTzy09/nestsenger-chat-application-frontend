import { DeletedChatTypeEnum } from "shared/enums/deleted-type";
import type { DeletedChatType } from "shared/types/deleted-chat";

export function isChatDeletedLogic(deletedData: DeletedChatType[], chatId: string) {
    const deletedChat = deletedData?.find(({ chatId: deletedChatId }) => {
        return deletedChatId === chatId;
    });

    if (deletedChat?.type === DeletedChatTypeEnum.ALL && deletedChat?.isDeleted === true) {
        return "deleted"
    }
    if (deletedChat?.type === DeletedChatTypeEnum.ALL) {
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