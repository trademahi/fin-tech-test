import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import isAuthenticated from "./utils/isAuth";

export async function middleware(request: NextRequest) {
  try {
    const authenticated: any = await isAuthenticated(request);

    if (request.nextUrl.pathname.startsWith("/login")) {
      if (!authenticated) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/charity-list")
    ||request.nextUrl.pathname.startsWith("/upload") ) {
      if (!authenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      return NextResponse.next();
    }

    
    if(!authenticated){
      return NextResponse.json({message:'unAuthorized user'},{status:400})
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error, "error in middleware");
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: ["/api/:path*","/login", "/dashboard", "/upload", "/charity-list"],
};
