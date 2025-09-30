import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { DatabaseStatus } from '@/components/ui/database-status';
import { ExternalLink, Database, Settings, CircleCheck as CheckCircle, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const DatabaseSetup = () => {
  const { toast } = useToast();
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
    toast({
      title: "Copied to clipboard",
      description: "Command copied successfully",
    });
  };

  const setupSteps = [
    {
      title: "Create Supabase Project",
      description: "Sign up and create a new project at Supabase",
      action: "Visit Supabase Dashboard",
      url: "https://supabase.com/dashboard",
      completed: false
    },
    {
      title: "Get Project Credentials",
      description: "Copy your project URL and anon key from Settings > API",
      action: "Go to API Settings",
      completed: false
    },
    {
      title: "Update Environment Variables",
      description: "Add your credentials to the .env file",
      code: `VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key`,
      completed: false
    },
    {
      title: "Run Database Migrations",
      description: "Execute the SQL migrations in your Supabase SQL editor",
      action: "Open SQL Editor",
      url: "https://supabase.com/dashboard/project/_/sql",
      completed: false
    }
  ];

  return (
    <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Database className="h-8 w-8" />
          Database Setup
        </h1>
        <p className="text-muted-foreground">
          Set up your Supabase database connection for RentHub
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Setup Steps */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Setup Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {setupSteps.map((step, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {index + 1}
                      </span>
                      {step.title}
                    </h3>
                    {step.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 ml-8">
                    {step.description}
                  </p>
                  
                  {step.code && (
                    <div className="ml-8 mb-3">
                      <div className="bg-muted p-3 rounded-md text-sm font-mono relative">
                        <pre className="whitespace-pre-wrap">{step.code}</pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-6 w-6 p-0"
                          onClick={() => copyToClipboard(step.code!, index)}
                        >
                          {copiedStep === index ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {step.url && (
                    <div className="ml-8">
                      <Button variant="outline" size="sm" asChild>
                        <a href={step.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {step.action}
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Migration Files Info */}
          <Card>
            <CardHeader>
              <CardTitle>Database Schema</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Your project includes pre-built database migrations with the following tables:
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Badge variant="outline">profiles</Badge>
                <Badge variant="outline">products</Badge>
                <Badge variant="outline">rentals</Badge>
                <Badge variant="outline">favorites</Badge>
                <Badge variant="outline">reviews</Badge>
                <Badge variant="outline">notifications</Badge>
              </div>
              <Alert className="mt-4">
                <AlertDescription>
                  Run all migration files in order in your Supabase SQL editor to set up the complete database schema.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Connection Status */}
        <div className="space-y-6">
          <DatabaseStatus />
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Start Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center mt-0.5">1</span>
                  <div>
                    <p className="font-medium">Create Supabase Account</p>
                    <p className="text-muted-foreground">Sign up at supabase.com if you haven't already</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center mt-0.5">2</span>
                  <div>
                    <p className="font-medium">Create New Project</p>
                    <p className="text-muted-foreground">Choose a name and region for your database</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center mt-0.5">3</span>
                  <div>
                    <p className="font-medium">Copy Credentials</p>
                    <p className="text-muted-foreground">Get URL and anon key from Settings → API</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center mt-0.5">4</span>
                  <div>
                    <p className="font-medium">Update .env File</p>
                    <p className="text-muted-foreground">Replace placeholder values with your credentials</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center mt-0.5">5</span>
                  <div>
                    <p className="font-medium">Run Migrations</p>
                    <p className="text-muted-foreground">Execute SQL files in the SQL editor</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};