import { supabase } from "@/libs/supabase";

export async function GET(request: Request) {
  const data = (await supabase.from("health_plans").select()).data;


  return Response.json({ data});
}
