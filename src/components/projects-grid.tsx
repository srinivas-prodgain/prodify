"use client"

import { useState } from "react"
import {
    ChevronDown,
    Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FilterOptions, TFilterOption, TProject } from "@/types/ui"


const projects: TProject[] = [
    { id: 1, name: "Product launch", tasks: 6, teammates: 12, color: "bg-purple-100", icon: "🚀" },
    { id: 2, name: "Team brainstorm", tasks: 2, teammates: 32, color: "bg-blue-100", icon: "💙" },
    { id: 3, name: "Branding launch", tasks: 4, teammates: 9, color: "bg-cyan-100", icon: "💎" }
]

export function ProjectsGrid() {
    const [selectedFilter, setSelectedFilter] = useState<TFilterOption>('Recents')

    const handleCreateProject = () => {
        console.log('Create new project')
    }

    const handleProjectClick = (projectId: number) => {
        console.log(`Clicked project: ${projectId}`)
    }

    const handleFilterChange = (filter: TFilterOption) => {
        setSelectedFilter(filter)
        console.log(`Filter changed to: ${filter}`)
    }

    return (
        <Card className="rounded-xl border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                    <span className="text-lg">📁</span>
                    <CardTitle className="text-lg font-semibold">Projects</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
                                {selectedFilter}
                                <ChevronDown className="w-4 h-4 ml-1" />
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
                        className="border-2 border-dashed border-gray-300 rounded-lg p-3 flex flex-col items-center justify-center h-16 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={handleCreateProject}
                    >
                        <Plus className="w-6 h-6 text-gray-400 mb-1" />
                        <span className="text-sm font-medium text-gray-600">Create new project</span>
                    </div>

                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border h-16 cursor-pointer transition-colors"
                            onClick={() => handleProjectClick(project.id)}
                        >
                            <div className={`w-10 h-10 rounded-lg ${project.color} flex items-center justify-center text-lg flex-shrink-0`}>
                                {project.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm leading-tight">{project.name}</h4>
                                <p className="text-xs text-muted-foreground mt-1">
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