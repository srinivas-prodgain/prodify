"use client"

import { Goal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { goals } from "@/data/dummydata"

export function MyGoals() {

    return (
        <Card className="rounded-xl border py-4 gap-2 shadow-none">
            <CardHeader className="pb-3 max-[560px]:pb-2">
                <div className="flex items-center gap-2">
                    <Goal className="text-[#8379c9] size-5" strokeWidth={2} />
                    <CardTitle className="text-lg font-[580] max-[560px]:text-base">My Goals</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 max-[560px]:space-y-3">
                {goals.length > 0 ? (
                    goals.map((goal) => (
                        <Tooltip key={goal.id} delayDuration={500}>
                            <TooltipTrigger asChild>
                                <div
                                    className="p-2 pl-0 rounded-lg transition-colors cursor-pointer"
                                >
                                    {/* Desktop layout (≥560px) */}
                                    <div className="hidden min-[560px]:flex items-start gap-4">
                                        <div className="flex-1">
                                            <h4 className="font-[580] text-md leading-tight">{goal.name}</h4>
                                            <p className="text-[14px] text-[#b9b9b9]">
                                                {goal.project} • My Projects
                                            </p>
                                        </div>

                                        <div className="flex-1 max-w-[80px] mt-2">
                                            <Progress
                                                value={goal.progress}
                                                className="h-2 ml-2"
                                            />
                                        </div>
                                        <span className="text-[15px] font-[580] text-foreground min-w-[40px] text-right">
                                            {goal.progress}%
                                        </span>
                                    </div>

                                    {/* Mobile layout (<560px) */}
                                    <div className="block min-[560px]:hidden">
                                        <div className="flex items-start justify-between gap-3 mb-2">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-[580] text-sm leading-tight truncate">{goal.name}</h4>
                                                <p className="text-[13px] text-[#a5a5a5] mt-0.5 truncate">
                                                    {goal.project} • My Projects
                                                </p>
                                            </div>
                                            <span className="text-[15px] font-[580] text-foreground ml-2 flex-shrink-0">
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
                            <TooltipContent side="top-left" sideOffset={8}>
                                <p className="text-sm font-medium leading-relaxed">{goal.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <Goal className="size-8 mx-auto mb-2 opacity-50 text-[#6742ED]" strokeWidth={2} />
                        <p className="text-sm">No goals set yet</p>
                        <p className="text-xs mt-1">Create your first goal to track progress</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
