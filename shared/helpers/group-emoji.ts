import type { AliasType } from "shared/types/alias-type";
import type { FriendType } from "shared/types/friend-type";
import type { ReactionType } from "shared/types/reaction-type";
import type { UserType } from "shared/types/user-type";

export function reactionGroupper(emoji: { reaction: ReactionType, user: AliasType}[]): { emoji: string, count: number }[] {
    const groupped = emoji?.reduce((acc, curr) => {
        const emoji = curr.reaction.content
        if (!acc[emoji]) {
            acc[emoji] = {
                emoji: emoji,
                count: 1,
            };
        } else {
            acc[emoji].count++;
        }

        return acc
    }, {} as Record<string, { emoji: string, count: number }>)
    return Object.values(groupped ? groupped : [])
}