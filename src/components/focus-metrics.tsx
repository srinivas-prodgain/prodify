"use client"

import { AlertTriangle, Bed, Clock, Target, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircularProgress } from "@/components/circular-progress"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { focusMetrics } from "@/data/dummydata"



const ICONS_FOCUS_METRICS: Record<string, React.ReactNode> = {
    Target: <Target className="size-4" />,
    Users: <Users className="size-4" />,
    AlertTriangle: <AlertTriangle className="size-4" />,
}

export function FocusMetrics() {
    const handleMetricClick = (metricId: number) => {
        console.log(`Clicked metric: ${metricId}`)
    }

    return (
        <Card className="rounded-xl border py-4 gap-2 shadow-none">
            <CardHeader className="pb-3 max-[560px]:pb-2">
                <div className="flex items-center gap-2">
                    <Clock className="text-[#8379c9] size-5" strokeWidth={2} />
                    <CardTitle className="text-lg font-[580] max-[560px]:text-base">Focus Metrics</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 max-[560px]:space-y-3">
                {focusMetrics.length > 0 ? (
                    <div className="grid gap-4">
                        {focusMetrics.map((metric) => (
                            <Tooltip key={metric.id} delayDuration={500}>
                                <TooltipTrigger asChild>
                                    <div
                                        className="p-2 pl-0 rounded-lg transition-colors cursor-pointer"
                                        onClick={() => handleMetricClick(metric.id)}
                                    >
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
                                                        {ICONS_FOCUS_METRICS[metric.icon as keyof typeof ICONS_FOCUS_METRICS] || <Target className="size-4" />}
                                                    </span>
                                                    <h4 className="font-[580] text-md leading-tight">
                                                        {metric.name}
                                                    </h4>
                                                </div>
                                                <p className="text-[14px] text-[#b9b9b9]">
                                                    {metric.description}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[15px] font-[580] text-foreground">
                                                    {metric.value}/{metric.target}h
                                                </div>
                                                <div className="text-[13px] text-[#b9b9b9]">
                                                    {Math.round((metric.value / metric.target) * 100)}%
                                                </div>
                                            </div>
                                        </div>

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
                                                            {ICONS_FOCUS_METRICS[metric.icon as keyof typeof ICONS_FOCUS_METRICS] || <Target className="size-4" />}
                                                        </span>
                                                        <h4 className="font-[580] text-sm leading-tight">
                                                            {metric.name}
                                                        </h4>
                                                    </div>
                                                    <p className="text-[13px] text-[#b9b9b9] truncate">
                                                        {metric.description}
                                                    </p>
                                                </div>
                                                <div className="text-right flex-shrink-0">
                                                    <div className="text-[14px] font-[580] text-foreground">
                                                        {metric.value}/{metric.target}h
                                                    </div>
                                                    <div className="text-[12px] text-[#b9b9b9]">
                                                        {Math.round((metric.value / metric.target) * 100)}%
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
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <Clock className="size-8 mx-auto mb-2 opacity-50 text-[#6742ED]" strokeWidth={2} />
                        <p className="text-sm">No focus data yet</p>
                        <p className="text-xs mt-1">Start tracking your time to see metrics</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
