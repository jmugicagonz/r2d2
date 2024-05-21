import { auth } from "./auth"

export async function getGCPCredentials () {
    const session = await auth()
    const GOOGLE_CLIENT=JSON.parse(process?.env?.GOOGLE_CLIENT?process.env.GOOGLE_CLIENT:"{}");
    const gcp_credentials= {
      type: 'authorized_user',
      client_id: GOOGLE_CLIENT?.web?.client_id as string,
      client_secret: GOOGLE_CLIENT?.web?.client_secret as string,
      refresh_token: session?.refreshToken,
    }
    console.log("access_token",session?.accessToken)

    return gcp_credentials
}