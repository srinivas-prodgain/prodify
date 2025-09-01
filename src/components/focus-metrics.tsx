"use client"

import { Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FocusMetricItem } from "@/components/sub-components/focus-metric-item"
import { focusMetrics } from "@/data/dummy-data"



export function FocusMetrics() {
    const handleMetricClick = (metricId: number) => {
        console.log(`Clicked metric: ${metricId}`)
    }

    return (
        <Card className="rounded-xl border py-4 gap-2 shadow-none">
            <CardHeader className="pb-3 max-[560px]:pb-2">
                <div className="flex items-center gap-2">
                    <Clock className="text-brand-purple-light size-5" strokeWidth={2} />
                    <CardTitle className="text-lg font-[580] max-[560px]:text-base">Focus Metrics</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 max-[560px]:space-y-3">
                {focusMetrics.length > 0 ? (
                    <div className="grid gap-4">
                        {focusMetrics.map((metric) => (
                            <FocusMetricItem
                                key={metric.id}
                                metric={metric}
                                onClick={handleMetricClick}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <Clock className="size-8 mx-auto mb-2 opacity-50 text-brand-purple-secondary" strokeWidth={2} />
                        <p className="text-sm">No focus data yet</p>
                        <p className="text-xs mt-1">Start tracking your time to see metrics</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
