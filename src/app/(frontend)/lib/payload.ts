// lib/payload.ts
import { getPayload } from 'payload'
import config from '@payload-config'

let cachedPayload: Awaited<ReturnType<typeof getPayload>> | null = null

export const getPayloadClient = async () => {
  if (cachedPayload) return cachedPayload

  const payload = await getPayload({ config })
  cachedPayload = payload
  return payload
}
