"use client"

import { useState } from "react"
import {
    Bell,
    ChevronDown,
    ChevronUp,
    Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { TReminder } from "@/types/ui"


const reminders: TReminder[] = [
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

export function Reminders() {
    const [isTodayOpen, setIsTodayOpen] = useState(true)


    const handleReminderNotify = (reminderId: number) => {
        console.log(`Notify reminder: ${reminderId}`)

    }

    const handleReminderDelete = (reminderId: number) => {
        console.log(`Delete reminder: ${reminderId}`)

    }


    const todayReminders = reminders.filter(reminder => reminder.isToday)

    return (
        <Card className="rounded-xl border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    <CardTitle className="text-lg font-semibold">Reminders</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="space-y-4">

                    <Collapsible open={isTodayOpen} onOpenChange={setIsTodayOpen}>
                        <CollapsibleTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex items-center justify-between w-full p-0 h-auto hover:bg-transparent"
                            >
                                <div className="flex items-center gap-2">
                                    {isTodayOpen ? (
                                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                    ) : (
                                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                                    )}
                                    <span className="font-medium text-sm">Today</span>
                                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">
                                        {todayReminders.length}
                                    </span>
                                </div>
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-3 mt-3">
                            {todayReminders.map((reminder) => (
                                <div
                                    key={reminder.id}
                                    className="flex items-start justify-between gap-3 p-3 sm:p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-start gap-3 flex-1">
                                        <div
                                            className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                                            style={{ backgroundColor: reminder.color }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-900 leading-relaxed">
                                                {reminder.text}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-8 h-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                                            onClick={() => handleReminderNotify(reminder.id)}
                                        >
                                            <Bell className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-8 h-8 p-0 hover:bg-red-50 hover:text-red-600"
                                            onClick={() => handleReminderDelete(reminder.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </CardContent>
        </Card>
    )
}
