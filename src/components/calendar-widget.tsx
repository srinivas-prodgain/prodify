"use client"

import { useState, useMemo, useEffect } from "react"
import {
    CalendarDays,
    ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MONTHS } from "@/constants/all-constants"
import { calendarEvents } from "@/data/dummy-data"
import { cn } from "@/lib/utils"
import {
    formatDateString,
    getEventsForDate,
    getWeekDates,
    navigateWeek,
} from "@/utils/date-utils"
import { CalendarWeekSelector } from "@/components/sub-components/calendar-week-selector"
import { CalendarEventList } from "@/components/sub-components/calendar-event-list"

export function CalendarWidget() {
    const today = new Date()
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)
    const [currentDate, setCurrentDate] = useState(today)
    const [selectedDate, setSelectedDate] = useState<Date | null>(today)
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth())
    const [selectedYear, setSelectedYear] = useState(today.getFullYear())

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 798)
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)

        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])



    const weekDates = useMemo(() => {
        return getWeekDates(currentDate, isSmallScreen)
    }, [currentDate, isSmallScreen])

    const displayEvents = useMemo(() => {
        if (selectedDate) {
            return getEventsForDate(calendarEvents, selectedDate)
        } else {
            const weekDateStrings = weekDates.map(date => formatDateString(date))
            return calendarEvents.filter(event => weekDateStrings.includes(event.date))
        }
    }, [calendarEvents, weekDates, selectedDate])



    const goToPreviousWeek = () => {
        const newDate = navigateWeek(currentDate, 'prev', isSmallScreen)
        setCurrentDate(newDate)
        setSelectedMonth(newDate.getMonth())
        setSelectedYear(newDate.getFullYear())
    }

    const goToNextWeek = () => {
        const newDate = navigateWeek(currentDate, 'next', isSmallScreen)
        setCurrentDate(newDate)
        setSelectedMonth(newDate.getMonth())
        setSelectedYear(newDate.getFullYear())
    }

    const handleMonthChange = (monthIndex: number) => {
        setSelectedMonth(monthIndex)
        const firstDayOfMonth = new Date(selectedYear, monthIndex, 1)
        setCurrentDate(firstDayOfMonth)
    }

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date)
    }


    return (
        <Card className="rounded-xl border py-4 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <CalendarDays className="text-brand-purple-light size-5 mr-[0.25rem]" strokeWidth={2} />
                    <CardTitle className="text-lg font-[580] mr-[0.31rem]">Calendar</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-sm hover:bg-purple-50 flex items-center gap-0 font-[550]">
                                {MONTHS[selectedMonth]}
                                <ChevronDown className="size-4 ml-1" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {MONTHS.map((month, index) => (
                                <DropdownMenuItem
                                    key={month}
                                    onClick={() => handleMonthChange(index)}
                                    className={cn(selectedMonth === index && 'bg-purple-50')}
                                >
                                    {month}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <CalendarWeekSelector
                    weekDates={weekDates}
                    selectedDate={selectedDate}
                    isSmallScreen={isSmallScreen}
                    onDateSelect={handleDateSelect}
                    onPreviousWeek={goToPreviousWeek}
                    onNextWeek={goToNextWeek}
                />

                <div className="mt-3 px-[1.5rem]">
                    <CalendarEventList
                        events={displayEvents}
                        selectedDate={selectedDate}
                    />
                </div>
            </CardContent>
        </Card>
    )
}