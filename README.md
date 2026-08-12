# SLOW.DEV

Personal platform for SLOW — Developer, Creator, and Builder.

The site combines:

- Personal portfolio and project case studies
- Free developer and SEO tools
- Services and project intake
- Blog and build notes
- YouTube / Kick creator hub
- Discord community
- AI assistant

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Optional YouTube integration

The Creator page can automatically show the latest public YouTube uploads without a YouTube API key.

Add this Vercel environment variable:

```env
YOUTUBE_CHANNEL_ID=UCjzVp0821ZSH3l5z4XSn0Ig
```

The site reads YouTube's public channel feed and caches it for 15 minutes. If the variable is not configured, the Creator page continues to work and shows the official channel link instead.

## Optional Kick live integration

The Creator page can also show real Kick live status, title, category, and viewer count. This uses Kick's official developer API and remains disabled unless the required server-side credentials are configured.

Add these Vercel environment variables:

```env
KICK_ACCESS_TOKEN=YOUR_KICK_ACCESS_TOKEN
KICK_BROADCASTER_USER_ID=YOUR_KICK_BROADCASTER_USER_ID
```

Keep both values server-side only. Never expose them with `NEXT_PUBLIC_` variables or in client-side code. Kick's current API documentation exposes livestream endpoints under `/public/v2/livestreams`; the integration is intentionally optional so the site remains fully functional without Kick credentials. citeturn605560search1turn112file0

## Main routes

```text
/
/about
/projects
/services
/tools
/blog
/creator
/gaming
/now
/uses
/links
/contact
```

## Deployment

The production site is deployed from the `main` branch through Vercel.
