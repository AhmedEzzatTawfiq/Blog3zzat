import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  try {
    // Check if environment variables are set
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

    if (!publicKey || !privateKey || !urlEndpoint) {
      console.error("Missing ImageKit credentials:", { publicKey: !!publicKey, privateKey: !!privateKey, urlEndpoint: !!urlEndpoint });
      return NextResponse.json(
        { error: "Missing ImageKit credentials" },
        { status: 500 }
      );
    }

    // Generate expire time - must be less than 1 hour into the future (30 minutes)
    const expire = Math.floor(Date.now() / 1000) + 1800; // 30 minutes from now

    // Generate token
    const token = crypto.randomBytes(16).toString("hex");

    // Create signature
    const signature = crypto
      .createHmac("sha256", privateKey)
      .update(token + expire)
      .digest("hex");

    const authParams = {
      token,
      expire,
      signature,
      publicKey,
    };

    console.log("Auth params generated successfully");
    return NextResponse.json(authParams);
  } catch (error) {
    console.error("Error in ImageKit API route:", error);
    return NextResponse.json(
      { error: "Failed to generate auth parameters", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
