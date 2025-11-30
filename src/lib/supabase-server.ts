import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { cache } from "react";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Service role client for server actions that require elevated privileges
export function createAdminSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // This key should have service role privileges
  );
}

// Server-only client with RLS bypass (for server actions)
// This is created as a cached function to prevent multiple instantiations
export const getServerSupabase = cache(() => {
  // For server actions, we might want to use service role key
  // Or pass user's session token to maintain RLS
  const headersList = headers();
  const authorization = headersList.get("authorization");
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          authorization: authorization || "",
        },
      },
    }
  );
});