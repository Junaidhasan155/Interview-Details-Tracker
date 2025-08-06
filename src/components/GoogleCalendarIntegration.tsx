import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  Calendar, 
  CheckCircle, 
  Settings, 
  Sync, 
  ExternalLink,
  Plus,
  Clock,
  Users,
  Globe,
  Smartphone,
  Bell,
  MapPin,
  Video,
  Link,
  RefreshCw,
  AlertCircle,
  Info,
  Zap
} from 'lucide-react';

interface CalendarSettings {
  isConnected: boolean;
  autoSync: boolean;
  syncDirection: 'bidirectional' | 'to-google' | 'from-google';
  defaultCalendar: string;
  reminderSettings: {
    enabled: boolean;
    minutesBefore: number[];
  };
  categories: {
    [key: string]: {
      enabled: boolean;
      calendarId: string;
      color: string;
    };
  };
  lastSync: string | null;
}

interface GoogleCalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  location?: string;
  attendees?: string[];
  isRecurring: boolean;
  calendarId: string;
  calendarName: string;
  color: string;
  source: 'study-calendar' | 'google-calendar';
}

const MOCK_CALENDARS = [
  { id: 'primary', name: 'Primary Calendar', color: '#3788d8' },
  { id: 'work', name: 'Work Calendar', color: '#33b679' },
  { id: 'personal', name: 'Personal Calendar', color: '#8e24aa' },
  { id: 'interviews', name: 'Interview Prep', color: '#f4511e' }
];

const MOCK_EVENTS: GoogleCalendarEvent[] = [
  {
    id: '1',
    title: 'Algorithm Practice Session',
    description: 'Focus on tree traversal and dynamic programming',
    start: new Date().toISOString(),
    end: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    location: 'Home Office',
    isRecurring: false,
    calendarId: 'interviews',
    calendarName: 'Interview Prep',
    color: '#f4511e',
    source: 'study-calendar'
  },
  {
    id: '2',
    title: 'Google Technical Interview',
    description: 'System design round with Sarah Chen',
    start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    end: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
    location: 'Google Meet',
    attendees: ['interviewer@google.com'],
    isRecurring: false,
    calendarId: 'primary',
    calendarName: 'Primary Calendar',
    color: '#3788d8',
    source: 'google-calendar'
  }
];

export function GoogleCalendarIntegration() {
  const [settings, setSettings] = useState<CalendarSettings>({
    isConnected: false,
    autoSync: false,
    syncDirection: 'bidirectional',
    defaultCalendar: 'interviews',
    reminderSettings: {
      enabled: true,
      minutesBefore: [15, 60]
    },
    categories: {
      'technical': { enabled: true, calendarId: 'interviews', color: '#f4511e' },
      'behavioral': { enabled: true, calendarId: 'interviews', color: '#8e24aa' },
      'system-design': { enabled: true, calendarId: 'interviews', color: '#33b679' },
      'coding': { enabled: true, calendarId: 'interviews', color: '#3788d8' },
      'practice': { enabled: true, calendarId: 'personal', color: '#ff7043' },
      'review': { enabled: false, calendarId: 'personal', color: '#6d4c41' }
    },
    lastSync: null
  });

  const [events, setEvents] = useState<GoogleCalendarEvent[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [syncStats, setSyncStats] = useState({
    totalEvents: 0,
    syncedEvents: 0,
    conflicts: 0,
    lastSyncTime: null as string | null
  });

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('google-calendar-settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }

    const savedEvents = localStorage.getItem('google-calendar-events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('google-calendar-settings', JSON.stringify(settings));
  }, [settings]);

  const connectToGoogle = async () => {
    setIsConnecting(true);
    
    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSettings(prev => ({
        ...prev,
        isConnected: true,
        lastSync: new Date().toISOString()
      }));

      // Load mock events
      setEvents(MOCK_EVENTS);
      localStorage.setItem('google-calendar-events', JSON.stringify(MOCK_EVENTS));

      setSyncStats({
        totalEvents: MOCK_EVENTS.length,
        syncedEvents: MOCK_EVENTS.length,
        conflicts: 0,
        lastSyncTime: new Date().toISOString()
      });

      toast.success('Connected to Google Calendar successfully!');
    } catch (error) {
      toast.error('Failed to connect to Google Calendar');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectFromGoogle = () => {
    setSettings(prev => ({
      ...prev,
      isConnected: false,
      autoSync: false,
      lastSync: null
    }));
    setEvents([]);
    localStorage.removeItem('google-calendar-events');
    toast.success('Disconnected from Google Calendar');
  };

  const syncCalendar = async () => {
    if (!settings.isConnected) return;

    setIsSyncing(true);
    
    try {
      // Simulate sync process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Get study sessions from localStorage
      const studySessions = JSON.parse(localStorage.getItem('study-sessions') || '[]');
      
      // Convert study sessions to calendar events
      const syncedEvents = studySessions.map((session: any) => ({
        id: `session-${session.id}`,
        title: session.title,
        description: session.description,
        start: `${session.date}T${session.startTime}:00`,
        end: `${session.date}T${session.endTime}:00`,
        isRecurring: false,
        calendarId: settings.categories[session.category]?.calendarId || settings.defaultCalendar,
        calendarName: MOCK_CALENDARS.find(c => c.id === settings.defaultCalendar)?.name || 'Interview Prep',
        color: settings.categories[session.category]?.color || '#f4511e',
        source: 'study-calendar' as const
      }));

      setEvents(prev => [...prev.filter(e => e.source !== 'study-calendar'), ...syncedEvents]);
      
      setSettings(prev => ({
        ...prev,
        lastSync: new Date().toISOString()
      }));

      setSyncStats({
        totalEvents: syncedEvents.length + MOCK_EVENTS.filter(e => e.source === 'google-calendar').length,
        syncedEvents: syncedEvents.length,
        conflicts: 0,
        lastSyncTime: new Date().toISOString()
      });

      toast.success(`Synced ${syncedEvents.length} study sessions to Google Calendar!`);
    } catch (error) {
      toast.error('Sync failed. Please try again.');
    } finally {
      setIsSyncing(false);
    }
  };

  const updateSettings = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateCategorySettings = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: {
          ...prev.categories[category],
          [key]: value
        }
      }
    }));
  };

  const openGoogleCalendar = () => {
    window.open('https://calendar.google.com', '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600';
      case 'syncing': return 'text-blue-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Google Calendar Integration
          </h3>
          <p className="text-sm text-muted-foreground">
            Sync your study sessions with Google Calendar
          </p>
        </div>

        <div className="flex gap-2">
          {settings.isConnected && (
            <>
              <Button
                variant="outline"
                onClick={syncCalendar}
                disabled={isSyncing}
                className="flex items-center gap-2"
              >
                {isSyncing ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Sync className="h-4 w-4" />
                )}
                {isSyncing ? 'Syncing...' : 'Sync Now'}
              </Button>
              <Button
                variant="outline"
                onClick={openGoogleCalendar}
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Open Calendar
              </Button>
            </>
          )}
          <Button
            variant="outline"
            onClick={() => setShowSettings(true)}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Connection Status */}
      <Card className={settings.isConnected ? 'border-green-200 bg-green-50' : 'border-gray-200'}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${settings.isConnected ? 'bg-green-100' : 'bg-gray-100'}`}>
                {settings.isConnected ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Calendar className="h-5 w-5 text-gray-600" />
                )}
              </div>
              <div>
                <h4 className="font-medium">
                  {settings.isConnected ? 'Connected to Google Calendar' : 'Not Connected'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {settings.isConnected 
                    ? `Last synced: ${settings.lastSync ? new Date(settings.lastSync).toLocaleString() : 'Never'}`
                    : 'Connect to sync your study sessions with Google Calendar'
                  }
                </p>
              </div>
            </div>

            {!settings.isConnected ? (
              <Button
                onClick={connectToGoogle}
                disabled={isConnecting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isConnecting ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Link className="h-4 w-4 mr-2" />
                )}
                {isConnecting ? 'Connecting...' : 'Connect'}
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={disconnectFromGoogle}
                className="text-red-600 hover:text-red-700"
              >
                Disconnect
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sync Statistics */}
      {settings.isConnected && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{syncStats.totalEvents}</div>
                  <div className="text-xs text-muted-foreground">Total Events</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Sync className="h-4 w-4 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">{syncStats.syncedEvents}</div>
                  <div className="text-xs text-muted-foreground">Synced Sessions</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <div>
                  <div className="text-2xl font-bold">{syncStats.conflicts}</div>
                  <div className="text-xs text-muted-foreground">Conflicts</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <div>
                  <div className="text-sm font-bold">
                    {syncStats.lastSyncTime ? new Date(syncStats.lastSyncTime).toLocaleTimeString() : 'Never'}
                  </div>
                  <div className="text-xs text-muted-foreground">Last Sync</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Events */}
      {settings.isConnected && events.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Calendar Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {events.slice(0, 5).map((event) => (
                <div key={event.id} className="flex items-start justify-between p-3 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-3 h-3 rounded-full mt-2" 
                      style={{ backgroundColor: event.color }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{event.title}</h4>
                      {event.description && (
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {event.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(event.start).toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {event.calendarName}
                        </span>
                        {event.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge 
                    variant={event.source === 'study-calendar' ? 'default' : 'secondary'} 
                    className="text-xs"
                  >
                    {event.source === 'study-calendar' ? 'Study Session' : 'Google Event'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Auto-sync Toggle */}
      {settings.isConnected && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-yellow-600" />
                <div>
                  <h4 className="font-medium">Automatic Sync</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically sync study sessions with Google Calendar
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.autoSync}
                onCheckedChange={(checked) => updateSettings('autoSync', checked)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Google Calendar Settings</DialogTitle>
            <DialogDescription>
              Configure how your study sessions sync with Google Calendar
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Sync Direction */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Sync Direction</label>
              <Select 
                value={settings.syncDirection} 
                onValueChange={(value: any) => updateSettings('syncDirection', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bidirectional">Bidirectional (Both ways)</SelectItem>
                  <SelectItem value="to-google">Study Calendar → Google Calendar</SelectItem>
                  <SelectItem value="from-google">Google Calendar → Study Calendar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Default Calendar */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Calendar</label>
              <Select 
                value={settings.defaultCalendar} 
                onValueChange={(value) => updateSettings('defaultCalendar', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_CALENDARS.map((calendar) => (
                    <SelectItem key={calendar.id} value={calendar.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: calendar.color }}
                        />
                        {calendar.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Mapping */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Category Mapping</label>
              <div className="space-y-3">
                {Object.entries(settings.categories).map(([category, config]) => (
                  <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={config.enabled}
                        onCheckedChange={(checked) => updateCategorySettings(category, 'enabled', checked)}
                      />
                      <div>
                        <span className="capitalize text-sm font-medium">{category.replace('-', ' ')}</span>
                      </div>
                    </div>
                    {config.enabled && (
                      <Select 
                        value={config.calendarId} 
                        onValueChange={(value) => updateCategorySettings(category, 'calendarId', value)}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {MOCK_CALENDARS.map((calendar) => (
                            <SelectItem key={calendar.id} value={calendar.id}>
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: calendar.color }}
                                />
                                {calendar.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Reminder Settings */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Event Reminders</label>
                <Switch
                  checked={settings.reminderSettings.enabled}
                  onCheckedChange={(checked) => 
                    updateSettings('reminderSettings', { ...settings.reminderSettings, enabled: checked })
                  }
                />
              </div>
              {settings.reminderSettings.enabled && (
                <div className="grid grid-cols-2 gap-2">
                  {[5, 15, 30, 60, 120].map((minutes) => (
                    <label key={minutes} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={settings.reminderSettings.minutesBefore.includes(minutes)}
                        onChange={(e) => {
                          const current = settings.reminderSettings.minutesBefore;
                          const updated = e.target.checked
                            ? [...current, minutes]
                            : current.filter(m => m !== minutes);
                          updateSettings('reminderSettings', { ...settings.reminderSettings, minutesBefore: updated });
                        }}
                      />
                      <span className="text-sm">{minutes} minutes before</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowSettings(false)}>
              Save Settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
