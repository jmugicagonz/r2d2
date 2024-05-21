import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    [key: string]: {
      accessToken: string | undefined
      refreshToken: string | undefined
    }
  }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    refreshToken?: string
    accessToken?: string
  }
  
}
