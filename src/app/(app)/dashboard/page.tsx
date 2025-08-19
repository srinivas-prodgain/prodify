"use client"

import {
    Sparkles
} from "lucide-react"
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
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Card className="w-full border-0 shadow-none bg-transparent">
                <CardContent className="p-0">
                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 xl:gap-10">
                        <div className="flex flex-col gap-5 flex-1">
                            <div className="text-sm text-muted-foreground">
                                {dateString}
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                                    Hello, Courtney
                                </h1>
                                <p className="text-xl sm:text-2xl lg:text-3xl font-normal bg-gradient-to-r from-cyan-400 via-purple-400 to-purple-800 bg-clip-text text-transparent">
                                    How can I help you today?
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:flex-wrap lg:grid lg:grid-cols-2 xl:flex xl:flex-row gap-3 items-stretch sm:items-center xl:mr-10">
                            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full px-6 py-2.5 font-medium w-full sm:w-auto">
                                <Sparkles className="w-4 h-4 mr-2" />
                                Ask AI
                            </Button>

                            <Button
                                variant="outline"
                                className="rounded-full px-6 py-2.5 font-medium border-[#84dacf] border-2 hover:bg-gray-50 w-full sm:w-auto"
                            >
                                Get tasks updates
                            </Button>

                            <Button
                                variant="outline"
                                className="rounded-full px-6 py-2.5 font-medium border-[#84dacf] border-2 hover:bg-gray-50 w-full sm:w-auto"
                            >
                                Create workspace
                            </Button>

                            <Button
                                variant="outline"
                                className="rounded-full px-6 py-2.5 font-medium border-[#84dacf] border-2 hover:bg-gray-50 w-full sm:w-auto"
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
                className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-purple-500 hover:bg-purple-600 text-white shadow-lg z-50"
                size="icon"
            >
                <Sparkles className="w-6 h-6" />
            </Button>
        </div>
    )
}