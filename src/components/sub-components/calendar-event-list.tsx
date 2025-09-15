"use client"

import { CalendarDays, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AvatarStack } from "@/components/ui/avatar-stack"
import { getPlatformIcon } from "@/utils/get-meet-icons"
import { formatEventDate } from "@/utils/date-utils"
import { TCalendarEvent } from "@/types/ui"

type CalendarEventListProps = {
    events: TCalendarEvent[]
    selectedDate: Date | null
}

export function CalendarEventList({ events, selectedDate }: CalendarEventListProps) {
    if (events.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <CalendarDays className="size-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                    {selectedDate
                        ? 'No events on this date'
                        : 'No events this week'
                    }
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {events.map((event) => (
                <div key={event.id} className="rounded-xl p-4 bg-bg-purple-light md:p-7">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>
                                    {formatEventDate(event.date)}
                                </span>
                                <span>•</span>
                                <span>{event.startTime} - {event.endTime}</span>
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="size-8 p-0 hover:text-gray-600">
                                    <MoreHorizontal className="size-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Event</DropdownMenuItem>
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-white py-1 px-2 md:px-3 rounded-full">
                            {getPlatformIcon(event.platform)}
                            <span className="text-[0.81rem] text-gray-800 font-medium md:text-[0.94rem]">
                                {event.platform || event.location || 'In Person'}
                            </span>
                        </div>

                        {event.attendees.length > 0 && (
                            <AvatarStack
                                attendees={event.attendees}
                                maxVisible={4}
                                size="md"
                                avatarBackgroundColor="bg-bg-purple-pink"
                                overflowBackgroundColor="bg-[#6c39d3]"
                                containerBackgroundColor="bg-white"
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
