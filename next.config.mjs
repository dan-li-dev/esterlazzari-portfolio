import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL('https://7agjoirtfflkfyf4.public.blob.vercel-storage.com/**')],
  },
  // These packages are transitive deps inside the pnpm store and are not
  // directly resolvable without being marked as external.
  // 'graphql' must be externalized to avoid duplicate-instance errors at runtime.
  serverExternalPackages: ['mongoose', 'graphql'],
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
