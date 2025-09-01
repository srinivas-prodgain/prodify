"use client"

import { useState } from "react"
import {
    ChevronDown,
    ChevronUp,
    Timer,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ReminderItem } from "@/components/sub-components/reminder-item"
import { reminders } from "@/data/dummy-data"

export function Reminders() {
    const [isTodayOpen, setIsTodayOpen] = useState(true)

    const handleReminderNotify = (reminderId: number) => {
        console.log(`Notify reminder: ${reminderId}`)
    }

    const handleReminderDelete = (reminderId: number) => {
        console.log(`Delete reminder: ${reminderId}`)
    }

    const handleReminderComplete = (reminderId: number) => {
        console.log(`Complete reminder: ${reminderId}`)
    }


    const todayReminders = reminders.filter(reminder => reminder.isToday)

    return (
        <Card className="rounded-xl border py-4 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <Timer className="text-[#8379c9] size-5" strokeWidth={2} />
                    <CardTitle className="text-lg font-[580]">Reminders</CardTitle>
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
                                        <ChevronDown strokeWidth={2.5} height="1.88rem" width="1.88rem" />
                                    ) : (
                                        <ChevronUp strokeWidth={2.5} height="1.88rem" width="1.88rem" />
                                    )}
                                    <span className="font-[580] text-[1.13rem]">Today</span>
                                    <span className="text-sm text-[#a5a5a5]">•</span>
                                    <span className="text-[0.94rem] font-[580] text-[#a5a5a5]">
                                        {todayReminders.length}
                                    </span>
                                </div>
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-3 mt-3">
                            {todayReminders.map((reminder) => (
                                <ReminderItem
                                    key={reminder.id}
                                    reminder={reminder}
                                    onNotify={handleReminderNotify}
                                    onDelete={handleReminderDelete}
                                    onComplete={handleReminderComplete}
                                />
                            ))}
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </CardContent>
        </Card>
    )
}
