import type { WebhookEvent } from "@clerk/nextjs/server";

import axios from "axios";
import { Webhook } from "svix";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;
  const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  if (!SIGNING_SECRET) {
    throw new Error("Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local");
  }

  if (!NEXT_PUBLIC_SERVER_URL) {
    throw new Error(
      "Error: Please add NEXT_PUBLIC_SERVER_URL from Clerk Dashboard to .env or .env.local"
    );
  }

  const wh = new Webhook(SIGNING_SECRET);
  const h = headers();
  const i = h.get("svix-id");
  const t = h.get("svix-timestamp");
  const s = h.get("svix-signature");
  if (!i || !t || !s) {
    return new Response("Error: Missing Svix headers", { status: 400 });
  }
  const p = await req.json();
  const b = JSON.stringify(p);
  let e: WebhookEvent;
  try {
    e = wh.verify(b, {
      "svix-id": i,
      "svix-timestamp": t,
      "svix-signature": s,
    }) as WebhookEvent;
  } catch (err) {
    console.error(err);
    return new Response("Error: Verification error", { status: 400 });
  }
  if (e.type === "user.created") {
    await axios.post(NEXT_PUBLIC_SERVER_URL, {
      clerkId: e.data.id,
      email: e.data.email_addresses?.[0]?.email_address,
      firstName: e.data.first_name,
      lastName: e.data.last_name,
    });
  }
  return new Response("Webhook received", { status: 200 });
}
