import { createClient } from "@supabase/supabase-js";
 const supabaseURL = "https://wtmffcalgqbyysosziwq.supabase.co";
 const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0bWZmY2FsZ3FieXlzb3N6aXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyMzgwMTYsImV4cCI6MjA4NDgxNDAxNn0.jDEtXh2yFEFueAKOErG1EJN0-u2TkVmi2hY1GXGnU9A";
 export const supabase = createClient(supabaseURL,supabaseKey);
