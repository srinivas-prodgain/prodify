"use client"


import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { CalendarWidget } from "@/components/calendar-widget"
import { MyTasks } from "@/components/my-tasks"
import { ProjectsGrid } from "@/components/projects-grid"
import { MyGoals } from "@/components/my-goals"
import { FocusMetrics } from "@/components/focus-metrics"
import { Reminders } from "@/components/reminders"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Page() {
    const currentDate = new Date()
    const dateString = currentDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric'
    })

    return (
        <div className="flex flex-1 flex-col gap-4 bg-[#fdfbff] bg-[linear-gradient(#f3f0f6_1px,transparent_1px),linear-gradient(90deg,#f3f0f6_1px,transparent_1px)] bg-[size:55px_55px] bg-[position:-8px_-20px]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fdfbff] to-[#fdfbff]  pointer-events-none z-0"></div>
            <div className="relative z-10 p-4 sm:p-9 sm:pt-3">

                <Card className="w-full border-0 shadow-none bg-transparent">
                    <CardContent className="p-0">
                        <div className="flex flex-col xl:flex-row xl:items-end gap-6 xl:gap-10">
                            <div className="flex flex-col gap-5">
                                <div className="text-[15px] font-[580] flex items-center gap-2">
                                    {dateString}
                                    {/* <Separator orientation="vertical" className="h-4" /> */}
                                    <SidebarTrigger className="ml-2" />
                                </div>

                                <div className="space-y-2">
                                    <h1 className="text-2xl xs:text-3xl sm:text-4xl font-[700] text-foreground">
                                        Hello, Courtney
                                    </h1>
                                    <p className="text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-[560] bg-gradient-to-r from-[#26e5cc] to-[#667bda] bg-clip-text text-transparent">
                                        How can I help you today?
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 w-full sm:w-auto items-end">
                                <Button className="text-white rounded-full py-3 sm:py-4 lg:py-[22px] font-medium max-w-[250px] bg-[linear-gradient(144deg,rgba(154,87,255,1)_19%,rgba(170,119,247,1)_41%,rgba(214,197,235,1)_92%)] bg-cover bg-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="size-4 sm:size-4 lg:size-5 text-yellow-200 rotate-45"
                                        fill="currentColor"
                                    >
                                        <path d="M12 2c1.2 3.5 3.5 5.8 7 7-3.5 1.2-5.8 3.5-7 7-1.2-3.5-3.5-5.8-7-7 3.5-1.2 5.8-3.5 7-7z" />
                                    </svg>
                                    <span className="text-sm sm:text-sm lg:text-[15px] font-[550] mr-1">Ask AI</span>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="rounded-full px-3 sm:px-4 py-3 sm:py-4 lg:py-[20px] font-[590] border-[#84dacf] border-2 max-w-[200px] text-sm sm:text-sm lg:text-[16px]"
                                >
                                    Get tasks updates
                                </Button>

                                <Button
                                    variant="outline"
                                    className="rounded-full px-3 sm:px-4 py-3 sm:py-4 lg:py-[20px] font-[590] border-[#84dacf] border-2 hover:bg-gray-50 max-w-[200px] text-sm sm:text-sm lg:text-[16px]"
                                >
                                    Create workspace
                                </Button>

                                <Button
                                    variant="outline"
                                    className="rounded-full px-3 sm:px-4 py-3 sm:py-4 lg:py-[20px] font-[590] border-[#84dacf] border-2 hover:bg-gray-50 max-w-[200px] text-sm sm:text-sm lg:text-[16px]"
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
                        <FocusMetrics />
                    </div>
                    <div className="space-y-6">
                        <ProjectsGrid />
                        <CalendarWidget />
                        <Reminders />
                    </div>
                </div>

                <Button
                    className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[radial-gradient(circle_at_center,_#6d4efc_0%,_#7d6dfd_50%,_#c6b9ff_100%)] shadow-[0_0_40px_10px_rgba(236,133,255,0.6)] hover:from-[#673EDF] hover:to-[#DCDCEC] text-white z-50"
                    size="icon"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="size-9 text-yellow-200 rotate-45 absolute top-[12px] left-[8px]"
                        fill="currentColor"
                    >
                        <path d="M12 2c1.2 3.5 3.5 5.8 7 7-3.5 1.2-5.8 3.5-7 7-1.2-3.5-3.5-5.8-7-7 3.5-1.2 5.8-3.5 7-7z" />
                    </svg>
                </Button>
            </div>
        </div>
    )
}