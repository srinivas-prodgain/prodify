"use client"

import { useState } from "react"
import {
    Bell,
    ChevronDown,
    ChevronUp,
    Trash2,
    Timer,
    Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { reminders } from "@/data/dummydata"

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
                                        <ChevronDown strokeWidth={2.5} height={30} width={30} />
                                    ) : (
                                        <ChevronUp strokeWidth={2.5} height={30} width={30} />
                                    )}
                                    <span className="font-[580] text-[18px]">Today</span>
                                    <span className="text-sm text-[#a5a5a5]">•</span>
                                    <span className="text-[15px] font-[580] text-[#a5a5a5]">
                                        {todayReminders.length}
                                    </span>
                                </div>
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-3 mt-3">
                            {todayReminders.map((reminder) => (
                                <div
                                    key={reminder.id}
                                    className="flex items-start justify-between gap-3 p-3 pl-0 transition-colors border-b-2 border-[#f2f3f7] cursor-pointer"
                                >
                                    <div className="flex items-start gap-3 flex-1">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[15px] text-[#333333] leading-relaxed font-[550]">
                                                {reminder.text}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="size-9 p-0 hover:bg-blue-50 hover:text-blue-600"
                                            onClick={() => handleReminderNotify(reminder.id)}
                                        >
                                            <Bell className="size-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="size-9 p-0 hover:bg-red-50 hover:text-red-600"
                                            onClick={() => handleReminderDelete(reminder.id)}
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="size-6 p-0 bg-[#30d5d1] text-white rounded-full hover:bg-[#30d5d1]/80 hover:text-white"
                                            onClick={() => handleReminderDelete(reminder.id)}
                                        >
                                            <Check />
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
