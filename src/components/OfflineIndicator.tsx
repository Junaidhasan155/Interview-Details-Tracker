import { WifiOff, Wifi, CloudOff, Cloud } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useOfflineSync } from "@/hooks/useOfflineSync"

export function OfflineIndicator() {
  const { isOnline, pendingChanges, clearOfflineData } = useOfflineSync()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <Badge 
              variant={isOnline ? "default" : "destructive"} 
              className="gap-1"
            >
              {isOnline ? (
                <>
                  <Wifi className="h-3 w-3" />
                  Online
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3" />
                  Offline
                </>
              )}
            </Badge>
            
            {pendingChanges > 0 && (
              <Badge variant="warning" className="gap-1">
                <CloudOff className="h-3 w-3" />
                {pendingChanges} pending
              </Badge>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-popover border border-border">
          <div className="space-y-2">
            <p className="font-medium">
              {isOnline ? "Connected" : "Working Offline"}
            </p>
            {pendingChanges > 0 && (
              <div className="space-y-1">
                <p className="text-sm">
                  {pendingChanges} changes saved locally
                </p>
                {isOnline && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={clearOfflineData}
                    className="w-full"
                  >
                    <Cloud className="mr-2 h-3 w-3" />
                    Sync Now
                  </Button>
                )}
              </div>
            )}
            {!isOnline && (
              <p className="text-xs text-muted-foreground">
                Changes will sync when connection is restored
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}