import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

interface SanityWebhookPayload {
  _type: string;
  slug?: { current?: string };
}

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, message: "Invalid secret" }, { status: 401 });
  }

  const body = (await request.json()) as SanityWebhookPayload;

  switch (body._type) {
    case "newsPost":
      revalidatePath("/news");
      if (body.slug?.current) revalidatePath(`/news/${body.slug.current}`);
      break;
    case "event":
      revalidatePath("/events");
      if (body.slug?.current) revalidatePath(`/events/${body.slug.current}`);
      break;
    case "page":
      revalidatePath("/", "layout");
      break;
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
