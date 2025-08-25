import { TTask } from "@/types/ui"
import { Button } from "../ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { TasksTable } from "../tasks-table"

import { ChevronUp, ChevronDown } from "lucide-react"

const STATUS_CONFIG = {
    progress: { label: "IN PROGRESS", bgColor: "bg-[#abedee]" },
    todo: { label: "TO DO", bgColor: "bg-[#f2f3f7]" },
    upcoming: { label: "UPCOMING", bgColor: "bg-[#f9d3b0]" }
} as const


type TChevronIconProps = {
    isOpen: boolean
}


type TTaskSectionProps = {
    status: keyof typeof STATUS_CONFIG
    isOpen: boolean
    onToggle: (open: boolean) => void
    tasks: TTask[]
}


const ChevronIcon = ({ isOpen }: TChevronIconProps) =>
    isOpen ? <ChevronUp className="size-4" strokeWidth={2.5} /> : <ChevronDown className="size-4" strokeWidth={2.5} />



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
                        <ChevronIcon isOpen={isOpen} />
                        <span className={`px-2 py-1 rounded-[0.3125rem] text-xs font-[580] text-black ${config.bgColor}`}>
                            {config.label}
                        </span>
                        <span className="text-sm text-black">•</span>
                        <span className="text-[0.75rem] text-black mb-[0.125rem]">{tasks.length} tasks</span>
                    </div>
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
                <TasksTable tasks={tasks} />
            </CollapsibleContent>
        </Collapsible>
    )
}
