"use client"

import { Goal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GoalItem } from "@/components/sub-components/goal-item"
import { goals } from "@/data/dummy-data"

export function MyGoals() {
    const handleGoalClick = (goalId: number) => {
        console.log(`Clicked goal: ${goalId}`)
    }

    return (
        <Card className="rounded-xl border py-4 gap-2 shadow-none">
            <CardHeader className="pb-3 max-[560px]:pb-2">
                <div className="flex items-center gap-2">
                    <Goal className="text-brand-purple-light size-5" strokeWidth={2} />
                    <CardTitle className="text-lg font-[580] max-[560px]:text-base">My Goals</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 max-[560px]:space-y-3">
                {goals.length > 0 ? (
                    goals.map((goal) => (
                        <GoalItem
                            key={goal.id}
                            goal={goal}
                            onClick={handleGoalClick}
                        />
                    ))
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <Goal className="size-8 mx-auto mb-2 opacity-50 text-brand-purple-secondary" strokeWidth={2} />
                        <p className="text-sm">No goals set yet</p>
                        <p className="text-xs mt-1">Create your first goal to track progress</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
