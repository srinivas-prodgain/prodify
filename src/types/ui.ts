
const CalendarEventTypes = ['meeting', 'call', 'event', 'reminder'] as const
const TaskPriorities = ['High', 'Medium', 'Low'] as const
const TaskStatuses = ['progress', 'todo', 'upcoming'] as const
const CalendarEventPlatforms = ['Google Meet', 'Zoom', 'Microsoft Teams'] as const
export const FilterOptions = ['Recents', 'All Projects', 'Favorites', 'Archived'] as const

type TCalendarEventType = typeof CalendarEventTypes[number]
type TTaskPriority = typeof TaskPriorities[number]
type TTaskStatus = typeof TaskStatuses[number]
type TCalendarEventPlatform = typeof CalendarEventPlatforms[number]
export type TFilterOption = typeof FilterOptions[number]

type TAttendee = {
    id: number
    name: string
    avatar?: string
}

export type TTask = {
    id: number
    name: string
    status: TTaskStatus
    priority: TTaskPriority
    dueDate: string
    color: string
}

export type TCalendarEvent = {
    id: number
    title: string
    date: string
    startTime: string
    endTime: string
    type: TCalendarEventType
    platform?: TCalendarEventPlatform
    location?: string
    attendees: TAttendee[]
    description?: string
    priority: TTaskPriority
}

export type TProject = {
    id: number
    name: string
    tasks: number
    teammates: number
    color: string
    icon: React.ReactNode
}

export type TReminder = {
    id: number
    text: string
    category: string
    isToday: boolean
    priority: TTaskPriority
    color: string
}


export type TGoal = {
    id: number
    name: string
    project: string
    progress: number
    color: string
}


export type TFocusMetric = {
    id: number
    name: string
    value: number
    target: number
    color: string
    icon: React.ReactNode
    description: string
}
