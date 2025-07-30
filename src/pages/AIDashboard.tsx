import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AIAssistant } from '@/components/AIAssistant';
import { AISettings } from '@/components/AISettings';
import { SmartResourceCard } from '@/components/SmartResourceCard';
import { Resource } from '@/types/resource';
import { Group } from '@/types/group';
import { Brain, Settings, Sparkles, FileText } from 'lucide-react';

interface AIDashboardProps {
  resources: Resource[];
  groups: Group[];
  onEditResource: (id: string, resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function AIDashboard({ resources, groups, onEditResource }: AIDashboardProps) {
  const [activeTab, setActiveTab] = useState('assistant');

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 rounded-full bg-gradient-primary">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI-Powered Study Hub</h1>
            <p className="text-muted-foreground">
              Supercharge your interview preparation with artificial intelligence
            </p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assistant">
            <Brain className="h-4 w-4 mr-2" />
            AI Assistant
          </TabsTrigger>
          <TabsTrigger value="resources">
            <FileText className="h-4 w-4 mr-2" />
            Smart Resources
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            AI Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assistant">
          <AIAssistant />
        </TabsContent>

        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <SmartResourceCard
                key={resource.id}
                resource={resource}
                onUpdate={onEditResource}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <AISettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}