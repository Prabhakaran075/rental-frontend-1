import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CircleCheck as CheckCircle, Circle as XCircle, CircleAlert as AlertCircle, RefreshCw } from 'lucide-react';

export const DatabaseStatus = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const checkConnection = async () => {
    setLoading(true);
    setStatus('checking');
    setError(null);

    try {
      // Test the connection by trying to fetch from a simple table
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);

      if (error) {
        throw error;
      }

      setStatus('connected');
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'Failed to connect to database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'connected':
        return <Badge variant="default" className="bg-green-500">Connected</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Checking...</Badge>;
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon()}
          Database Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Connection Status:</span>
          {getStatusBadge()}
        </div>
        
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}
        
        <Button 
          onClick={checkConnection} 
          disabled={loading}
          variant="outline"
          className="w-full"
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Test Connection
            </>
          )}
        </Button>
        
        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>Supabase URL:</strong> {import.meta.env.VITE_SUPABASE_URL ? '✓ Set' : '✗ Missing'}</p>
          <p><strong>Anon Key:</strong> {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing'}</p>
        </div>
      </CardContent>
    </Card>
  );
};