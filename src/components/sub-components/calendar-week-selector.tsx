"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DAYS } from "@/constants/all-constants"
import { calendarEvents } from "@/data/dummy-data"
import { cn } from "@/lib/utils"
import {
    isToday,
    isSameDay,
    getEventsForDate,
} from "@/utils/date-utils"

interface CalendarWeekSelectorProps {
    weekDates: Date[]
    selectedDate: Date | null
    isSmallScreen: boolean
    onDateSelect: (date: Date) => void
    onPreviousWeek: () => void
    onNextWeek: () => void
}

export function CalendarWeekSelector({
    weekDates,
    selectedDate,
    isSmallScreen,
    onDateSelect,
    onPreviousWeek,
    onNextWeek,
}: CalendarWeekSelectorProps) {
    const isSelected = (date: Date) => {
        if (!selectedDate) return false
        return isSameDay(date, selectedDate)
    }

    return (
        <div className="flex items-center px-[0.88rem]">
            <div className="w-10 flex justify-start">
                <Button variant="ghost" size="sm" onClick={onPreviousWeek} className="flex-shrink-0 p-0">
                    <ChevronLeft className="size-4" />
                </Button>
            </div>
            <div className={cn(
                "flex gap-1 flex-1",
                isSmallScreen ? "justify-center" : "justify-between"
            )}>
                {weekDates.map((date, index) => {
                    const todayCheck = isToday(date)
                    const selected = isSelected(date)
                    const isEvent = getEventsForDate(calendarEvents, date).length > 0

                    let bgClass = 'hover:bg-purple-50'
                    let textClass = 'text-gray-400'

                    if (selected) {
                        bgClass = 'bg-brand-purple-light text-white'
                        textClass = 'text-white'
                    } else if (todayCheck) {
                        bgClass = 'bg-blue-500 text-white'
                        textClass = 'text-white'
                    }

                    return (
                        <div
                            key={index}
                            onClick={() => onDateSelect(date)}
                            className={cn(
                                "text-center p-1 rounded-lg cursor-pointer transition-all relative",
                                isSmallScreen ? "min-w-[2.5rem]" : "min-w-[2.8rem]",
                                bgClass
                            )}
                        >
                            <div className={cn("text-xs font-medium", textClass)}>
                                {DAYS[date.getDay()]}
                            </div>
                            <div className="text-lg font-semibold">{String(date.getDate()).padStart(2, '0')}</div>
                            {isEvent && (
                                <div className="size-1 rounded-full mx-auto bg-brand-purple-light absolute bottom-0 left-1/2 -translate-x-1/2" />
                            )}
                        </div>
                    )
                })}
            </div>
            <div className="w-10 flex justify-end">
                <Button variant="ghost" size="sm" onClick={onNextWeek} className="flex-shrink-0 p-0">
                    <ChevronRight className="size-4" />
                </Button>
            </div>
        </div>
    )
}
