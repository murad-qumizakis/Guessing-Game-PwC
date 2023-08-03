import Home from "./home";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const dynamic = "force-dynamic";
export default function Page() {
  const session = getServerSession(authOptions);
  return <Home session={session} />;
}
