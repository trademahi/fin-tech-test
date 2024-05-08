import { NextRequest } from "next/server";
// import { cookies } from 'next/headers'
const isAuthenticated = async (req: NextRequest) => {
  try {

    // const cookiesAccessToken: any =  cookies().get("Token");
   const cookiesAccessToken =req?.cookies?.get('Token')?.value as string;
if (!cookiesAccessToken) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("internal server error " + error);
    return false;
  }
};

export default isAuthenticated;
