import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jorvodpjbrdmuifjohtv.supabase.co';       
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvcnZvZHBqYnJkbXVpZmpvaHR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4OTI1ODAsImV4cCI6MjA2MzQ2ODU4MH0.EUCrCGMyWVyKuUue0FvVdazS4aV8mvdxYsnC8QG2oZs'; // Replace with your anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
