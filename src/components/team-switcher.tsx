"use client"

import * as React from "react"
import { ChevronDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Image, { StaticImageData } from "next/image"


type TTeam = {
  name: string
  logo: React.ElementType
  image: StaticImageData
  plan: string
  status: string
}

export function TeamSwitcher({
  teams,
}: {
  teams: TTeam[]
}) {
  const { isMobile, open } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={`data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border-gray-120 rounded-lg overflow-visible ${open ? 'border-[0.08rem]' : ''}`}
            >
              <div className="text-sidebar-primary-foreground flex aspect-square items-center justify-center rounded-full mr-1 relative bg-[#ded1f1] size-8">
                <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-full">
                  <Image src={activeTeam.image} alt={activeTeam.name} width={32} height={32} className="w-full h-full object-cover rounded-full mt-2" />
                </div>
                <div className={`size-2 absolute bottom-0 right-0 rounded-full ${activeTeam.status === "online" ? "bg-green-300" : activeTeam.status === "away" ? "bg-yellow-300" : "bg-red-300"} z-50`} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-[0.87rem]">{activeTeam.name}</span>
                <span className="truncate text-[0.56rem] text-gray-400">{activeTeam.status === "online" ? "Online" : activeTeam.status === "away" ? "Away" : "Offline"}</span>
              </div>
              <ChevronDown className={`ml-auto text-gray-medium ${!open && 'hidden'} size-4`} strokeWidth={2.5} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-[3.5rem] rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2 "
              >
                <div className="flex size-6 items-center justify-center relative">
                  <Image src={team.image} alt={team.name} width={32} height={32} className="object-cover rounded-full" />
                  <div className={`size-2 absolute bottom-0 right-0 rounded-full ${team.status === "online" ? "bg-green-300" : team.status === "away" ? "bg-yellow-300" : "bg-red-300"}`} />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
