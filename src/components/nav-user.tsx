"use client"

import {
  Settings,
} from "lucide-react"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export function NavUser() {

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden p-0">
      <SidebarMenu className="flex flex-col gap-5 w-full">
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Settings" className={`p-3 mt-1 hover:bg-[#f5f4ff] hover:text-[#5754ac] cursor-pointer`}>
            <Settings className="mr-2" />
            <span className="text-sm text-black">Settings</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <Card
          className="w-[90%] text-white border-0 gap-0 bg-[url('https://res.cloudinary.com/dwhuwudg9/image/upload/v1755786285/magicpattern-mesh-gradient-1755786015453_pwuxpe_235ba6.jpg')] bg-cover bg-center ml-[12px] mb-[12px]"
        >
          <CardHeader className="px-3">
            <CardTitle >
              <div className="flex items-center gap-2 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="text-yellow-200 rotate-45 absolute top-0 left-0"
                  fill="currentColor"
                >
                  <path d="M12 2c1.2 3.5 3.5 5.8 7 7-3.5 1.2-5.8 3.5-7 7-1.2-3.5-3.5-5.8-7-7 3.5-1.2 5.8-3.5 7-7z" />
                </svg>
                <span className="text-white text-xl font-[580] relative right-[-20px] top-[-5px]">
                  prodify
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5">
            <CardDescription className="text-purple-100 text-sm mb-4">
              New members will gain access to public Spaces, Docs and Dashboards
            </CardDescription>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white hover:bg-white/90 font-semibold rounded-xl p-4 text-sm"
            >
              + Invite people
            </Button>
          </CardContent>
        </Card>
      </SidebarMenu>
    </SidebarGroup>
  )
}
