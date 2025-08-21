"use client"

import { useState, useMemo } from "react"
import {
    CalendarDays,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TCalendarEvent } from "@/types/ui"

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']


const events: TCalendarEvent[] = [
    {
        id: 1,
        title: "Team Sprint Planning",
        date: "2025-09-13",
        startTime: "09:00",
        endTime: "10:30",
        type: "meeting",
        platform: "Google Meet",
        attendees: [
            { id: 1, name: "Sarah Chen", avatar: "" },
            { id: 2, name: "Mike Johnson", avatar: "" },
            { id: 3, name: "Lisa Wang", avatar: "" },
            { id: 4, name: "David Kim", avatar: "" }
        ],
        description: "Weekly sprint planning and backlog grooming",
        priority: "High"
    },
    {
        id: 2,
        title: "Client Demo - Product Launch",
        date: "2026-03-20",
        startTime: "14:00",
        endTime: "15:00",
        type: "meeting",
        platform: "Zoom",
        attendees: [
            { id: 5, name: "John Smith", avatar: "" },
            { id: 6, name: "Emma Davis", avatar: "" }
        ],
        description: "Demo new features to client stakeholders",
        priority: "High"
    },
    {
        id: 3,
        title: "1:1 with Manager",
        date: "2025-08-23",
        startTime: "11:00",
        endTime: "11:30",
        type: "meeting",
        platform: "Google Meet",
        attendees: [
            { id: 7, name: "Alex Rodriguez", avatar: "" }
        ],
        description: "Weekly check-in and performance review",
        priority: "Medium"
    },
    {
        id: 4,
        title: "Design Review Session",
        date: "2025-08-10",
        startTime: "15:30",
        endTime: "16:30",
        type: "meeting",
        location: "Conference Room A",
        attendees: [
            { id: 8, name: "Jessica Brown", avatar: "" },
            { id: 9, name: "Tom Wilson", avatar: "" },
            { id: 10, name: "Amy Liu", avatar: "" }
        ],
        description: "Review mockups for new dashboard design",
        priority: "Medium"
    },
    {
        id: 5,
        title: "All Hands Meeting",
        date: "2025-12-27",
        startTime: "10:00",
        endTime: "11:00",
        type: "meeting",
        platform: "Microsoft Teams",
        attendees: [],
        description: "Monthly company-wide update meeting",
        priority: "Low"
    },
    {
        id: 6,
        title: "Weekend Project Review",
        date: "2026-03-21",
        startTime: "16:00",
        endTime: "17:00",
        type: "meeting",
        location: "Office",
        attendees: [
            { id: 11, name: "Chris Martin", avatar: "" },
            { id: 12, name: "Taylor Swift", avatar: "" }
        ],
        description: "Review weekend project progress and next steps",
        priority: "Medium"
    }
]




export function CalendarWidget() {
    const today = new Date()
    const [currentDate, setCurrentDate] = useState(today)
    const [selectedDate, setSelectedDate] = useState<Date | null>(today)
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth())
    const [selectedYear, setSelectedYear] = useState(today.getFullYear())

    const formatDateString = (date: Date): string => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const getWeekDates = useMemo(() => {
        const startOfWeek = new Date(currentDate)
        const dayOfWeek = startOfWeek.getDay()

        startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek)

        const weekDates = []
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek)
            date.setDate(startOfWeek.getDate() + i)
            weekDates.push(date)
        }

        return weekDates
    }, [currentDate])

    const displayEvents = useMemo(() => {
        if (selectedDate) {
            const selectedDateString = formatDateString(selectedDate)
            return events.filter(event => event.date === selectedDateString)
        } else {
            const weekDateStrings = getWeekDates.map(date => formatDateString(date))
            return events.filter(event => weekDateStrings.includes(event.date))
        }
    }, [events, getWeekDates, selectedDate])

    const getEventsForDate = (date: Date) => {
        const dateString = formatDateString(date)
        return events.filter(event => event.date === dateString)
    }

    const goToPreviousWeek = () => {
        const newDate = new Date(currentDate)
        newDate.setDate(newDate.getDate() - 7)
        setCurrentDate(newDate)
        setSelectedMonth(newDate.getMonth())
        setSelectedYear(newDate.getFullYear())
    }

    const goToNextWeek = () => {
        const newDate = new Date(currentDate)
        newDate.setDate(newDate.getDate() + 7)
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
        <Card className="rounded-xl border shadow-sm min-w-[540px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-[#8379c9]" />
                    <CardTitle className="text-lg font-[580]">Calendar</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:bg-purple-50 hover:text-[#6742ED]">
                                {MONTHS[selectedMonth]}
                                <ChevronDown className="w-4 h-4 ml-1" />
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
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" onClick={goToPreviousWeek} className="flex-shrink-0">
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="flex gap-2 flex-1 justify-between mx-5">
                        {getWeekDates.map((date, index) => {
                            const todayCheck = isToday(date)
                            const selected = isSelected(date)
                            const isEvent = getEventsForDate(date).length > 0

                            // Determine background and text colors
                            let bgClass = 'hover:bg-purple-50'
                            let textClass = 'text-gray-500'

                            if (selected) {
                                // Selected date - purple background
                                bgClass = 'bg-[#6742ED] text-white'
                                textClass = 'text-white'
                            } else if (todayCheck) {
                                // Today's date - blue background
                                bgClass = 'bg-blue-500 text-white'
                                textClass = 'text-white'
                            }

                            return (
                                <div
                                    key={index}
                                    onClick={() => handleDateSelect(date)}
                                    className={`text-center p-1 rounded-lg min-w-[3rem] cursor-pointer transition-all ${bgClass}`}
                                >
                                    <div className={`text-xs font-medium mb-1 ${textClass}`}>
                                        {DAYS[date.getDay()]}
                                    </div>
                                    <div className="text-lg font-semibold">{String(date.getDate()).padStart(2, '0')}</div>
                                    {/* {isEvent && (
                                        <div className="w-1 h-1 rounded-full mx-auto bg-[#6742ED]" />
                                    )} */}
                                </div>
                            )
                        })}
                    </div>
                    <Button variant="ghost" size="sm" onClick={goToNextWeek} className="flex-shrink-0">
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>

                <div className="space-y-3">
                    {displayEvents.length > 0 ? (
                        displayEvents.map((event) => (
                            <div key={event.id} className="rounded-xl p-4 bg-[#f5f6ff]">
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
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit Event</DropdownMenuItem>
                                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <div className="flex items-center justify-between ">
                                    <div className="flex items-center gap-2 bg-white p-2 rounded-lg">
                                        {event.platform === "Google Meet" ? (
                                            <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                                            </svg>
                                        ) : event.platform === "Zoom" ? (
                                            <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                            </svg>
                                        ) : event.platform === "Microsoft Teams" ? (
                                            <svg className="w-4 h-4 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        ) : (
                                            <MapPin className="w-4 h-4 text-gray-600" />
                                        )}
                                        <span className="text-sm text-gray-700 font-medium">
                                            {event.platform || event.location || 'In Person'}
                                        </span>
                                    </div>

                                    {event.attendees.length > 0 && (
                                        <div className="flex -space-x-2">
                                            {event.attendees.slice(0, 4).map((attendee, i) => {
                                                const colors = ['bg-orange-500', 'bg-blue-500', 'bg-purple-500', 'bg-green-500'];
                                                return (
                                                    <Avatar key={attendee.id} className="w-8 h-8 border-2 border-white">
                                                        <AvatarImage src={attendee.avatar || "/api/placeholder/32/32"} />
                                                        <AvatarFallback className={`${colors[i % colors.length]} text-white text-xs`}>
                                                            {attendee.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                );
                                            })}
                                            {event.attendees.length > 4 && (
                                                <div className="w-8 h-8 bg-[#6742ED] rounded-full flex items-center justify-center text-xs text-white font-medium border-2 border-white">
                                                    +{event.attendees.length - 4}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <CalendarDays className="w-8 h-8 mx-auto mb-2 opacity-50" />
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
