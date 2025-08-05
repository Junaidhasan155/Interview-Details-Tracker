import { NavLink, useLocation } from "react-router-dom"
import { 
  Home, 
  FolderOpen, 
  BarChart3, 
  Settings, 
  Plus,
  Target,
  BookOpen,
  TrendingUp,
  Mic
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

const mainItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Groups", url: "/groups", icon: FolderOpen },
  { title: "AI Hub", url: "/ai", icon: TrendingUp },
  { title: "Interview Sim", url: "/interview", icon: Mic },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
]

interface AppSidebarProps {
  onAddResource: () => void
  onCreateGroup: () => void
  totalResources: number
  completedResources: number
}

export function AppSidebar({ onAddResource, onCreateGroup, totalResources, completedResources }: AppSidebarProps) {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"

  const completionRate = totalResources > 0 ? Math.round((completedResources / totalResources) * 100) : 0
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        {!isCollapsed ? (
          <div className="space-y-2">
            <h2 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
              Interview Tracker
            </h2>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-sidebar-foreground/70">Progress</span>
                <Badge variant="outline" className="text-xs">
                  {completionRate}%
                </Badge>
              </div>
              <div className="w-full bg-sidebar-accent rounded-full h-1.5">
                <div
                  className="bg-gradient-primary h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-sidebar-foreground/60">
                <span>{completedResources} completed</span>
                <span>{totalResources} total</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onAddResource} className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                  <Plus className="mr-2 h-4 w-4" />
                  {!isCollapsed && <span>Add Resource</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onCreateGroup} className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                  <Target className="mr-2 h-4 w-4" />
                  {!isCollapsed && <span>Create Group</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        {!isCollapsed ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60">
              <TrendingUp className="h-3 w-3" />
              <span>Keep up the great work!</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <TrendingUp className="h-4 w-4 text-sidebar-foreground/60" />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}