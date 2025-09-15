"use client"

import { cn } from "@/lib/utils"

type BaseProgressProps = {
    value: number
    className?: string
}


type LinearProgressProps = BaseProgressProps & {
    variant?: "linear"
}

type CircularProgressProps = BaseProgressProps & {
    variant: "circular"
    target: number
    color: string
    size?: number
    showValue?: boolean
    valueUnit?: string
}

type UnifiedProgressProps = LinearProgressProps | CircularProgressProps

const UnifiedProgress = (props: UnifiedProgressProps) => {
    const { variant = "linear", value, className } = props

    if (variant === "circular") {
        const { target, color, size = 60, showValue = true, valueUnit = "h" } = props as CircularProgressProps

        const percentage = Math.min((value / target) * 100, 100)
        const strokeWidth = 4
        const radius = (size - strokeWidth) / 2
        const circumference = radius * Math.PI * 2
        const offset = circumference - (percentage / 100) * circumference

        return (
            <div className={cn("relative", className)} style={{ width: size, height: size }}>
                <svg
                    className="transform -rotate-90"
                    width={size}
                    height={size}
                >
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="#f2f3f7"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        className="transition-all duration-300 ease-in-out"
                    />
                </svg>
                {showValue && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-[580] text-foreground">
                            {value}{valueUnit}
                        </span>
                    </div>
                )}
            </div>
        )
    }

    const getProgressColor = (progress: number): string => {
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
        >
            <div
                className={cn(
                    "h-full transition-all duration-300 ease-in-out rounded-full",
                    getProgressColor(value)
                )}
                style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
            />
        </div>
    )
}

export { UnifiedProgress }
export type { UnifiedProgressProps }
