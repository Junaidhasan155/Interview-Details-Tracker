import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
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
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar 
          onAddResource={onAddResource}
          onCreateGroup={onCreateGroup}
          totalResources={totalResources}
          completedResources={completedResources}
        />
        
        <div className="flex-1 flex flex-col">
          <header className="h-12 flex items-center border-b bg-background">
            <SidebarTrigger className="ml-2" />
          </header>
          
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}