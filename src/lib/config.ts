const config = {
  nodeEnv: process.env.NODE_ENV!,
  env: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL!,
    prodApiUrl: process.env.NEXT_PUBLIC_PROD_API_URL!,
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
    },
    databaseUrl: process.env.DATABASE_URL!,
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_URL!,
      redisToken: process.env.UPSTASH_REDIS_TOKEN!,
      qstashUrl: process.env.QSTASH_URL!,
      qstashToken: process.env.QSTASH_TOKEN!,
      qstashCurrentSigningToken: process.env.QSTASH_CURRENT_SIGNING_TOKEN!,
    },
    resendToken: process.env.RESEND_TOKEN!,
    vercelAutomationBypassSecret: process.env.VERCEL_AUTOMATION_BYPASS_SECRET!,
  },
}

export default config
