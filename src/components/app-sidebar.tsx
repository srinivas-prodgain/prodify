"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Sparkles,
  Home,
  List,
  Inbox,
  Calendar,
  BarChart,
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

import m1 from "../../public/m1.jpg"
import m2 from "../../public/m2.webp"
import m3 from "../../public/m3.jpg"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Courtney Henry",
      image: m1,
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      image: m2,
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      image: m3,
      logo: Command,
      plan: "Free",
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
      icon: List
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar
    },
    {
      title: "Reports & Analytics",
      url: "#",
      icon: BarChart
    },
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
