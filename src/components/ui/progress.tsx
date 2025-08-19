"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number
}

function Progress({ className, value = 0, ...props }: ProgressProps) {
    return (
        <div
            className={cn(
                "relative h-2 w-full overflow-hidden rounded-full bg-gray-200",
                className
            )}
            {...props}
        >
            <div
                className="h-full bg-cyan-500 transition-all duration-300 ease-in-out"
                style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
            />
        </div>
    )
}

export { Progress }
