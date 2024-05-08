import { NextRequest } from "next/server";

const isAuthenticated = async (req: NextRequest) => {
  try {
    // const cookiesAccessToken: any =  cookies().get("Token");
    const cookiesAccessToken = req?.cookies?.get("Token")?.value as string;
    const email = req?.cookies?.get("Email")?.value as string;
    if (!cookiesAccessToken) {
      return false;
    }
    req.headers.set('email', email);
    return true
  } catch (error) {
    console.log("internal server error " + error);
    return false
  }
};

export default isAuthenticated;
