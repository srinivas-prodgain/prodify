"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { InfoIcon, XIcon, SparklesIcon, ArrowRightIcon, TimerIcon, ChartBarIcon, TagsIcon } from "lucide-react"


export default function Home() {
  const router = useRouter()
  const [showZoomSuggestion, setShowZoomSuggestion] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkIfDesktop = () => {
      const isDesktopSize = window.innerWidth >= 1024
      setIsDesktop(isDesktopSize)

      if (isDesktopSize) {
        const hasSeenSuggestion = localStorage.getItem('prodify-zoom-suggestion-seen')
        if (!hasSeenSuggestion) {
          setShowZoomSuggestion(true)
        }
      }
    }

    checkIfDesktop()
    window.addEventListener('resize', checkIfDesktop)

    return () => window.removeEventListener('resize', checkIfDesktop)
  }, [])

  const handleLaunchDashboard = () => {
    router.push("/dashboard")
  }

  const dismissZoomSuggestion = () => {
    setShowZoomSuggestion(false)
    localStorage.setItem('prodify-zoom-suggestion-seen', 'true')
  }

  return (
    <div className="min-h-screen bg-[#fdfbff] bg-[linear-gradient(#f3f0f6_1px,transparent_1px),linear-gradient(90deg,#f3f0f6_1px,transparent_1px)] bg-[size:55px_55px] bg-[position:-8px_-20px]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fdfbff] to-[#fdfbff] pointer-events-none"></div>

      {showZoomSuggestion && isDesktop && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-brand-teal to-brand-purple-primary text-white p-3 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <InfoIcon className="w-5 h-5 flex-shrink-0" />
              <div className="text-sm sm:text-base">
                <span className="font-[600]">💡 Pro Tip:</span> For the best viewing experience on desktop, set your browser zoom to <span className="font-[700] bg-white/20 px-2 py-1 rounded">90%</span>
                <span className="hidden sm:inline ml-2 text-white/80">(Ctrl/Cmd + - to zoom out)</span>
              </div>
            </div>
            <Button
              onClick={dismissZoomSuggestion}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 p-1 h-auto min-w-0"
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 ${showZoomSuggestion && isDesktop ? 'pt-16' : ''}`}>
        <div className="w-full max-w-4xl mx-auto text-center pt-10">

          <div className="mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[700] text-foreground mb-4">
              Prodify
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl font-[560] bg-gradient-to-r from-brand-teal to-brand-purple-primary bg-clip-text text-transparent">
              Your productivity workspace awaits
            </p>
          </div>

          <Card className="w-full max-w-2xl mx-auto mb-8 sm:mb-12 border-0 shadow-sm bg-white/50 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <div className="space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-brand-teal/10 to-brand-purple-primary/10 rounded-full">
                    <SparklesIcon className="size-10 text-brand-purple-primary" />
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-[600] text-foreground mb-4">
                  Welcome to Prodify
                </h2>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                  This is your gateway to enhanced productivity. The dashboard contains all your tools,
                  tasks, and insights to help you stay organized and focused.
                </p>

                <Button
                  onClick={handleLaunchDashboard}
                  className="w-full sm:w-auto text-white rounded-full px-8 py-4 sm:py-6 font-[600] text-base sm:text-lg bg-gradient-to-r from-brand-teal to-brand-purple-primary hover:from-brand-teal/80 hover:to-brand-purple-primary/80 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
                >
                  <span>Enter Dashboard</span>
                  <ArrowRightIcon className="ml-2 size-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-12">
            <Card className="border-0 shadow-sm bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all duration-300">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="size-12 bg-gradient-to-r from-brand-teal/20 to-brand-purple-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TagsIcon className="size-6 text-brand-purple-primary" />
                </div>
                <h3 className="font-[600] text-foreground mb-2 text-sm sm:text-base">Task Management</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Organize and track your tasks efficiently</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all duration-300">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="size-12 bg-gradient-to-r from-brand-teal/20 to-brand-purple-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ChartBarIcon className="size-6 text-brand-purple-primary" />
                </div>
                <h3 className="font-[600] text-foreground mb-2 text-sm sm:text-base">Analytics</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Track your productivity metrics</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="size-12 bg-gradient-to-r from-brand-teal/20 to-brand-purple-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TimerIcon className="size-6 text-brand-purple-primary" />
                </div>
                <h3 className="font-[600] text-foreground mb-2 text-sm sm:text-base">Time Tracking</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Monitor how you spend your time</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
