import { siteConfig } from "./site-config";

export type KickLiveStatus = {
  isLive: boolean;
  title?: string;
  category?: string;
  viewerCount?: number;
  thumbnail?: string;
  url: string;
};

const broadcasterUserId = process.env.KICK_BROADCASTER_USER_ID;
const accessToken = process.env.KICK_ACCESS_TOKEN;
const channelUrl = siteConfig.social.kick;

type KickLivestream = {
  broadcaster_user: { id: number };
  category: { name: string };
  thumbnail: string;
  title: string;
  viewer_count: number;
};

export async function getKickLiveStatus(): Promise<KickLiveStatus> {
  if (!broadcasterUserId || !accessToken) {
    return { isLive: false, url: channelUrl };
  }

  try {
    const response = await fetch(
      "https://api.kick.com/public/v2/livestreams?limit=1000",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) return { isLive: false, url: channelUrl };

    const payload = await response.json() as { data?: KickLivestream[] };
    const stream = payload.data?.find(
      (item) => String(item.broadcaster_user.id) === broadcasterUserId,
    );

    if (!stream) return { isLive: false, url: channelUrl };

    return {
      isLive: true,
      title: stream.title,
      category: stream.category.name,
      viewerCount: typeof stream.viewer_count === "number" ? stream.viewer_count : undefined,
      thumbnail: stream.thumbnail,
      url: channelUrl,
    };
  } catch {
    return { isLive: false, url: channelUrl };
  }
}
