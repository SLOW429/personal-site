<<<<<<< HEAD
import { siteConfig } from "./site-config";

=======
>>>>>>> b9f0c72aee7db334f2a2f0fe520cea678ccfce84
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
<<<<<<< HEAD
const channelUrl = siteConfig.social.kick;

type KickLivestream = {
  broadcaster_user: { id: number };
  category: { name: string };
  thumbnail: string;
  title: string;
  viewer_count: number;
};
=======
const channelUrl = "https://kick.com/3azf-valo";
>>>>>>> b9f0c72aee7db334f2a2f0fe520cea678ccfce84

export async function getKickLiveStatus(): Promise<KickLiveStatus> {
  if (!broadcasterUserId || !accessToken) {
    return { isLive: false, url: channelUrl };
  }

  try {
    const response = await fetch(
<<<<<<< HEAD
      "https://api.kick.com/public/v2/livestreams?limit=1000",
=======
      `https://api.kick.com/public/v1/users/livestreams?broadcaster_user_id=${encodeURIComponent(broadcasterUserId)}`,
>>>>>>> b9f0c72aee7db334f2a2f0fe520cea678ccfce84
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) return { isLive: false, url: channelUrl };

<<<<<<< HEAD
    const payload = await response.json() as { data?: KickLivestream[] };
    const stream = payload.data?.find(
      (item) => String(item.broadcaster_user.id) === broadcasterUserId,
    );
=======
    const payload = await response.json();
    const stream = payload?.data?.[0];
>>>>>>> b9f0c72aee7db334f2a2f0fe520cea678ccfce84

    if (!stream) return { isLive: false, url: channelUrl };

    return {
      isLive: true,
<<<<<<< HEAD
      title: stream.title,
      category: stream.category.name,
      viewerCount: typeof stream.viewer_count === "number" ? stream.viewer_count : undefined,
      thumbnail: stream.thumbnail,
=======
      title: stream.stream_title ?? stream.title,
      category: stream.category?.name,
      viewerCount: typeof stream.viewer_count === "number" ? stream.viewer_count : undefined,
      thumbnail: stream.thumbnail?.url ?? stream.thumbnail,
>>>>>>> b9f0c72aee7db334f2a2f0fe520cea678ccfce84
      url: channelUrl,
    };
  } catch {
    return { isLive: false, url: channelUrl };
  }
}
