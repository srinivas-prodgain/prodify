"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Sparkles,
  Home,
  Inbox,
  CalendarDays,
  ClipboardList,
  ChartColumnStacked,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Separator } from "./ui/separator"

import m2 from "../../public/m2.webp"
import m3 from "../../public/m3.jpg"
import m4 from "../../public/m1-bgr.png"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Courtney Henry",
      image: m4,
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
      status: "online",
    },
    {
      name: "Acme Corp.",
      image: m2,
      logo: AudioWaveform,
      plan: "Startup",
      status: "offline",
    },
    {
      name: "Evil Corp.",
      image: m3,
      logo: Command,
      plan: "Free",
      status: "away",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Prodify AI",
      url: "#",
      icon: Sparkles,
    },
    {
      title: "My tasks",
      url: "#",
      icon: ClipboardList
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox
    },
    {
      title: "Calendar",
      url: "#",
      icon: CalendarDays 
    },
    {
      title: "Reports & Analytics",
      url: "#",
      icon: ChartColumnStacked
    }
  ],
  projects: [
    {
      name: "Product launch",
      url: "#",
      color: "#8b5cf6",
    },
    {
      name: "Team brainstorm",
      url: "#",
      color: "#3b82f6",
    },
    {
      name: "Branding launch",
      url: "#",
      color: "#06b6d4",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <Separator
          orientation="horizontal"
          className="my-2"
        />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
