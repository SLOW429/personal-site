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
const channelUrl = "https://kick.com/3azf-valo";

export async function getKickLiveStatus(): Promise<KickLiveStatus> {
  if (!broadcasterUserId || !accessToken) {
    return { isLive: false, url: channelUrl };
  }

  try {
    const response = await fetch(
      `https://api.kick.com/public/v1/users/livestreams?broadcaster_user_id=${encodeURIComponent(broadcasterUserId)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) return { isLive: false, url: channelUrl };

    const payload = await response.json();
    const stream = payload?.data?.[0];

    if (!stream) return { isLive: false, url: channelUrl };

    return {
      isLive: true,
      title: stream.stream_title ?? stream.title,
      category: stream.category?.name,
      viewerCount: typeof stream.viewer_count === "number" ? stream.viewer_count : undefined,
      thumbnail: stream.thumbnail?.url ?? stream.thumbnail,
      url: channelUrl,
    };
  } catch {
    return { isLive: false, url: channelUrl };
  }
}
