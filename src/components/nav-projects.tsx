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
          className="h-6 px-2 text-xs font-medium text-[#ac45ff] hover:bg-[#d3aaff] hover:text-[#ac45ff] hover:border-[#ac45ff]"
        >
          <Plus className="w-3 h-3 mr-1" />
          <span className="text-sm text-black">Add</span>
        </Button>
      </div>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name} >
            <SidebarMenuButton asChild className="cursor-pointer p-4 mt-1 hover:bg-[#d3aaff] hover:text-[#ac45ff]">
              <a href={item.url} className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
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