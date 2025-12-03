import { useSession } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { useMemo } from "react";

export function useSupabase() {
  const { session } = useSession();

  return useMemo(() => {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          // KUNCI UTAMA:
          // Kita menyuntikkan token Clerk ke header Authorization Supabase
          fetch: async (url, options = {}) => {
            const clerkToken = await session?.getToken({
              template: "supabase", // Harus sama dengan nama template di Langkah 2
            });

            const headers = new Headers(options?.headers);
            headers.set("Authorization", `Bearer ${clerkToken}`);

            return fetch(url, {
              ...options,
              headers,
            });
          },
        },
      }
    );
  }, [session]);
}