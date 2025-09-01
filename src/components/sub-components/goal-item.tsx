"use client"

import { Progress } from "@/components/ui/progress"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { TGoal } from "@/types/ui"

interface GoalItemProps {
    goal: TGoal
    onClick?: (goalId: number) => void
}

export function GoalItem({ goal, onClick }: GoalItemProps) {
    const handleClick = () => {
        onClick?.(goal.id)
    }

    return (
        <Tooltip delayDuration={500}>
            <TooltipTrigger asChild>
                <div
                    className="p-2 pl-0 rounded-lg transition-colors cursor-pointer"
                    onClick={handleClick}
                >
                    {/* Desktop layout (≥560px) */}
                    <div className="hidden min-[560px]:flex items-start gap-4">
                        <div className="flex-1">
                            <h4 className="font-[580] text-md leading-tight">{goal.name}</h4>
                            <p className="text-[0.88rem] text-gray-light">
                                {goal.project} • My Projects
                            </p>
                        </div>

                        <div className="flex-1 max-w-[5rem] mt-2">
                            <Progress
                                value={goal.progress}
                                className="h-2 ml-2"
                            />
                        </div>
                        <span className="text-[0.94rem] font-[580] text-foreground min-w-[2.5rem] text-right">
                            {goal.progress}%
                        </span>
                    </div>

                    {/* Mobile layout (<560px) */}
                    <div className="block min-[560px]:hidden">
                        <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1 min-w-0">
                                <h4 className="font-[580] text-sm leading-tight truncate">{goal.name}</h4>
                                <p className="text-[0.81rem] text-gray-medium mt-0.5 truncate">
                                    {goal.project} • My Projects
                                </p>
                            </div>
                            <span className="text-[0.94rem] font-[580] text-foreground ml-2 flex-shrink-0">
                                {goal.progress}%
                            </span>
                        </div>

                        <div className="w-full">
                            <Progress
                                value={goal.progress}
                                className="h-2"
                            />
                        </div>
                    </div>
                </div>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={8}>
                <p className="text-sm font-medium leading-relaxed">{goal.name}</p>
            </TooltipContent>
        </Tooltip>
    )
}
