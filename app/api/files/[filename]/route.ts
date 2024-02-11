import fs from 'fs/promises';
import path from 'path';
import mime from 'mime';
import { NextResponse, type NextRequest } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { filename: string } }) {
  const { filename } = params;
  const filePath = path.join(
    process.cwd(),
    "public",
    filename
  );

  try {
    const data = await fs.readFile(filePath);
    const contentType = mime.getType(filePath) || 'application/octet-stream';
    return new NextResponse(data, {
      status: 200,
      headers: {
        'Content-Type': contentType
      }
    });
  } catch (err) {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }
}
