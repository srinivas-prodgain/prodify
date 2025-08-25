"use client"

import { useState, useMemo } from "react"
import {
    ChevronDown,
    ChevronUp,
    ClipboardList,
    Maximize2,
    MoreHorizontal,
    Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { TasksTable } from "@/components/tasks-table"
import { TTask } from "@/types/ui"
import { tasks } from "@/data/dummydata"


type TTaskSectionProps = {
    status: keyof typeof STATUS_CONFIG
    isOpen: boolean
    onToggle: (open: boolean) => void
    tasks: TTask[]
}

type TChevronIconProps = {
    isOpen: boolean
}

type TActionButtonProps = {
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>,
    onClick?: () => void
}




const STATUS_CONFIG = {
    progress: { label: "IN PROGRESS", bgColor: "bg-[#abedee]" },
    todo: { label: "TO DO", bgColor: "bg-[#f2f3f7]" },
    upcoming: { label: "UPCOMING", bgColor: "bg-[#f9d3b0]" }
} as const



const ChevronIcon = ({ isOpen }: TChevronIconProps) =>
    isOpen ? <ChevronUp className="size-4" strokeWidth={2.5} /> : <ChevronDown className="size-4" strokeWidth={2.5} />


const ActionButton = ({
    icon: Icon,
    onClick
}: TActionButtonProps) => (
    <Button
        variant="ghost"
        size="sm"
        className="text-black hover:bg-purple-50 hover:text-[#6742ED]"
        onClick={onClick}
    >
        <Icon className="size-4" strokeWidth={2} />
    </Button>
)


const TaskSection = ({
    status,
    isOpen,
    onToggle,
    tasks
}: TTaskSectionProps) => {
    const config = STATUS_CONFIG[status]

    return (
        <Collapsible open={isOpen} onOpenChange={onToggle}>
            <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between h-auto hover:bg-transparent p-0 py-2">
                    <div className="flex items-center gap-2">
                        <ChevronIcon isOpen={isOpen} />
                        <span className={`px-2 py-1 rounded-[5px] text-xs font-[580] text-black ${config.bgColor}`}>
                            {config.label}
                        </span>
                        <span className="text-sm text-black">•</span>
                        <span className="text-[12px] text-black mb-[2px]">{tasks.length} tasks</span>
                    </div>
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
                <TasksTable tasks={tasks} />
            </CollapsibleContent>
        </Collapsible>
    )
}


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
                    <ActionButton icon={Plus} />
                    <ActionButton icon={Maximize2} />
                    <ActionButton icon={MoreHorizontal} />
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
