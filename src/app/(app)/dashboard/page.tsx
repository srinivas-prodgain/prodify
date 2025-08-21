"use client"


import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { CalendarWidget } from "@/components/calendar-widget"
import { MyTasks } from "@/components/my-tasks"
import { ProjectsGrid } from "@/components/projects-grid"
import { MyGoals } from "@/components/my-goals"
import { Reminders } from "@/components/reminders"

export default function Page() {
    const currentDate = new Date()
    const dateString = currentDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric'
    })

    return (
        <div className="flex flex-1 flex-col gap-4 p-5 pt-0 bg-[#fdfbff] bg-[linear-gradient(#f3f0f6_1px,transparent_1px),linear-gradient(90deg,#f3f0f6_1px,transparent_1px)] bg-[size:60px_60px]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fdfbff] to-[#fdfbff]  pointer-events-none z-0"></div>
            <div className="relative z-10 p-6">
                <Card className="w-full border-0 shadow-none bg-transparent">
                    <CardContent className="p-0">
                        <div className="flex flex-col xl:flex-row xl:items-end gap-6 xl:gap-10">
                            <div className="flex flex-col gap-5">
                                <div className="text-sm font-[580]">
                                    {dateString}
                                </div>
                                <div className="space-y-2">
                                    <h1 className="text-3xl sm:text-4xl lg:text-4xl font-[580] text-foreground">
                                        Hello, Courtney
                                    </h1>
                                    <p className="text-xl sm:text-2xl lg:text-4xl font-[580] bg-gradient-to-r from-[#26e5cc] to-[#667bda] bg-clip-text text-transparent">
                                        How can I help you today?
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 w-full sm:w-auto items-end">
                                <Button className="bg-gradient-to-br from-[#6742ED] to-[#DCDCEC] hover:from-[#673EDF] hover:to-[#DCDCEC] text-white rounded-full px-6 py-[22px] font-medium max-w-[200px] ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="size-5 text-yellow-200 rotate-45"
                                        fill="currentColor"
                                    >
                                        <path d="M12 2c1.2 3.5 3.5 5.8 7 7-3.5 1.2-5.8 3.5-7 7-1.2-3.5-3.5-5.8-7-7 3.5-1.2 5.8-3.5 7-7z" />
                                    </svg>
                                    <span className="text-[15px] font-medium">Ask AI</span>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="rounded-full px-6 py-[20px] font-medium border-[#84dacf] border-2 hover:bg-gray-50 max-w-[200px] text-[15px]"
                                >
                                    Get tasks updates
                                </Button>

                                <Button
                                    variant="outline"
                                    className="rounded-full px-6 py-[20px] font-medium border-[#84dacf] border-2 hover:bg-gray-50 max-w-[200px] text-[15px]"
                                >
                                    Create workspace
                                </Button>

                                <Button
                                    variant="outline"
                                    className="rounded-full px-6 py-[20px] font-medium border-[#84dacf] border-2 hover:bg-gray-50 max-w-[200px] text-[15px]"
                                >
                                    Connect apps
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <MyTasks />
                        <MyGoals />
                    </div>
                    <div className="space-y-6">
                        <ProjectsGrid />
                        <CalendarWidget />
                        <Reminders />
                    </div>
                </div>

                <Button
                    className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-radial from-[#ac7ffd] via-[#af7efe] to-[#ffffff] hover:from-[#673EDF] hover:to-[#DCDCEC] text-white shadow-lg z-50"
                    size="icon"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="size-10 text-yellow-200 rotate-45 absolute top-[11px] left-[5px]"
                        fill="currentColor"
                    >
                        <path d="M12 2c1.2 3.5 3.5 5.8 7 7-3.5 1.2-5.8 3.5-7 7-1.2-3.5-3.5-5.8-7-7 3.5-1.2 5.8-3.5 7-7z" />
                    </svg>
                </Button>
            </div>
        </div>
    )
}