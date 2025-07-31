import { useState, useEffect, useCallback } from 'react'
import { Resource } from '@/types/resource'
import { Group } from '@/types/group'

interface OfflineData {
  resources: Resource[]
  groups: Group[]
  lastSync: Date
  isDirty: boolean
}

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [pendingChanges, setPendingChanges] = useState(0)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const saveOfflineData = useCallback((data: Partial<OfflineData>) => {
    const existing = JSON.parse(localStorage.getItem('offline_data') || '{}')
    const updated = {
      ...existing,
      ...data,
      lastSync: new Date(),
      isDirty: true
    }
    localStorage.setItem('offline_data', JSON.stringify(updated))
    setPendingChanges(prev => prev + 1)
  }, [])

  const getOfflineData = useCallback((): OfflineData | null => {
    const stored = localStorage.getItem('offline_data')
    return stored ? JSON.parse(stored) : null
  }, [])

  const clearOfflineData = useCallback(() => {
    localStorage.removeItem('offline_data')
    setPendingChanges(0)
  }, [])

  const autoSave = useCallback((resources: Resource[], groups: Group[]) => {
    if (!isOnline) {
      saveOfflineData({ resources, groups })
    }
  }, [isOnline, saveOfflineData])

  return {
    isOnline,
    pendingChanges,
    saveOfflineData,
    getOfflineData,
    clearOfflineData,
    autoSave
  }
}