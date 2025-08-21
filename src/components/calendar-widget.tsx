"use client"

import { useState, useMemo, useEffect } from "react"
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TCalendarEvent } from "@/types/ui"
import Image from "next/image"

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
        startTime: "9:00",
        endTime: "10:30 am",
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
        startTime: "2:00",
        endTime: "4:00 pm",
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
        date: "2025-08-21",
        startTime: "10:00",
        endTime: "11:00 am",
        type: "meeting",
        platform: "Google Meet",
        attendees: [
            { id: 7, name: "Alex Rodriguez", avatar: "https://res.cloudinary.com/dwhuwudg9/image/upload/v1755782676/1-intro-photo-final-removebg-preview_udgdah.png" },
            { id: 8, name: "Alex Rodriguez", avatar: "https://res.cloudinary.com/dwhuwudg9/image/upload/v1755782676/1-intro-photo-final-removebg-preview_udgdah.png" },
            { id: 9, name: "Alex Rodriguez", avatar: "https://res.cloudinary.com/dwhuwudg9/image/upload/v1755782676/1-intro-photo-final-removebg-preview_udgdah.png" },
            { id: 10, name: "Alex Rodriguez", avatar: "https://res.cloudinary.com/dwhuwudg9/image/upload/v1755782676/1-intro-photo-final-removebg-preview_udgdah.png" },
            { id: 11, name: "Alex Rodriguez", avatar: "https://res.cloudinary.com/dwhuwudg9/image/upload/v1755782676/1-intro-photo-final-removebg-preview_udgdah.png" },
            { id: 12, name: "Alex Rodriguez", avatar: "https://res.cloudinary.com/dwhuwudg9/image/upload/v1755782676/1-intro-photo-final-removebg-preview_udgdah.png" },
            { id: 13, name: "Alex Rodriguez", avatar: "https://res.cloudinary.com/dwhuwudg9/image/upload/v1755782676/1-intro-photo-final-removebg-preview_udgdah.png" },
            { id: 14, name: "Alex Rodriguez", avatar: "https://res.cloudinary.com/dwhuwudg9/image/upload/v1755782676/1-intro-photo-final-removebg-preview_udgdah.png" },
            { id: 15, name: "Alex Rodriguez", avatar: "https://res.cloudinary.com/dwhuwudg9/image/upload/v1755782676/1-intro-photo-final-removebg-preview_udgdah.png" },
            { id: 16, name: "Alex Rodriguez", avatar: "https://res.cloudinary.com/dwhuwudg9/image/upload/v1755782676/1-intro-photo-final-removebg-preview_udgdah.png" },
            { id: 17, name: "Alex Rodriguez", avatar: "https://res.cloudinary.com/dwhuwudg9/image/upload/v1755782676/1-intro-photo-final-removebg-preview_udgdah.png" },
            { id: 18, name: "Alex Rodriguez", avatar: "https://res.cloudinary.com/dwhuwudg9/image/upload/v1755782676/1-intro-photo-final-removebg-preview_udgdah.png" },
        ],
        description: "Weekly check-in and performance review",
        priority: "Medium"
    },
    {
        id: 4,
        title: "Design Review Session",
        date: "2025-08-10",
        startTime: "3:30",
        endTime: "4:30 pm",
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
        endTime: "11:00 am",
        type: "meeting",
        platform: "Microsoft Teams",
        attendees: [
            { id: 11, name: "Chris Martin", avatar: "" },
            { id: 12, name: "Taylor Swift", avatar: "" }
        ],
        description: "Monthly company-wide update meeting",
        priority: "Low"
    },
    {
        id: 6,
        title: "Weekend Project Review",
        date: "2026-03-21",
        startTime: "16:00",
        endTime: "5:00 pm",
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
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)
    const [currentDate, setCurrentDate] = useState(today)
    const [selectedDate, setSelectedDate] = useState<Date | null>(today)
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth())
    const [selectedYear, setSelectedYear] = useState(today.getFullYear())

    // Custom hook to detect sm breakpoint (640px)
    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 798)
        }

        // Check on mount
        checkScreenSize()

        // Add event listener
        window.addEventListener('resize', checkScreenSize)

        // Cleanup
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

        // For small screens (<640px), show 3 days (yesterday, today, tomorrow)
        // For larger screens (≥640px), show full week (7 days)
        const daysToShow = isSmallScreen ? 5 : 7

        if (isSmallScreen) {
            // Center around current date for small screens
            startOfWeek.setDate(startOfWeek.getDate() - 1) // Start from yesterday
        } else {
            // Start from Sunday for larger screens
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
        // For small screens, navigate by 3 days; for larger screens, navigate by 7 days
        const daysToNavigate = isSmallScreen ? 5 : 7
        newDate.setDate(newDate.getDate() - daysToNavigate)
        setCurrentDate(newDate)
        setSelectedMonth(newDate.getMonth())
        setSelectedYear(newDate.getFullYear())
    }

    const goToNextWeek = () => {
        const newDate = new Date(currentDate)
        // For small screens, navigate by 3 days; for larger screens, navigate by 7 days
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
        <Card className="rounded-xl border shadow-sm py-4">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <CalendarDays className="text-[#8379c9] size-5" strokeWidth={2} />
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
            <CardContent className="p-0">
                <div className="flex items-center px-[14px]">
                    <div className="w-10 flex justify-start">
                        <Button variant="ghost" size="sm" onClick={goToPreviousWeek} className="flex-shrink-0 p-0">
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className={`flex gap-1 flex-1 ${isSmallScreen ? 'justify-center' : 'justify-between'}`}>
                        {getWeekDates.map((date, index) => {
                            const todayCheck = isToday(date)
                            const selected = isSelected(date)
                            const isEvent = getEventsForDate(date).length > 0

                            // Determine background and text colors
                            let bgClass = 'hover:bg-purple-50'
                            let textClass = 'text-gray-400'

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
                                    className={`text-center p-1 rounded-lg ${isSmallScreen ? 'min-w-[2.5rem]' : 'min-w-[2.8rem]'} cursor-pointer transition-all ${bgClass} relative`}
                                >
                                    <div className={`text-xs font-medium ${textClass}`}>
                                        {DAYS[date.getDay()]}
                                    </div>
                                    <div className="text-lg font-semibold">{String(date.getDate()).padStart(2, '0')}</div>
                                    {isEvent && (
                                        <div className="w-1 h-1 rounded-full mx-auto bg-[#6742ED] absolute bottom-0 left-1/2 -translate-x-1/2" />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <div className="w-10 flex justify-end">
                        <Button variant="ghost" size="sm" onClick={goToNextWeek} className="flex-shrink-0 p-0">
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="space-y-3 mt-3 px-[24px]">
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
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-gray-600 ">
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
                                    <div className="flex items-center gap-2 bg-white py-1 px-3 rounded-full">
                                        {event.platform === "Google Meet" ? (
                                            <svg width="25px" height="25px" viewBox="-3.2 -3.2 38.40 38.40" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.8320000000000001"></g><g id="SVGRepo_iconCarrier">
                                                    <path d="M2 11.9556C2 8.47078 2 6.7284 2.67818 5.39739C3.27473 4.22661 4.22661 3.27473 5.39739 2.67818C6.7284 2 8.47078 2 11.9556 2H20.0444C23.5292 2 25.2716 2 26.6026 2.67818C27.7734 3.27473 28.7253 4.22661 29.3218 5.39739C30 6.7284 30 8.47078 30 11.9556V20.0444C30 23.5292 30 25.2716 29.3218 26.6026C28.7253 27.7734 27.7734 28.7253 26.6026 29.3218C25.2716 30 23.5292 30 20.0444 30H11.9556C8.47078 30 6.7284 30 5.39739 29.3218C4.22661 28.7253 3.27473 27.7734 2.67818 26.6026C2 25.2716 2 23.5292 2 20.0444V11.9556Z" fill="white"></path> <path d="M5 23.5601C5 24.3557 5.64998 25.0001 6.45081 25.0001H6.47166C5.65857 25.0001 5 24.3557 5 23.5601Z" fill="#FBBC05"></path> <path d="M17.4678 12.4V16.1596L22.5364 12.0712V8.43999C22.5364 7.6444 21.8864 7 21.0856 7H10.1045L10.0947 12.4H17.4678Z" fill="#FBBC05"></path>
                                                    <path d="M17.4671 19.9207H10.0818L10.0732 25.0003H21.085C21.887 25.0003 22.5358 24.3559 22.5358 23.5603V20.2819L17.4671 16.1611V19.9207Z" fill="#34A853"></path>
                                                    <path d="M10.1042 7L5 12.4H10.0956L10.1042 7Z" fill="#EA4335"></path>
                                                    <path d="M5 19.9204V23.56C5 24.3556 5.65857 25 6.47166 25H10.0736L10.0821 19.9204H5Z" fill="#1967D2"></path>
                                                    <path d="M10.0956 12.3999H5V19.9203H10.0821L10.0956 12.3999Z" fill="#4285F4"></path>
                                                    <path d="M26.9926 22.2796V9.9197C26.7068 8.27931 24.9077 10.1597 24.9077 10.1597L22.5371 12.0713V20.2804L25.9305 23.0392C27.1557 23.2 26.9926 22.2796 26.9926 22.2796Z" fill="#34A853"></path>
                                                    <path d="M17.4678 16.1594L22.5377 20.2814V12.0723L17.4678 16.1594Z" fill="#188038"></path>
                                                </g>
                                            </svg>
                                        ) : event.platform === "Zoom" ? (
                                            <svg width="22px" height="22px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path d="M2 11.6C2 8.23969 2 6.55953 2.65396 5.27606C3.2292 4.14708 4.14708 3.2292 5.27606 2.65396C6.55953 2 8.23969 2 11.6 2H20.4C23.7603 2 25.4405 2 26.7239 2.65396C27.8529 3.2292 28.7708 4.14708 29.346 5.27606C30 6.55953 30 8.23969 30 11.6V20.4C30 23.7603 30 25.4405 29.346 26.7239C28.7708 27.8529 27.8529 28.7708 26.7239 29.346C25.4405 30 23.7603 30 20.4 30H11.6C8.23969 30 6.55953 30 5.27606 29.346C4.14708 28.7708 3.2292 27.8529 2.65396 26.7239C2 25.4405 2 23.7603 2 20.4V11.6Z" fill="#4087FC"></path>
                                                    <path d="M8.26667 10C7.56711 10 7 10.6396 7 11.4286V18.3571C7 20.369 8.44612 22 10.23 22L17.7333 21.9286C18.4329 21.9286 19 21.289 19 20.5V13.5C19 11.4881 17.2839 10 15.5 10L8.26667 10Z" fill="white"></path>
                                                    <path d="M20.7122 12.7276C20.2596 13.1752 20 13.8211 20 14.5V17.3993C20 18.0782 20.2596 18.7242 20.7122 19.1717L23.5288 21.6525C24.1019 22.2191 25 21.7601 25 20.9005V11.1352C25 10.2755 24.1019 9.81654 23.5288 10.3832L20.7122 12.7276Z" fill="white"></path>
                                                </g>f
                                            </svg>
                                        ) : event.platform === "Microsoft Teams" ? (
                                            <svg width="22px" height="22px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path fill="#5059C9" d="M10.765 6.875h3.616c.342 0 .619.276.619.617v3.288a2.272 2.272 0 01-2.274 2.27h-.01a2.272 2.272 0 01-2.274-2.27V7.199c0-.179.145-.323.323-.323zM13.21 6.225c.808 0 1.464-.655 1.464-1.462 0-.808-.656-1.463-1.465-1.463s-1.465.655-1.465 1.463c0 .807.656 1.462 1.465 1.462z"></path>
                                                    <path fill="#7B83EB" d="M8.651 6.225a2.114 2.114 0 002.117-2.112A2.114 2.114 0 008.65 2a2.114 2.114 0 00-2.116 2.112c0 1.167.947 2.113 2.116 2.113zM11.473 6.875h-5.97a.611.611 0 00-.596.625v3.75A3.669 3.669 0 008.488 15a3.669 3.669 0 003.582-3.75V7.5a.611.611 0 00-.597-.625z"></path>
                                                    <path fill="#000000" d="M8.814 6.875v5.255a.598.598 0 01-.596.595H5.193a3.951 3.951 0 01-.287-1.476V7.5a.61.61 0 01.597-.624h3.31z" opacity=".1"></path>
                                                    <path fill="#000000" d="M8.488 6.875v5.58a.6.6 0 01-.596.595H5.347a3.22 3.22 0 01-.267-.65 3.951 3.951 0 01-.172-1.15V7.498a.61.61 0 01.596-.624h2.985z" opacity=".2"></path>
                                                    <path fill="#000000" d="M8.488 6.875v4.93a.6.6 0 01-.596.595H5.08a3.951 3.951 0 01-.172-1.15V7.498a.61.61 0 01.596-.624h2.985z" opacity=".2"></path>
                                                    <path fill="#000000" d="M8.163 6.875v4.93a.6.6 0 01-.596.595H5.079a3.951 3.951 0 01-.172-1.15V7.498a.61.61 0 01.596-.624h2.66z" opacity=".2"></path>
                                                    <path fill="#000000" d="M8.814 5.195v1.024c-.055.003-.107.006-.163.006-.055 0-.107-.003-.163-.006A2.115 2.115 0 016.593 4.6h1.625a.598.598 0 01.596.594z" opacity=".1"></path>
                                                    <path fill="#000000" d="M8.488 5.52v.699a2.115 2.115 0 01-1.79-1.293h1.195a.598.598 0 01.595.594z" opacity=".2"></path>
                                                    <path fill="#000000" d="M8.488 5.52v.699a2.115 2.115 0 01-1.79-1.293h1.195a.598.598 0 01.595.594z" opacity=".2"></path>
                                                    <path fill="#000000" d="M8.163 5.52v.647a2.115 2.115 0 01-1.465-1.242h.87a.598.598 0 01.595.595z" opacity=".2"></path>
                                                    <path fill="url(#microsoft-teams-color-16__paint0_linear_2372_494)" d="M1.597 4.925h5.969c.33 0 .597.267.597.596v5.958a.596.596 0 01-.597.596h-5.97A.596.596 0 011 11.479V5.521c0-.33.267-.596.597-.596z"></path>
                                                    <path fill="#ffffff" d="M6.152 7.193H4.959v3.243h-.76V7.193H3.01v-.63h3.141v.63z"></path>
                                                    <defs>
                                                        <linearGradient id="microsoft-teams-color-16__paint0_linear_2372_494" x1="2.244" x2="6.906" y1="4.46" y2="12.548" gradientUnits="userSpaceOnUse">
                                                            <stop stopColor="#5A62C3"></stop>
                                                            <stop offset=".5" stopColor="#4D55BD"></stop>
                                                            <stop offset="1" stopColor="#3940AB"></stop>
                                                        </linearGradient>
                                                    </defs>
                                                </g>
                                            </svg>
                                        ) : (
                                            <MapPin className="w-4 h-4 text-gray-600" />
                                        )}
                                        <span className="text-[15px] text-gray-800 font-medium">
                                            {event.platform || event.location || 'In Person'}
                                        </span>
                                    </div>

                                    {event.attendees.length > 0 && (
                                        <div className="flex items-center justify-center bg-white rounded-full">
                                            {event.attendees.slice(0, 5).map((attendee, i) => (
                                                i < 4 ? (
                                                    <div
                                                        key={i}
                                                        className={`text-sidebar-primary-foreground flex aspect-square items-center justify-center rounded-full relative bg-[#ded1f1] h-8 w-8 overflow-hidden border-[2.5px] border-white ${i > 0 ? 'ml-[-8px]' : ''}`}
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
                                                        className={`text-sidebar-primary-foreground flex aspect-square items-center justify-center rounded-full relative bg-[#6c39d3] h-8 w-8 overflow-hidden border-[2px] border-white ${i > 0 ? 'ml-[-8px]' : ''}`}
                                                    >
                                                        <span className="text-white text-xs font-medium">
                                                            +{event.attendees.length - 4}
                                                        </span>
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