"use client"

import { useState } from "react"
import {
    Briefcase,
    ChevronDown,
    Plus,
    Rocket,
    Brain,
    Diamond,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FilterOptions, TFilterOption } from "@/types/ui"
import { projects } from "@/data/dummydata"



const ICONS_FILTER_OPTIONS: Record<string, React.ReactNode> = {
    Rocket: <Rocket className="size-6 text-purple-500" strokeWidth={2} />,
    Brain: <Brain className="size-6 text-blue-500" strokeWidth={2} />,
    Diamond: <Diamond className="size-6 text-cyan-500" strokeWidth={2} />,
}


export function ProjectsGrid() {
    const [selectedFilter, setSelectedFilter] = useState<TFilterOption>('Recents')

    const handleFilterChange = (filter: TFilterOption) => {
        setSelectedFilter(filter)
        console.log(`Filter changed to: ${filter}`)
    }

    return (
        <Card className="rounded-xl border py-4 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <Briefcase className="text-[#8379c9] size-5" strokeWidth={2} />
                    <CardTitle className="text-lg font-[580]">Projects</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-[12px] text-[#999999] hover:bg-purple-50 hover:text-black flex items-center gap-0">
                                {selectedFilter}
                                <ChevronDown className="size-4 ml-1" strokeWidth={2} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {FilterOptions.map((filter) => (
                                <DropdownMenuItem
                                    key={filter}
                                    onClick={() => handleFilterChange(filter)}
                                    className={selectedFilter === filter ? 'bg-purple-50' : ''}
                                >
                                    {filter}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                        className="rounded-lg p-3 pl-0 flex items-center h-16 transition-colors cursor-pointer gap-3"
                    >
                        <div
                            className="size-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{
                                backgroundImage:
                                    'url("data:image/svg+xml,%3csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3crect width=\'100%25\' height=\'100%25\' fill=\'none\' rx=\'15\' ry=\'15\' stroke=\'%236742EDFF\' stroke-width=\'3\' stroke-dasharray=\'4%2c8\' stroke-dashoffset=\'56\' stroke-linecap=\'square\'/%3e%3c/svg%3e")',
                            }}
                        >
                            <Plus className="size-4 text-[#6742ED]" strokeWidth={1.8} />
                        </div>
                        <span className="text-[16px] font-[550] text-black">Create new project</span>
                    </div>

                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="flex items-center gap-3 p-3 pl-0 rounded-lg h-16 transition-colors cursor-pointer"
                        >
                            <div className={`size-12 rounded-lg ${project.color} flex items-center justify-center flex-shrink-0`}>
                                {ICONS_FILTER_OPTIONS[project.icon as keyof typeof ICONS_FILTER_OPTIONS] || <Rocket className="size-6 text-purple-500" strokeWidth={2} />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-[550] text-[16px] leading-tight text-black">{project.name}</h4>
                                <p className="text-[14px] text-[#989898]">
                                    {project.tasks} tasks • {project.teammates} teammates
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}