export const formatDateString = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}


export const isToday = (date: Date): boolean => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
}


export const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.toDateString() === date2.toDateString()
}


export const getTheCurrentDate = (): string => {
    return new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric'
    })
}


export const getEventsForDate = <T extends { date: string }>(events: T[], date: Date): T[] => {
    const dateString = formatDateString(date)
    return events.filter(event => event.date === dateString)
}


export const getWeekDates = (currentDate: Date, isSmallScreen: boolean = false): Date[] => {
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
}


export const navigateWeek = (currentDate: Date, direction: 'prev' | 'next', isSmallScreen: boolean = false): Date => {
    const newDate = new Date(currentDate)
    const daysToNavigate = isSmallScreen ? 5 : 7
    const multiplier = direction === 'prev' ? -1 : 1

    newDate.setDate(newDate.getDate() + (daysToNavigate * multiplier))
    return newDate
}


export const formatEventDate = (date: Date | string): string => {
    const eventDate = typeof date === 'string' ? new Date(date) : date

    if (isToday(eventDate)) {
        return 'Today'
    }

    return eventDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    })
}
