"use client"

import { Plus } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"


type Attendee = {
    id: number
    name: string
    avatar?: string
}

type AvatarStackProps = {
    attendees: Attendee[]
    maxVisible?: number
    size?: 'sm' | 'md' | 'lg'
    className?: string
    overlapOffset?: string
    avatarBackgroundColor?: string
    overflowBackgroundColor?: string
    containerBackgroundColor?: string
}

const sizeConfig = {
    sm: {
        avatar: 'size-6',
        fontSize: 'text-[0.7rem]',
        iconSize: 'size-2',
        border: 'border-[0.1rem]'
    },
    md: {
        avatar: 'size-8',
        fontSize: 'text-[0.91rem]',
        iconSize: 'size-2.5',
        border: 'border-[0.17rem]'
    },
    lg: {
        avatar: 'size-10',
        fontSize: 'text-[1rem]',
        iconSize: 'size-3',
        border: 'border-[0.2rem]'
    }
}

export function AvatarStack({
    attendees,
    maxVisible = 4,
    size = 'md',
    className,
    overlapOffset = 'ml-[-0.50rem]',
    avatarBackgroundColor = 'bg-bg-purple-pink',
    overflowBackgroundColor = 'bg-[#6c39d3]',
    containerBackgroundColor = 'bg-white'
}: AvatarStackProps) {
    if (attendees.length === 0) {
        return null
    }

    const config = sizeConfig[size]
    const visibleAttendees = attendees.slice(0, maxVisible + 1) // +1 to handle overflow
    const remainingCount = attendees.length - maxVisible

    return (
        <div className={cn("flex items-center justify-center rounded-full", containerBackgroundColor, className)}>
            {visibleAttendees.map((attendee, i) => (
                i < maxVisible ? (
                    <div
                        key={attendee.id || i}
                        className={cn(
                            "text-sidebar-primary-foreground flex aspect-square items-center justify-center rounded-full relative overflow-hidden border-white",
                            config.avatar,
                            config.border,
                            avatarBackgroundColor,
                            i > 0 && overlapOffset
                        )}
                    >
                        <Image
                            src={attendee.avatar || ''}
                            alt={attendee.name}
                            width={size === 'sm' ? 24 : size === 'md' ? 32 : 40}
                            height={size === 'sm' ? 24 : size === 'md' ? 32 : 40}
                            className="w-full h-full object-cover rounded-full mt-2"
                        />
                    </div>
                ) : i === maxVisible && remainingCount > 0 ? (
                    <div
                        key={`overflow-${i}`}
                        className={cn(
                            "text-sidebar-primary-foreground flex aspect-square items-center justify-center rounded-full relative overflow-hidden border-0",
                            config.avatar,
                            overflowBackgroundColor,
                            i > 0 && overlapOffset
                        )}
                    >
                        <div className="flex items-center justify-center gap-[0.06rem]">
                            <Plus className={cn("text-white", config.iconSize)} strokeWidth={3} />
                            <span className={cn("text-white font-[450]", config.fontSize)}>
                                {remainingCount}
                            </span>
                        </div>
                    </div>
                ) : null
            ))}
        </div>
    )
}
