import { TCalendarEvent, TFocusMetric, TGoal, TProject, TReminder, TTask } from "@/types/ui";


export const projects: TProject[] = [
    { id: 1, name: "Product launch", tasks: 6, teammates: 12, color: "bg-purple-100", icon: "Rocket" },
    { id: 2, name: "Team brainstorm", tasks: 2, teammates: 32, color: "bg-blue-100", icon: "Brain" },
    { id: 3, name: "Branding launch", tasks: 4, teammates: 9, color: "bg-cyan-100", icon: "Diamond" }
]

export const tasks: TTask[] = [
    { id: 1, name: "One-on-One Meeting", priority: "High", dueDate: "Today", color: "#84dacf", status: "progress" },
    { id: 2, name: "Send a summary email to stakeholders", priority: "Low", dueDate: "3 days left", color: "#84dacf", status: "progress" },
    { id: 3, name: "Review design mockups", priority: "Medium", dueDate: "Tomorrow", color: "#84dacf", status: "todo" },
    { id: 4, name: "Client presentation", priority: "High", dueDate: "Next week", color: "#84dacf", status: "upcoming" },
    { id: 5, name: "Update project documentation", priority: "Medium", dueDate: "This week", color: "#84dacf", status: "todo" }
]

export const calendarEvents: TCalendarEvent[] = [
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

export const reminders: TReminder[] = [
    {
        id: 1,
        text: "Assess any new risks identified in the morning meeting.",
        category: "Today",
        isToday: true,
        priority: "High",
        color: "#8b5cf6"
    },
    {
        id: 2,
        text: "Get the key points from our previous stand-up meeting.",
        category: "Today",
        isToday: true,
        priority: "Medium",
        color: "#06b6d4"
    },
    {
        id: 3,
        text: "Review and update project timeline for Q4 deliverables.",
        category: "This Week",
        isToday: false,
        priority: "Medium",
        color: "#f59e0b"
    },
    {
        id: 4,
        text: "Schedule one-on-one meetings with team members.",
        category: "This Week",
        isToday: false,
        priority: "Low",
        color: "#10b981"
    }
]

export const goals: TGoal[] = [
    { id: 1, name: "Check Emails and Messages", project: "Product launch", progress: 73, color: "bg-cyan-500" },
    { id: 2, name: "Prepare a brief status update to the client", project: "Product launch", progress: 21, color: "bg-orange-500" },
    { id: 3, name: "Update project documentation", project: "Team brainstorm", progress: 63, color: "bg-cyan-500" }
]   

export const focusMetrics: TFocusMetric[] = [
    {
        id: 1,
        name: "Deep Work",
        value: 6.5,
        target: 8,
        color: "#26e5cc",
        icon: "Target",
        description: "Hours of focused work"
    },
    {
        id: 2,
        name: "Meetings",
        value: 3,
        target: 4,
        color: "#667bda",
        icon: "Users",
        description: "Hours in meetings"
    },
    {
        id: 3,
        name: "Distractions",
        value: 1.5,
        target: 1,
        color: "#ffae65",
        icon: "AlertTriangle",
        description: "Hours lost to distractions"
    },
    // {
    //     id: 4,
    //     name: "Sleep",
    //     value: 7,
    //     target: 8,
    //     color: "#26e5cc",
    //     icon: <Bed className="size-4" />,
    //     description: "Hours of sleep"
    // },
]