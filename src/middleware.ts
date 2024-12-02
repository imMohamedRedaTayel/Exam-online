import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {

    const token = request.cookies.get("next-auth.session-token"); // الحصول على التوكن من الكوكيز
    const currentUrl = request.nextUrl.pathname; // المسار الحالي

    // إذا لم يكن هناك توكن، يعيد التوجيه إلى صفحة تسجيل الدخول
    if (!token) {
        const loginUrl = new URL("/login", request.url); // تكوين رابط إعادة التوجيه
        return NextResponse.rewrite(loginUrl); // إعادة التوجيه
    }

    // إذا كان هناك توكن، السماح بالوصول
    return NextResponse.next();
}

export const config = {
    matcher: ["/client", "/server", "/analysis" , '/' ], // المسارات التي يتم تطبيق الميدل وير عليها
};
