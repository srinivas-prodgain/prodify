"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
    value?: number
}

function Progress({ className, value = 0, ...props }: ProgressProps) {
    const getProgressColor = (progress: number) => {
        if (progress >= 80) return "bg-[#26e5cc]"
        if (progress >= 60) return "bg-[#31d4d0]"
        if (progress >= 40) return "bg-[#f9d3b0]"
        if (progress >= 20) return "bg-[#ffae65]"
        if (progress >= 10) return "bg-[#ffae65]"
        return "bg-[#ffc1c2]"
    }

    return (
        <div
            className={cn(
                "relative h-2 w-full overflow-hidden rounded-full bg-[#f2f3f7]",
                className
            )}
            {...props}
        >
            <div
                className={`h-full transition-all duration-300 ease-in-out ${getProgressColor(value)} rounded-full`}
                style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
            />
        </div>
    )
}

export { Progress }
