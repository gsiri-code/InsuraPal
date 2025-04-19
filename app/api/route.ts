import { supabase } from "@/libs/supabase";

export async function GET(request: Request) {

  const healthPlans = await supabase.from("health_plans").select();

  return Response.json({ providers });
}
