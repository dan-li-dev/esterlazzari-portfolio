import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL('https://7agjoirtfflkfyf4.public.blob.vercel-storage.com/**')],
  },
  // Your Next.js config here
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
