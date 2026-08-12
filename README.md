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
YOUTUBE_CHANNEL_ID=YOUR_CHANNEL_ID
```

The site reads YouTube's public channel feed and caches it for 15 minutes. If the variable is not configured, the Creator page continues to work and shows the official channel link instead.

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
