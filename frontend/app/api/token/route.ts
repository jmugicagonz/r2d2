import { NextRequest, NextResponse } from "next/server";
import { getToken,GetTokenParams } from "@auth/core/jwt";

export async function POST(req: NextRequest) { //Can't use NextApiRequest as getToken is implemented for Request.
  const secret = process.env.AUTH_SECRET;
    let token = undefined;
    if (secret) {
        const cookieName = "authjs.session-token"
        const tokenParams : GetTokenParams<false> = {
            req: req,
            secret: process.env.AUTH_SECRET as string,
            salt: cookieName
        };
        token = await getToken(tokenParams);
        if (!token) {
          throw new Error("Unauthorized or no token found");
      }
    }
    else {
      throw new Error("No secret found");
    }
  return NextResponse.json({ accessToken: token?.accessToken });
}

