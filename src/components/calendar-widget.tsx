"use client"

import { useState, useMemo } from "react"
import {
    Calendar as CalendarIcon,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    Clock,
    MapPin,
    Users
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
import { TCalendarEvent, TCalendarEventPlatform } from "@/types/ui"

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
        date: "2025-08-09",
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

    const getPlatformIcon = (platform?: TCalendarEventPlatform) => {
        switch (platform) {
            case "Google Meet": return '📹'
            case "Zoom": return '💻'
            case "Microsoft Teams": return '👥'
            default: return '📍'
        }
    }

    return (
        <Card className="rounded-xl border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    <CardTitle className="text-lg font-semibold">Calendar</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
                                {MONTHS[selectedMonth]} {selectedYear}
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
                    <div className="flex gap-1 sm:gap-2 flex-1 justify-center mx-2">
                        {getWeekDates.map((date, index) => {
                            const dayEvents = getEventsForDate(date)
                            const today = isToday(date)
                            const selected = isSelected(date)

                            return (
                                <div
                                    key={index}
                                    onClick={() => handleDateSelect(date)}
                                    className={`text-center p-1.5 sm:p-2 rounded-lg min-w-[2.25rem] sm:min-w-[2.5rem] cursor-pointer transition-colors ${today
                                        ? 'bg-purple-500 text-white'
                                        : selected
                                            ? 'bg-blue-500 text-white'
                                            : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <div className={`text-xs ${today || selected
                                        ? 'text-white opacity-80'
                                        : 'text-muted-foreground'
                                        }`}>
                                        {DAYS[date.getDay()]}
                                    </div>
                                    <div className="text-sm font-medium">{date.getDate()}</div>
                                    {dayEvents.length > 0 && (
                                        <div className={`w-1 h-1 rounded-full mx-auto mt-1 ${today || selected ? 'bg-white' : 'bg-purple-500'
                                            }`} />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <Button variant="ghost" size="sm" onClick={goToNextWeek} className="flex-shrink-0">
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>

                <div className="space-y-3">
                    {selectedDate && (
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-muted-foreground">
                                Events for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedDate(null)}
                                className="text-xs text-muted-foreground hover:text-foreground"
                            >
                                Show All Week
                            </Button>
                        </div>
                    )}
                    {displayEvents.length > 0 ? (
                        displayEvents.map((event) => (
                            <div key={event.id} className="p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-sm">{event.title}</h4>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
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

                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                    <Clock className="w-3 h-3" />
                                    <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                                    <span>•</span>
                                    <span>{event.startTime} - {event.endTime}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                                            {getPlatformIcon(event.platform)} {event.platform || event.location || 'In Person'}
                                        </span>
                                        {event.priority === "High" && (
                                            <span className="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded">High Priority</span>
                                        )}
                                        {event.priority === "Medium" && (
                                            <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">Medium Priority</span>
                                        )}
                                        {event.priority === "Low" && (
                                            <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">Low Priority</span>
                                        )}
                                    </div>

                                    {event.attendees.length > 0 && (
                                        <div className="flex -space-x-2">
                                            {event.attendees.slice(0, 3).map((attendee, i) => (
                                                <Avatar key={attendee.id} className="w-6 h-6 border-2 border-white">
                                                    <AvatarFallback className="text-xs">
                                                        {attendee.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                            ))}
                                            {event.attendees.length > 3 && (
                                                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs text-white border-2 border-white">
                                                    +{event.attendees.length - 3}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {event.description && (
                                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{event.description}</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
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
