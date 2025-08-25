"use client"
type TCircularProgressProps = {
    value: number
    target: number
    color: string
    size?: number
}


export function CircularProgress({
    value,
    target,
    color,
    size = 60
}: TCircularProgressProps) {
    const percentage = Math.min((value / target) * 100, 100)
    const strokeWidth = 4
    const radius = (size - strokeWidth) / 2
    const circumference = radius * Math.PI * 2
    const offset = circumference - (percentage / 100) * circumference

    return (
        <div className="relative" style={{ width: size, height: size }}>
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
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-[580] text-foreground">
                    {value}h
                </span>
            </div>
        </div>
    )
}
