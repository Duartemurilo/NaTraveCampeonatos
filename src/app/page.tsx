import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { paths } from "src/routes/paths";

export default async function Page() {
  const user = await currentUser().catch(() => null);

  if (user) {
    redirect(paths.dashboard.tournaments.criar(0));
  }
}
