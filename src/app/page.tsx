"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

const ArrowRightIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)

const SparklesIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0L9.937 15.5Z" />
  </svg>
)

export default function Home() {
  const router = useRouter()

  const handleLaunchDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-[#fdfbff] bg-[linear-gradient(#f3f0f6_1px,transparent_1px),linear-gradient(90deg,#f3f0f6_1px,transparent_1px)] bg-[size:55px_55px] bg-[position:-8px_-20px]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fdfbff] to-[#fdfbff] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto text-center pt-10">

          <div className="mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[700] text-foreground mb-4">
              Prodify
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl font-[560] bg-gradient-to-r from-[#26e5cc] to-[#667bda] bg-clip-text text-transparent">
              Your productivity workspace awaits
            </p>
          </div>

          <Card className="w-full max-w-2xl mx-auto mb-8 sm:mb-12 border-0 shadow-sm bg-white/50 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <div className="space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#26e5cc]/10 to-[#667bda]/10 rounded-full">
                    <SparklesIcon className="w-8 h-8 text-[#667bda]" />
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
                  className="w-full sm:w-auto text-white rounded-full px-8 py-4 sm:py-6 font-[600] text-base sm:text-lg bg-gradient-to-r from-[#26e5cc] to-[#667bda] hover:from-[#20d4bb] hover:to-[#5a6fd1] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
                >
                  <span>Enter Dashboard</span>
                  <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-12">
            <Card className="border-0 shadow-sm bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all duration-300">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-[#26e5cc]/20 to-[#667bda]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#667bda]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-[600] text-foreground mb-2 text-sm sm:text-base">Task Management</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Organize and track your tasks efficiently</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all duration-300">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-[#26e5cc]/20 to-[#667bda]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#26e5cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-[600] text-foreground mb-2 text-sm sm:text-base">Analytics</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Track your productivity metrics</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-[#26e5cc]/20 to-[#667bda]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#667bda]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
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
