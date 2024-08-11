// /api/create-chat
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        console.log("Request body:", body);

        const { file_key, file_name } = body;
        console.log("File Key:", file_key, "File Name:", file_name);

        return NextResponse.json({ message: "Chat room is now available" });
    } catch (error) {
        console.error("Error in API; ",error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
