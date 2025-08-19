"use client"

import { useState, useMemo } from "react"
import {
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    Plus,
    MoreHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import TaskItem from "@/components/task-item"
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
        <Card className="rounded-xl border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <CardTitle className="text-lg font-semibold">My Tasks</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={handleAddTask}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add task
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => handleTaskAction(0, 'menu')}
                    >
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <Collapsible open={isInProgressOpen} onOpenChange={setIsInProgressOpen}>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                            <div className="flex items-center gap-2">
                                {isInProgressOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                                    IN PROGRESS
                                </span>
                                <span className="text-sm text-muted-foreground">{groupedTasks.inProgress.length} tasks</span>
                            </div>
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mt-3">
                        {groupedTasks.inProgress.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </CollapsibleContent>
                </Collapsible>

                <Collapsible open={isToDoOpen} onOpenChange={setIsToDoOpen}>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                            <div className="flex items-center gap-2">
                                {isToDoOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                                    TO DO
                                </span>
                                <span className="text-sm text-muted-foreground">{groupedTasks.toDo.length} tasks</span>
                            </div>
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mt-3">
                        {groupedTasks.toDo.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </CollapsibleContent>
                </Collapsible>

                <Collapsible open={isUpcomingOpen} onOpenChange={setIsUpcomingOpen}>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                            <div className="flex items-center gap-2">
                                {isUpcomingOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                                    UPCOMING
                                </span>
                                <span className="text-sm text-muted-foreground">{groupedTasks.upcoming.length} tasks</span>
                            </div>
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mt-3">
                        {groupedTasks.upcoming.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    )
}
