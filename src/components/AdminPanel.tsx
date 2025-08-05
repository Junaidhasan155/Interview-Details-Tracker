import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { Shield, Users, Database, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export function AdminPanel() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [testEmail, setTestEmail] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // This will only work if you have admin access
      const { data, error } = await supabase.auth.admin.listUsers();
      
      if (error) {
        throw new Error('Admin access required. This only works with service role key.');
      }
      
      setUsers(data.users || []);
      toast.success(`Found ${data.users?.length || 0} users`);
      
    } catch (error: any) {
      toast.error(`Failed to fetch users: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const confirmUser = async (userId: string, email: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        email_confirm: true
      });
      
      if (error) {
        throw error;
      }
      
      toast.success(`User ${email} confirmed successfully!`);
      fetchUsers(); // Refresh the list
      
    } catch (error: any) {
      toast.error(`Failed to confirm user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testUserCreation = async () => {
    if (!testEmail) {
      toast.error('Please enter an email address');
      return;
    }

    try {
      setLoading(true);
      
      // Create test user
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: 'test123456',
        options: {
          data: {
            full_name: 'Test User',
            confirmed_at: new Date().toISOString()
          }
        }
      });

      if (error) {
        throw error;
      }

      toast.success('Test user created! Check the users list.');
      setTestEmail('');
      
    } catch (error: any) {
      toast.error(`Failed to create test user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Admin Panel - User Management</span>
          </CardTitle>
          <CardDescription>
            Manage users and fix email confirmation issues (requires admin privileges)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <Alert>
            <Database className="h-4 w-4" />
            <AlertDescription>
              <strong>Note:</strong> This panel requires Supabase admin/service role access. 
              For production use, this should be implemented as a separate admin interface.
            </AlertDescription>
          </Alert>

          {/* Fetch Users */}
          <div className="flex items-center space-x-4">
            <Button 
              onClick={fetchUsers}
              disabled={loading}
              className="flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>{loading ? 'Loading...' : 'Fetch Users'}</span>
            </Button>
            
            <Badge variant="outline">
              {users.length} users found
            </Badge>
          </div>

          {/* Test User Creation */}
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-lg">Create Test User</CardTitle>
              <CardDescription>
                Create a test user to verify the signup process
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="test@example.com"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={testUserCreation}
                  disabled={loading || !testEmail}
                >
                  Create Test User
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          {users.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Registered Users</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{user.email}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {user.id} • Created: {new Date(user.created_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          {user.email_confirmed_at ? (
                            <Badge variant="default" className="bg-green-500">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Confirmed
                            </Badge>
                          ) : (
                            <Badge variant="destructive">
                              <XCircle className="h-3 w-3 mr-1" />
                              Unconfirmed
                            </Badge>
                          )}
                          
                          {user.user_metadata?.full_name && (
                            <Badge variant="outline">
                              {user.user_metadata.full_name}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {!user.email_confirmed_at && (
                        <Button
                          size="sm"
                          onClick={() => confirmUser(user.id, user.email)}
                          disabled={loading}
                          className="ml-4"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Confirm User
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Solutions */}
          <Alert className="border-blue-200 bg-blue-50">
            <RefreshCw className="h-4 w-4" />
            <AlertDescription>
              <strong>Quick Solutions:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li><strong>Disable email confirmation:</strong> Supabase Dashboard → Auth → Settings → Turn OFF "Enable email confirmations"</li>
                <li><strong>Manual confirmation:</strong> Use the "Confirm User" button above for unconfirmed users</li>
                <li><strong>Auto-confirmation:</strong> Add auto-confirmation logic to your signup process</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
