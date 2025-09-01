"use client"

import { CircularProgress } from "@/components/sub-components/circular-progress"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { TFocusMetric } from "@/types/ui"

interface FocusMetricItemProps {
    metric: TFocusMetric
    onClick?: (metricId: number) => void
}

export function FocusMetricItem({ metric, onClick }: FocusMetricItemProps) {
    const handleClick = () => {
        onClick?.(metric.id)
    }

    const percentage = Math.round((metric.value / metric.target) * 100)

    return (
        <Tooltip delayDuration={500}>
            <TooltipTrigger asChild>
                <div
                    className="p-2 pl-0 rounded-lg transition-colors cursor-pointer"
                    onClick={handleClick}
                >
                    {/* Desktop Layout */}
                    <div className="hidden min-[560px]:flex items-center gap-4">
                        <CircularProgress
                            value={metric.value}
                            target={metric.target}
                            color={metric.color}
                            size={50}
                        />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span style={{ color: metric.color }}>
                                    {metric.icon}
                                </span>
                                <h4 className="font-[580] text-md leading-tight">
                                    {metric.name}
                                </h4>
                            </div>
                            <p className="text-[0.88rem] text-gray-light">
                                {metric.description}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-[0.94rem] font-[580] text-foreground">
                                {metric.value}/{metric.target}h
                            </div>
                            <div className="text-[0.81rem] text-gray-light">
                                {percentage}%
                            </div>
                        </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="block min-[560px]:hidden">
                        <div className="flex items-center gap-3">
                            <CircularProgress
                                value={metric.value}
                                target={metric.target}
                                color={metric.color}
                                size={42}
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span style={{ color: metric.color }}>
                                        {metric.icon}
                                    </span>
                                    <h4 className="font-[580] text-sm leading-tight">
                                        {metric.name}
                                    </h4>
                                </div>
                                <p className="text-[0.81rem] text-gray-light truncate">
                                    {metric.description}
                                </p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <div className="text-[0.88rem] font-[580] text-foreground">
                                    {metric.value}/{metric.target}h
                                </div>
                                <div className="text-[0.75rem] text-gray-light">
                                    {percentage}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={8}>
                <p className="text-sm font-medium leading-relaxed">{metric.name}</p>
            </TooltipContent>
        </Tooltip>
    )
}
