import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}