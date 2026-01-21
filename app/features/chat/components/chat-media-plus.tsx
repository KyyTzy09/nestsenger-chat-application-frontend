import { PlusIcon } from 'lucide-react'
import React from 'react'
import { Input } from 'shared/shadcn/input'
import { Label } from 'shared/shadcn/label'
import { useCreateMediaStore } from '../stores/create-media-store'
import { GetMediaType } from './logic/media-type-logic'

export default function ChatMediaPlusInput() {
    const { chat, setChat } = useCreateMediaStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const medias = [...e.target.files]
            const chatData = medias.map((file) => {
                return {
                    file,
                    fileUrl: URL.createObjectURL(file),
                    fileType: GetMediaType(file.name),
                }
            })
            const newChats = [...chat!, ...chatData]
            setChat(newChats)
        }
    }

    return (
        <Label
            htmlFor='input-media'
            onClick={() => { }}
            className="w-12 h-12 rounded-sm overflow-hidden bg-[#232323] border-white border hover:bg-[#303030] cursor-pointer"
        >
            <div className="flex items-center justify-center w-full h-full p-1">
                <PlusIcon
                    strokeWidth={2}
                    className="w-8 h-8 text-white"
                />
            </div>
            <Input multiple onChange={handleChange} id='input-media' accept='image/*,video/*' type='file' className='hidden' />
        </Label>
    )
}
