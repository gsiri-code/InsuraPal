import { supabase } from "@/libs/supabase";

export async function GET(request: Request) {
  const healthPlans = await supabase.from("health_plans").select();

  const providers = [];
  
  healthPlans.data?.forEach((plan)=>providers.push(plan.name));

  return Response.json({ providers });
}
