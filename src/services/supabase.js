import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://jkchedfgfcpcvlyaqthv.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprY2hlZGZnZmNwY3ZseWFxdGh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI0NTAwNTIsImV4cCI6MjAzODAyNjA1Mn0.kiBQW4Dn_p3LP2ZC1IE5cDy-F5BNy1dWxbtj1lvZPEQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
