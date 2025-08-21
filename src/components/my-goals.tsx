"use client"

import { Goal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TGoal } from "@/types/ui"

// Internal dummy data
const goals: TGoal[] = [
    { id: 1, name: "Check Emails and Messages", project: "Product launch", progress: 73, color: "bg-cyan-500" },
    { id: 2, name: "Prepare a brief status update to the client", project: "Product launch", progress: 21, color: "bg-orange-500" },
    { id: 3, name: "Update project documentation", project: "Team brainstorm", progress: 63, color: "bg-cyan-500" }
]

export function MyGoals() {

    const handleGoalClick = (goalId: number) => {
        console.log(`Clicked goal: ${goalId}`)
        // TODO: Navigate to goal detail or open goal editor
    }

    return (
        <Card className="rounded-xl border shadow-sm">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Goal className="w-6 h-6 text-[#8379c9]" strokeWidth={2} />
                    <CardTitle className="text-lg font-[580]">My Goals</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 ">
                {goals.length > 0 ? (
                    goals.map((goal) => (
                        <div
                            key={goal.id}
                            className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
                            onClick={() => handleGoalClick(goal.id)}
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <h4 className="font-[580] text-md leading-tight">{goal.name}</h4>
                                    <p className="text-[14px] text-[#a5a5a5] mt-1">
                                        {goal.project} • My Projects
                                    </p>
                                </div>

                                <div className="flex-1 max-w-[100px] mt-2">
                                    <Progress
                                        value={goal.progress}
                                        className="h-2"
                                    />
                                </div>

                                <span className="text-[15px] font-[580] text-foreground min-w-[40px] text-right">
                                    {goal.progress}%
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <Goal className="w-8 h-8 mx-auto mb-2 opacity-50 text-[#6742ED]" strokeWidth={2} />
                        <p className="text-sm">No goals set yet</p>
                        <p className="text-xs mt-1">Create your first goal to track progress</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
