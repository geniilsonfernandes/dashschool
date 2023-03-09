import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function useRequireAuth() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/dashboard");
  }

  return session;
}
