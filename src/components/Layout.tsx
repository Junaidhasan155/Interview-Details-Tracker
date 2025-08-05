import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeToggle } from "@/components/ThemeToggle"
import { OfflineIndicator } from "@/components/OfflineIndicator"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { LogOut } from "lucide-react"
import { Resource } from "@/types/resource"
import { Group } from "@/types/group"

interface LayoutProps {
  children: React.ReactNode
  resources: Resource[]
  groups: Group[]
  onAddResource: () => void
  onCreateGroup: () => void
}

export function Layout({ children, resources, groups, onAddResource, onCreateGroup }: LayoutProps) {
  const totalResources = resources.length
  const completedResources = resources.filter(r => r.status === 'completed').length

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <AppSidebar 
          onAddResource={onAddResource}
          onCreateGroup={onCreateGroup}
          totalResources={totalResources}
          completedResources={completedResources}
        />
        
        <div className="flex-1 flex flex-col">
          <header className="h-12 flex items-center justify-between border-b bg-background px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="mr-2" />
              <h1 className="text-lg font-semibold">Study Assistant</h1>
            </div>
            <div className="flex items-center gap-2">
              <OfflineIndicator />
              <ThemeToggle />
            </div>
          </header>
          
          <main className="flex-1 bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
