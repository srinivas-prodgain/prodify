"use client"

import { useState } from "react"
import {
    ChevronDown,
    Diamond,
    FolderKanban,
    Plus,
    Rocket,
    Brain
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
    { id: 1, name: "Product launch", tasks: 6, teammates: 12, color: "bg-purple-100", icon: <Rocket className="w-6 h-6 text-purple-500" strokeWidth={2} /> },
    { id: 2, name: "Team brainstorm", tasks: 2, teammates: 32, color: "bg-blue-100", icon: <Brain className="w-6 h-6 text-blue-500" strokeWidth={2} /> },
    { id: 3, name: "Branding launch", tasks: 4, teammates: 9, color: "bg-cyan-100", icon: <Diamond className="w-6 h-6 text-cyan-500" strokeWidth={2} /> }
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
                    <FolderKanban className="w-6 h-6 text-[#8379c9]" strokeWidth={2}/>
                    <CardTitle className="text-lg font-[580]">Projects</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:bg-purple-50 hover:text-[#6742ED]">
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
                        className="rounded-lg p-3 pl-0 flex items-center justify-start h-16 transition-colors cursor-pointer gap-3"
                        onClick={handleCreateProject}
                    >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 border-2  border-dashed  border-[#6742ED]">
                            <Plus className="w-4 h-4 text-[#6742ED]" strokeWidth={1.8} />
                        </div>
                        <span className="text-sm font-semibold text-gray-600 ">Create new project</span>
                    </div>

                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="flex items-center gap-3 p-3 pl-0 rounded-lg hover:bg-gray-50 h-16 transition-colors"
                            onClick={() => handleProjectClick(project.id)}
                        >
                            <div className={`w-10 h-10 rounded-lg ${project.color} flex items-center justify-center text-lg flex-shrink-0`}>
                                {project.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm leading-tight">{project.name}</h4>
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