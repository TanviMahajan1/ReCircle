import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jjkjgpgtkipikuzjtndo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqa2pncGd0a2lwaWt1emp0bmRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NjgxNzUsImV4cCI6MjA4NzA0NDE3NX0.dPTr9faGf9_sLn48nzdgf8EfoBS4SNCxMzOoT3OuVt0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);