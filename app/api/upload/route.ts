import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("Upload request received");

    // Check environment variables
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

    console.log("Env vars check:", {
      hasPublicKey: !!publicKey,
      hasPrivateKey: !!privateKey,
      hasUrlEndpoint: !!urlEndpoint
    });

    if (!publicKey || !privateKey || !urlEndpoint) {
      console.error("Missing ImageKit credentials");
      return NextResponse.json({ error: "Missing ImageKit credentials" }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.error("No file provided");
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    console.log("File received:", { name: file.name, size: file.size, type: file.type });

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log("Buffer created, size:", buffer.length);

    // Dynamically import ImageKit
    const ImageKit = (await import("imagekit")).default;
    const imagekit = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });

    console.log("ImageKit instance created, starting upload...");

    // Upload to ImageKit using SDK
    const result = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: "blog-uploads",
    });

    console.log("Upload successful:", result.url);
    return NextResponse.json({ url: result.url });
  } catch (error) {
    console.error("Upload error:", error);
    console.error("Error details:", error instanceof Error ? error.message : "Unknown error");
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack");
    return NextResponse.json(
      { error: "Upload failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
