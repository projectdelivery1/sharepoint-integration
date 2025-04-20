import { type NextRequest, NextResponse } from "next/server"

// Hardcoded credentials for Microsoft Graph API
// In a production environment, these would come from environment variables
const TENANT_ID = "4ebbea79-0cb8-4817-9d44-b66492d06260"
const CLIENT_ID = "221e5ce2-7517-4bf5-b72b-514ce164f078"
const CLIENT_SECRET = "pmR8Q~A.a7rfH34wMZSHag2If4TVxnoaku8hVcVF"
// Make sure the callback URL is correct for your environment
const REDIRECT_URI = "https://kzmksioehzv75gayv8mm.lite.vusercontent.net/api/auth/callback"

/**
 * Initiates the OAuth 2.0 authorization flow for SharePoint
 * @param req The incoming request
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const authType = searchParams.get("authType") || "delegated"

  // Build the authorization URL based on auth type
  if (authType === "delegated") {
    // User delegated auth flow (Authorization Code Flow)
    const authUrl =
      `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize?` +
      `client_id=${CLIENT_ID}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&response_mode=query` +
      `&scope=${encodeURIComponent("Sites.Read.All Sites.ReadWrite.All Files.ReadWrite.All")}` +
      `&state=12345`

    return NextResponse.json({ authUrl })
  } else {
    // App-level auth flow (Client Credentials Flow)
    try {
      const tokenResponse = await fetch(`https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          scope: "https://graph.microsoft.com/.default",
          client_secret: CLIENT_SECRET,
          grant_type: "client_credentials",
        }),
      })

      const tokenData = await tokenResponse.json()

      if (!tokenResponse.ok) {
        throw new Error(`Token request failed: ${tokenData.error_description || "Unknown error"}`)
      }

      // In a real implementation, you would securely store this token
      return NextResponse.json({
        success: true,
        message: "App-level authentication successful",
        // Store the token in a secure way in a production environment
        token: tokenData.access_token,
        expiresIn: tokenData.expires_in,
      })
    } catch (error) {
      console.error("Authentication error:", error)
      return NextResponse.json({ error: "Authentication failed", details: (error as Error).message }, { status: 500 })
    }
  }
}
