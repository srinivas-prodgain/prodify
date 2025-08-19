"use client"

import {
  Settings,
  Sparkles,
} from "lucide-react"

import {
  SidebarGroup,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export function NavUser() {
  const { isMobile } = useSidebar()

  return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <div className="flex flex-col gap-2 w-full">
        <Button variant="ghost" className="w-full justify-start p-4 mt-2 hover:bg-[#d3aaff] hover:text-[#ac45ff]">
          <Settings className="w-4 h-4" />
          <span className="text-sm text-black">Settings</span>
        </Button>
        <Card
            className="w-full bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0"
          >
            <CardHeader className="pb-3">
              <CardTitle>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  prodify
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-purple-100 text-sm mb-4">
                New members will gain access to public Spaces, Docs and Dashboards
              </CardDescription>
              <Button
                variant="secondary"
                size="sm"
                className="w-full bg-white text-purple-600 hover:bg-white/90 font-medium"
              >
                + Invite people
              </Button>
            </CardContent>
          </Card>
        </div>
      </SidebarGroup>
  )
}
