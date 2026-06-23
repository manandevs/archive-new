export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-17'

/** Set in `.env` / Vercel: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? ''

export const isSanityConfigured =
  projectId.length > 0 && dataset.length > 0

/**
 * Non-empty fallbacks for `sanity.config.ts` so Next.js can bundle Studio when
 * public env vars are missing (e.g. CI / first deploy). Configure real values on the host.
 */
export const studioProjectId = projectId || 'xxxxxxxx'
export const studioDataset = dataset || 'production'
