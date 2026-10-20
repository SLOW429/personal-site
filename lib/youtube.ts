export type YouTubeVideo = {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
};

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

function decodeXml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export async function getLatestYouTubeVideos(limit = 6): Promise<YouTubeVideo[]> {
  if (!CHANNEL_ID) return [];

  try {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(CHANNEL_ID)}`,
      { next: { revalidate: 900 } }
    );

    if (!response.ok) return [];

    const xml = await response.text();
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];

    return entries.slice(0, limit).flatMap((entry) => {
      const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1];
      const publishedAt = entry.match(/<published>([^<]+)<\/published>/)?.[1];

      if (!id || !title || !publishedAt) return [];

      return [{
        id,
        title: decodeXml(title),
        publishedAt,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${id}`,
      }];
    });
  } catch {
    return [];
  }
}
