import { type NextRequest, NextResponse } from "next/server"

// Hardcoded credentials for Microsoft Graph API
// In a production environment, these would come from environment variables
const TENANT_ID = "4ebbea79-0cb8-4817-9d44-b66492d06260"
const CLIENT_ID = "221e5ce2-7517-4bf5-b72b-514ce164f078"
const CLIENT_SECRET = "pmR8Q~A.a7rfH34wMZSHag2If4TVxnoaku8hVcVF"
const REDIRECT_URI = "https://kzmksioehzv75gayv8mm.lite.vusercontent.net/api/auth/callback"

/**
 * Handles the OAuth callback from Microsoft
 * Exchanges the authorization code for an access token
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  if (error) {
    console.error("OAuth error:", error, searchParams.get("error_description"))
    return NextResponse.redirect(new URL("/auth/error", req.url))
  }

  if (!code) {
    console.error("No authorization code provided")
    return NextResponse.redirect(new URL("/auth/error", req.url))
  }

  try {
    // Exchange the authorization code for an access token
    const tokenResponse = await fetch(`https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        scope: "Sites.Read.All Sites.ReadWrite.All Files.ReadWrite.All",
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
        client_secret: CLIENT_SECRET,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok) {
      console.error("Token request failed:", tokenData.error_description || "Unknown error")
      return NextResponse.redirect(new URL("/auth/error", req.url))
    }

    // In a production environment, you would securely store these tokens
    // For this demo, we'll store them in a cookie or session

    // Redirect to the success page
    return NextResponse.redirect(new URL("/auth/success", req.url))
  } catch (error) {
    console.error("Token exchange error:", error)
    return NextResponse.redirect(new URL("/auth/error", req.url))
  }
}
