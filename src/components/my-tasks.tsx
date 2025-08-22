"use client"

import { useState, useMemo } from "react"
import {
    ChevronDown,
    ChevronUp,
    Plus,
    MoreHorizontal,
    ClipboardList,
    Maximize2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { TasksTable } from "@/components/tasks-table"
import { TTask } from "@/types/ui"


const tasks: TTask[] = [
    { id: 1, name: "One-on-One Meeting", priority: "High", dueDate: "Today", color: "#84dacf", status: "progress" },
    { id: 2, name: "Send a summary email to stakeholders", priority: "Low", dueDate: "3 days left", color: "#84dacf", status: "progress" },
    { id: 3, name: "Review design mockups", priority: "Medium", dueDate: "Tomorrow", color: "#84dacf", status: "todo" },
    { id: 4, name: "Client presentation", priority: "High", dueDate: "Next week", color: "#84dacf", status: "upcoming" },
    { id: 5, name: "Update project documentation", priority: "Medium", dueDate: "This week", color: "#84dacf", status: "todo" }
]


export function MyTasks() {
    const [isInProgressOpen, setIsInProgressOpen] = useState(true)
    const [isToDoOpen, setIsToDoOpen] = useState(false)
    const [isUpcomingOpen, setIsUpcomingOpen] = useState(false)


    const groupedTasks = useMemo(() => ({
        inProgress: tasks.filter(task => task.status === 'progress'),
        toDo: tasks.filter(task => task.status === 'todo'),
        upcoming: tasks.filter(task => task.status === 'upcoming')
    }), [tasks])


    const handleAddTask = () => {
        console.log('Add new task')
        // TODO: Implement add task functionality
    }

    const handleTaskAction = (taskId: number, action: string) => {
        console.log(`Task ${taskId} action: ${action}`)
        // TODO: Implement task actions (edit, delete, etc.)
    }

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
                        onClick={handleAddTask}
                    >
                        <Plus className="w-4 h-4" strokeWidth={2} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-black hover:bg-purple-50 hover:text-[#6742ED]">
                        <Maximize2 className="w-4 h-4" strokeWidth={2} />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-black hover:bg-purple-50 hover:text-[#6742ED] "
                        onClick={() => handleTaskAction(0, 'menu')}
                    >
                        <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <Collapsible open={isInProgressOpen} onOpenChange={setIsInProgressOpen} >
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent py-2">
                            <div className="flex items-center gap-2">
                                {isInProgressOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                <span className="bg-[#abedee] px-2 py-1 rounded-[5px] text-xs font-[580] text-black">
                                    IN PROGRESS
                                </span>
                                <span className="text-sm text-black">•</span>
                                <span className="text-[12px] text-black mb-[2px]">{groupedTasks.inProgress.length} tasks</span>
                            </div>
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                        <TasksTable tasks={groupedTasks.inProgress} />
                    </CollapsibleContent>
                </Collapsible>

                <Collapsible open={isToDoOpen} onOpenChange={setIsToDoOpen}>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent py-2">
                            <div className="flex items-center gap-2">
                                {isToDoOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                <span className="bg-[#f2f3f7] px-2 py-1 rounded-[5px] text-xs font-[580] text-black">
                                    TO DO
                                </span>
                                <span className="text-sm text-black">•</span>
                                <span className="text-[12px] text-black mb-[2px]">{groupedTasks.toDo.length} tasks</span>
                            </div>
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                        <TasksTable tasks={groupedTasks.toDo} />
                    </CollapsibleContent>
                </Collapsible>

                <Collapsible open={isUpcomingOpen} onOpenChange={setIsUpcomingOpen}>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent py-2">
                            <div className="flex items-center gap-2">
                                {isUpcomingOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                <span className="bg-[#f9d3b0] px-2 py-1 rounded-[5px] text-xs font-[580] text-black">
                                    UPCOMING
                                </span>
                                <span className="text-sm text-black">•</span>
                                <span className="text-[12px] text-black mb-[2px]">{groupedTasks.upcoming.length} tasks</span>
                            </div>
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                        <TasksTable tasks={groupedTasks.upcoming} />
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    )
}
