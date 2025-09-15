import { TTask } from "@/types/ui"
import { Button } from "../ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { TasksTable } from "./tasks-table"
import { cn } from "@/lib/utils"

import { ChevronDown } from "lucide-react"

const TASK_STATUS = ['progress', 'todo', 'upcoming'] as const

type TTaskStatus = typeof TASK_STATUS[number]

const STATUS_CONFIG = {
    progress: { label: "IN PROGRESS", bgColor: "bg-[#abedee]" },
    todo: { label: "TO DO", bgColor: "bg-[#f2f3f7]" },
    upcoming: { label: "UPCOMING", bgColor: "bg-[#f9d3b0]" }
} as const

type TTaskSectionProps = {
    status: TTaskStatus
    isOpen: boolean
    onToggle: (open: boolean) => void
    tasks: TTask[]
}



export const TaskSection = ({
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
                        <ChevronDown className={cn(
                            "size-4 strokeWidth-[2.5] transition-transform duration-200",
                            isOpen && "rotate-180"
                        )} />
                        <span className={cn(
                            "px-2 py-1 rounded-[0.31rem] text-xs font-[580]",
                            config.bgColor
                        )}>
                            {config.label}
                        </span>
                        <span className="text-sm">•</span>
                        <span className="text-[0.75rem] mb-[0.13rem]">{tasks.length} tasks</span>
                    </div>
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
                <TasksTable tasks={tasks} />
            </CollapsibleContent>
        </Collapsible>
    )
}
