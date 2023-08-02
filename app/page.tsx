import Home from "./home";
import { getServerSession } from "next-auth";
import { options } from "./api/games/auth/[...nextauth]/options";
export const dynamic = "force-dynamic";
export default function Page() {
  const session = getServerSession(options);
  return <Home session={session} />;
}
