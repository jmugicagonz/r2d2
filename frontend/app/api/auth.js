import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google'

const scope= [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/bigquery https://www.googleapis.com/auth/cloud-platform",
  "https://www.googleapis.com/auth/spreadsheets.readonly"
].join(" ")

const GOOGLE_CLIENT=JSON.parse(process?.env?.GOOGLE_CLIENT?process.env.GOOGLE_CLIENT:"{}");
  // console.log("globalauth",GOOGLE_CLIENT.web?.client_id , GOOGLE_CLIENT.web?.client_secret )

async function refreshAccessToken(token) {
  const GOOGLE_CLIENT=JSON.parse(process?.env?.GOOGLE_CLIENT?process.env.GOOGLE_CLIENT:"{}");
  //console.log("refreshAccessToken",GOOGLE_CLIENT.web?.client_id , GOOGLE_CLIENT.web?.client_secret)
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: GOOGLE_CLIENT?.web?.client_id,
        client_secret: GOOGLE_CLIENT?.web?.client_secret,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    console.log("refreshAccessTokenURL: ",url)

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    token.accessToken = refreshedTokens.access_token;
    token.accessTokenExpires = Date.now() + refreshedTokens.expires_in * 1000;
    token.refreshToken = refreshedTokens.refresh_token ?? token.refreshToken; // Fall back to old refresh token

    console.log("accessToken refreshed:",token.accessToken);
    console.log("Access Token Expires:",token.accessTokenExpires);
    console.log("refreshToken:",token.refreshToken);

    return token;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while refreshing token");
  }
}

export const {
    handlers: { GET, POST },
    auth,
  } = NextAuth({
    providers: [Google({
      clientId:GOOGLE_CLIENT?.web?.client_id ,
      clientSecret: GOOGLE_CLIENT?.web?.client_secret,
      authorization: {
        params: { 
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: scope }
      }
  })],
  // ...(process.env.NEXT_PUBLIC_ENV === 'prod' ? {
  //   cookies: {
  //     sessionToken: {
  //       name: `authjs.session-token`,
  //       options: {
  //         httpOnly: true,
  //         sameSite: 'none',
  //         path: '/',
  //         domain: '.loonstep.com',
  //         secure: true,
  //       },
  //     },
  //   }
  // } : {}),
  basePath:'/api/auth',
  secret: process.env.AUTH_SECRET,
  callbacks: {
     async jwt({token, user, account}) {
      // Initial sign in
      if (account && user) {
        const expires_in=Number(account?.expires_in)
        token.accessToken = account.access_token; 
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = Date.now() + expires_in * 1000;
        token.user = user;
        return token;
      }

      // Return previous token if the access token has not expired yet
      const accessTokenExpires=Number(token?.accessTokenExpires) 
      if (Date.now() < accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return await refreshAccessToken(token);
    },
    async session({session, token}) {
      if (token) {
        session.user = token.user;
        session.refreshToken = token.refreshToken; //TODO: delete this. Change authentication for modules w/ getToken()
        session.accessToken = token.accessToken; //TODO: delete this. Change authentication for modules w/ getToken()
        ;
      }
      return session;
    },
  }
  })