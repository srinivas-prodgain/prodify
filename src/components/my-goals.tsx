"use client"

import { Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export type TGoal = {
    id: number
    name: string
    project: string
    progress: number
    color: string
}

// Internal dummy data
const goals: TGoal[] = [
    { id: 1, name: "Check Emails and Messages", project: "Product launch", progress: 73, color: "bg-cyan-500" },
    { id: 2, name: "Prepare a brief status update to the client", project: "Product launch", progress: 11, color: "bg-orange-500" },
    { id: 3, name: "Update project documentation", project: "Team brainstorm", progress: 63, color: "bg-cyan-500" }
]

export function MyGoals() {




    const handleGoalClick = (goalId: number) => {
        console.log(`Clicked goal: ${goalId}`)
        // TODO: Navigate to goal detail or open goal editor
    }

    const handleGoalUpdate = (goalId: number, progress: number) => {
        console.log(`Update goal ${goalId} progress to: ${progress}%`)
        // TODO: Update goal progress in backend
    }


    const getProgressColor = (progress: number): string => {
        if (progress >= 80) return "bg-green-500"
        if (progress >= 60) return "bg-cyan-500"
        if (progress >= 40) return "bg-yellow-500"
        if (progress >= 20) return "bg-orange-500"
        return "bg-red-500"
    }

    return (
        <Card className="rounded-xl border shadow-sm">
            <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    <CardTitle className="text-lg font-semibold">My Goals</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {goals.length > 0 ? (
                    goals.map((goal) => (
                        <div
                            key={goal.id}
                            className="space-y-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                            onClick={() => handleGoalClick(goal.id)}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h4 className="font-medium text-sm leading-tight">{goal.name}</h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {goal.project} • My Projects
                                    </p>
                                </div>
                                <span className="text-sm font-medium text-foreground ml-2">
                                    {goal.progress}%
                                </span>
                            </div>
                            <div className="relative">
                                <Progress
                                    value={goal.progress}
                                    className="h-2"
                                />
                                {/* Custom colored progress bar */}
                                <div
                                    className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-300 ${getProgressColor(goal.progress)}`}
                                    style={{ width: `${Math.min(100, Math.max(0, goal.progress))}%` }}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No goals set yet</p>
                        <p className="text-xs mt-1">Create your first goal to track progress</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
