"use client"

import { useState, useMemo } from "react"
import {
    ClipboardList,
    Maximize2,
    MoreHorizontal,
    Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { tasks } from "@/data/dummydata"
import { TaskSection } from "./sub-components/task-section"



export function MyTasks() {
    const [isInProgressOpen, setIsInProgressOpen] = useState(true)
    const [isToDoOpen, setIsToDoOpen] = useState(false)
    const [isUpcomingOpen, setIsUpcomingOpen] = useState(false)

    const groupedTasks = useMemo(() => ({
        inProgress: tasks.filter(task => task.status === 'progress'),
        toDo: tasks.filter(task => task.status === 'todo'),
        upcoming: tasks.filter(task => task.status === 'upcoming')
    }), [])


    return (
        <Card className="rounded-xl border py-4 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <ClipboardList className="text-[#8379c9] size-5" strokeWidth={2} />
                    <CardTitle className="text-lg font-[580]">My Tasks</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-black hover:bg-purple-50 hover:text-[#6742ED]"
                    >
                        <Plus className="size-4" strokeWidth={2} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-black hover:bg-purple-50 hover:text-[#6742ED]"
                    >
                        <Maximize2 className="size-4" strokeWidth={2} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-black hover:bg-purple-50 hover:text-[#6742ED]"
                    >
                        <MoreHorizontal className="size-4" strokeWidth={2} />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <TaskSection
                    status="progress"
                    isOpen={isInProgressOpen}
                    onToggle={setIsInProgressOpen}
                    tasks={groupedTasks.inProgress}
                />
                <TaskSection
                    status="todo"
                    isOpen={isToDoOpen}
                    onToggle={setIsToDoOpen}
                    tasks={groupedTasks.toDo}
                />
                <TaskSection
                    status="upcoming"
                    isOpen={isUpcomingOpen}
                    onToggle={setIsUpcomingOpen}
                    tasks={groupedTasks.upcoming}
                />
            </CardContent>
        </Card>
    )
}
