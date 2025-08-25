"use client"

import { useState, useMemo, useEffect } from "react"
import {
    CalendarDays,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { MONTHS, DAYS } from "@/constants/all-constants"
import { calendarEvents } from "@/data/dummydata"
import { getPlatformIcon } from "@/utils/get-meet-icons"

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

    const formatDateString = (date: Date): string => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const getWeekDates = useMemo(() => {
        const startOfWeek = new Date(currentDate)
        const dayOfWeek = startOfWeek.getDay()

        const daysToShow = isSmallScreen ? 5 : 7

        if (isSmallScreen) {
            startOfWeek.setDate(startOfWeek.getDate() - 1)
        } else {
            startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek)
        }

        const weekDates = []
        for (let i = 0; i < daysToShow; i++) {
            const date = new Date(startOfWeek)
            date.setDate(startOfWeek.getDate() + i)
            weekDates.push(date)
        }

        return weekDates
    }, [currentDate, isSmallScreen])

    const displayEvents = useMemo(() => {
        if (selectedDate) {
            const selectedDateString = formatDateString(selectedDate)
            return calendarEvents.filter(event => event.date === selectedDateString)
        } else {
            const weekDateStrings = getWeekDates.map(date => formatDateString(date))
            return calendarEvents.filter(event => weekDateStrings.includes(event.date))
        }
    }, [calendarEvents, getWeekDates, selectedDate])

    const getEventsForDate = (date: Date) => {
        const dateString = formatDateString(date)
        return calendarEvents.filter(event => event.date === dateString)
    }

    const goToPreviousWeek = () => {
        const newDate = new Date(currentDate)
        const daysToNavigate = isSmallScreen ? 5 : 7
        newDate.setDate(newDate.getDate() - daysToNavigate)
        setCurrentDate(newDate)
        setSelectedMonth(newDate.getMonth())
        setSelectedYear(newDate.getFullYear())
    }

    const goToNextWeek = () => {
        const newDate = new Date(currentDate)
        const daysToNavigate = isSmallScreen ? 5 : 7
        newDate.setDate(newDate.getDate() + daysToNavigate)
        setCurrentDate(newDate)
        setSelectedMonth(newDate.getMonth())
        setSelectedYear(newDate.getFullYear())
    }

    const handleMonthChange = (monthIndex: number) => {
        setSelectedMonth(monthIndex)
        const firstDayOfMonth = new Date(selectedYear, monthIndex, 1)
        setCurrentDate(firstDayOfMonth)
    }

    const isToday = (date: Date) => {
        const today = new Date()
        return date.toDateString() === today.toDateString()
    }

    const isSelected = (date: Date) => {
        if (!selectedDate) return false
        return date.toDateString() === selectedDate.toDateString()
    }

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date)
    }


    return (
        <Card className="rounded-xl border py-4 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <CalendarDays className="text-[#8379c9] size-5 mr-[0.25rem]" strokeWidth={2} />
                    <CardTitle className="text-lg font-[580] mr-[0.3125rem]">Calendar</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-sm text-black hover:bg-purple-50 flex items-center gap-0 font-[550]">
                                {MONTHS[selectedMonth]}
                                <ChevronDown className="size-4 ml-1" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {MONTHS.map((month, index) => (
                                <DropdownMenuItem
                                    key={month}
                                    onClick={() => handleMonthChange(index)}
                                    className={selectedMonth === index ? 'bg-purple-50' : ''}
                                >
                                    {month}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="flex items-center px-[0.875rem]">
                    <div className="w-10 flex justify-start">
                        <Button variant="ghost" size="sm" onClick={goToPreviousWeek} className="flex-shrink-0 p-0">
                            <ChevronLeft className="size-4" />
                        </Button>
                    </div>
                    <div className={`flex gap-1 flex-1 ${isSmallScreen ? 'justify-center' : 'justify-between'}`}>
                        {getWeekDates.map((date, index) => {
                            const todayCheck = isToday(date)
                            const selected = isSelected(date)
                            const isEvent = getEventsForDate(date).length > 0

                            let bgClass = 'hover:bg-purple-50'
                            let textClass = 'text-gray-400'

                            if (selected) {
                                bgClass = 'bg-[#736edf] text-white'
                                textClass = 'text-white'
                            } else if (todayCheck) {
                                bgClass = 'bg-blue-500 text-white'
                                textClass = 'text-white'
                            }

                            return (
                                <div
                                    key={index}
                                    onClick={() => handleDateSelect(date)}
                                    className={`text-center p-1 rounded-lg ${isSmallScreen ? 'min-w-[2.5rem]' : 'min-w-[2.8rem]'} cursor-pointer transition-all ${bgClass} relative`}
                                >
                                    <div className={`text-xs font-medium ${textClass}`}>
                                        {DAYS[date.getDay()]}
                                    </div>
                                    <div className="text-lg font-semibold">{String(date.getDate()).padStart(2, '0')}</div>
                                    {isEvent && (
                                        <div className="size-1 rounded-full mx-auto bg-[#736edf] absolute bottom-0 left-1/2 -translate-x-1/2" />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <div className="w-10 flex justify-end">
                        <Button variant="ghost" size="sm" onClick={goToNextWeek} className="flex-shrink-0 p-0">
                            <ChevronRight className="size-4" />
                        </Button>
                    </div>
                </div>

                <div className="space-y-3 mt-3 px-[1.5rem]">
                    {displayEvents.length > 0 ? (
                        displayEvents.map((event) => (
                            <div key={event.id} className="rounded-xl p-4 bg-[#f5f6ff] md:p-7">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <span>
                                                {isToday(new Date(event.date))
                                                    ? 'Today'
                                                    : new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
                                                }
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
                                        <span className="text-[0.8125rem] text-gray-800 font-medium md:text-[0.9375rem]">
                                            {event.platform || event.location || 'In Person'}
                                        </span>
                                    </div>

                                    {event.attendees.length > 0 && (
                                        <div className="flex items-center justify-center bg-white rounded-full">
                                            {event.attendees.slice(0, 5).map((attendee, i) => (
                                                i < 4 ? (
                                                    <div
                                                        key={i}
                                                        className={`text-sidebar-primary-foreground flex aspect-square items-center justify-center rounded-full relative bg-[#ded1f1] size-8 overflow-hidden border-[0.16875rem] border-white ${i > 0 ? 'ml-[-0.5rem]' : ''}`}
                                                    >
                                                        <Image
                                                            src={attendee.avatar || ''}
                                                            alt={attendee.name}
                                                            width={32}
                                                            height={32}
                                                            className="w-full h-full object-cover rounded-full mt-2"
                                                        />
                                                    </div>
                                                ) : i === 4 ? (
                                                    <div
                                                        key={i}
                                                        className={`text-sidebar-primary-foreground flex aspect-square items-center justify-center rounded-full relative bg-[#6c39d3] size-8 overflow-hidden border-0 ${i > 0 ? 'ml-[-0.5rem]' : ''}`}
                                                    >
                                                        <div className="flex items-center justify-center gap-[0.0625rem]">
                                                            <Plus className="size-2 text-white" strokeWidth={3} />
                                                            <span className="text-white text-[0.75rem] font-[450]">
                                                                {event.attendees.length - 4}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : null
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <CalendarDays className="size-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">
                                {selectedDate
                                    ? 'No events on this date'
                                    : 'No events this week'
                                }
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}