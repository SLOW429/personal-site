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
- English, Arabic (RTL), and Turkish interface localization

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Languages

Use the language selector in the site header to switch between English, Arabic, and Turkish. Shared navigation, route copy, project case studies, blog articles, and tool interfaces are localized; the selected language is saved in the browser, and Arabic automatically enables right-to-left layout.

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

Keep both values server-side only. Never expose them with `NEXT_PUBLIC_` variables or in client-side code. Kick's current API documentation exposes livestream endpoints under `/public/v2/livestreams`; the integration is intentionally optional so the site remains fully functional without Kick credentials.

The official Kick channel is [kick.com/slow429](https://kick.com/slow429). The Creator and Gaming pages use Kick's responsive embedded player with an external watch link and retry behavior for connection drops.

## PayPal donation alerts

The donation page uses server-side PayPal order creation and capture. A verified PayPal `PAYMENT.CAPTURE.COMPLETED` webhook publishes the donor name and amount to an Upstash Redis list for the donation page and OBS browser overlay.

Configure these server-side Vercel environment variables:

```env
PAYPAL_CLIENT_ID=YOUR_LIVE_CLIENT_ID
PAYPAL_CLIENT_SECRET=YOUR_LIVE_CLIENT_SECRET
PAYPAL_WEBHOOK_ID=YOUR_PAYPAL_WEBHOOK_ID
PAYPAL_ENV=live
UPSTASH_REDIS_REST_URL=YOUR_UPSTASH_REST_URL
UPSTASH_REDIS_REST_TOKEN=YOUR_UPSTASH_REST_TOKEN
```

Create a Redis database in Upstash and copy its REST URL and token into Vercel. In the PayPal Developer Dashboard, register `https://slows.dev/api/paypal/webhook` for the same Live app, subscribe to `PAYMENT.CAPTURE.COMPLETED`, and set its webhook ID above. Keep the Client Secret and Redis token server-only; never use a `NEXT_PUBLIC_` prefix or commit real credentials.

Add `https://slows.dev/donation-alert.html` as an OBS Browser Source. The overlay uses a transparent background and polls the verified donation feed. The donation page is available at `/donate.html` and is linked from Creator Hub.

For sandbox testing, use matching Sandbox client credentials and webhook ID, set `PAYPAL_ENV=sandbox`, and configure the same webhook event type. Restore the Live values before accepting real payments.

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
