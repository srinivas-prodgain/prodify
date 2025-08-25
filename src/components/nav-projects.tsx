"use client"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"




export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    color: string
  }[]
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <div className="flex items-center justify-between px-2 mb-2">
        <h3 className="text-sm font-medium text-sidebar-foreground ml-2">My Projects</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 text-xs font-medium text-[#6d67c1] bg-[#f5f6ff] hover:bg-[#f5f4ff] hover:text-[#ac45ff] hover:border-[#ac45ff] rounded-full p-3 flex items-center gap-[2px] "
        >
          <Plus className="size-2" strokeWidth={3} />
          <span className="text-sm font-medium">Add</span>
        </Button>
      </div>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name} >
            <SidebarMenuButton asChild className="p-4 mt-1 hover:bg-[#f5f4ff] cursor-pointer">
              <a href={item.url} className="flex items-center gap-3">
                <div    
                  className="w-2.5 h-2.5 flex-shrink-0 rounded-xs"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}