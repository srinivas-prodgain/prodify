"use client"

import {
    Bell,
    Trash2,
    Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { TReminder } from "@/types/ui"

type ReminderItemProps = {
    reminder: TReminder
    onNotify?: (reminderId: number) => void
    onDelete?: (reminderId: number) => void
    onComplete?: (reminderId: number) => void
}

export const ReminderItem = ({
    reminder,
    onNotify,
    onDelete,
    onComplete
}: ReminderItemProps) => {
    const handleNotify = () => {
        onNotify?.(reminder.id)
    }

    const handleDelete = () => {
        onDelete?.(reminder.id)
    }

    const handleComplete = () => {
        onComplete?.(reminder.id)
    }

    return (
        <div className="flex items-start justify-between gap-3 p-3 pl-0 transition-colors border-b-2 border-[#f2f3f7] cursor-pointer">
            <div className="flex items-start gap-3 flex-1">
                <div className="flex-1 min-w-0">
                    <p className="text-[0.94rem] text-foreground leading-relaxed font-[550]">
                        {reminder.text}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <Button
                    variant="ghost"
                    size="sm"
                    className="size-9 p-0 hover:bg-blue-50 hover:text-blue-600"
                    onClick={handleNotify}
                >   
                    <Bell className="size-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="size-9 p-0 hover:bg-red-50 hover:text-red-600"
                    onClick={handleDelete}
                >
                    <Trash2 className="size-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="size-6 p-0 bg-[#30d5d1] text-white rounded-full hover:bg-[#30d5d1]/80 hover:text-white"
                    onClick={handleComplete}
                >
                    <Check />
                </Button>
            </div>
        </div>
    )
}
