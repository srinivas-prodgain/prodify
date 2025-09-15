"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { CalendarWidget } from "@/components/calendar-widget"
import { FocusMetrics } from "@/components/focus-metrics"
import { MyGoals } from "@/components/my-goals"
import { MyTasks } from "@/components/my-tasks"
import { ProjectsGrid } from "@/components/projects-grid"
import { Reminders } from "@/components/reminders"


import { StarIcon } from "@/constants/start-icon"
import { getTheCurrentDate } from "@/utils/date-utils"



export default function Page() {
    const dateString = getTheCurrentDate()

    return (
        <div className="flex flex-1 flex-col gap-4 bg-bg-purple-lightest bg-[linear-gradient(theme(colors.bg-purple-subtle)_1px,transparent_1px),linear-gradient(90deg,theme(colors.bg-purple-subtle)_1px,transparent_1px)] bg-[size:55px_55px] bg-[position:-8px_-20px]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-purple-lightest to-bg-purple-lightest pointer-events-none z-0"></div>
            <div className="relative z-10 p-4 sm:p-9">
                <Card className="w-full border-0 shadow-none bg-transparent pt-0">
                    <CardContent className="p-0">
                        <div className="flex flex-col xl:flex-row xl:items-end gap-6 xl:gap-10">
                            <div className="flex flex-col gap-5">
                                <div className="text-[0.94rem] font-[580] flex items-center gap-2">
                                    {dateString}
                                    <SidebarTrigger className="ml-2" />
                                </div>

                                <div className="space-y-2">
                                    <h1 className="text-2xl xs:text-3xl sm:text-4xl font-[700] text-foreground">
                                        Hello, Courtney
                                    </h1>
                                    <p className="text-xl xs:text-2xl md:text-3xl lg:text-4xl font-[560] bg-gradient-to-r from-brand-teal to-brand-purple-primary bg-clip-text text-transparent">
                                        How can I help you today?
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3 w-full sm:w-auto items-end">
                                <Button className="text-white rounded-full py-3 sm:py-4 lg:py-[22px] font-medium max-w-[250px] bg-[linear-gradient(144deg,#766be1,#766be1,#a292ed,#c7bef6,#d9d1f9)]">
                                    <StarIcon className="size-3.5 mr-[-5px]" />
                                    <span className="text-sm lg:text-[0.94rem] font-[550] mr-1">Ask AI</span>
                                </Button>

                                <Button variant="customPrimary">
                                    Get tasks updates
                                </Button>

                                <Button variant="customPrimary">
                                    Create workspace
                                </Button>

                                <Button variant="customPrimary">
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
                    className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[radial-gradient(circle_at_center,_#a881fb_60%,_#ffffff_100%)] shadow-[0_0_12px_2px_rgba(236,133,255,0.5)] text-white z-50"
                    size="icon"
                >
                    <StarIcon className="size-9 absolute top-[0.75rem] left-[0.50rem]" />
                </Button>
            </div>
        </div>
    )
}