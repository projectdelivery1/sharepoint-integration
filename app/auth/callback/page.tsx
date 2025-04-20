"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function AuthCallback() {
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    // Check for error in URL
    const url = new URL(window.location.href)
    const error = url.searchParams.get("error")
    const errorDescription = url.searchParams.get("error_description")

    if (error) {
      setStatus("error")
      setErrorMessage(errorDescription || "An error occurred during authorization")
      return
    }

    // Check for code in URL
    const code = url.searchParams.get("code")
    if (!code) {
      setStatus("error")
      setErrorMessage("No authorization code received")
      return
    }

    // In a real implementation, we would exchange the code for a token here
    // For this demo, we'll just simulate success
    setStatus("success")
    localStorage.setItem("sharepoint_auth_status", "complete")
  }, [])

  const handleReturn = () => {
    // Return to the main page with a success parameter
    if (status === "success") {
      router.push("/?auth_success=true")
    } else {
      router.push("/?auth_error=true")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full p-6 md:p-8 bg-white rounded-md shadow-sm">
        <div className="flex flex-col items-center text-center">
          {status === "loading" && (
            <>
              <Loader2 className="h-16 w-16 text-blue-500 mb-4 animate-spin" />
              <h1 className="text-2xl font-bold mb-2">Processing Authorization</h1>
              <p className="text-gray-600 mb-6">Please wait while we complete the authorization process...</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h1 className="text-2xl font-bold mb-2">Authorization Successful</h1>
              <p className="text-gray-600 mb-6">
                Your SharePoint account has been successfully authorized. You can now return to the integration setup.
              </p>
              <Button onClick={handleReturn} className="bg-yellow-400 hover:bg-yellow-500 text-gray-800">
                Return to Integration Setup
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="h-16 w-16 text-red-500 mb-4" />
              <h1 className="text-2xl font-bold mb-2">Authorization Failed</h1>
              <p className="text-gray-600 mb-2">There was a problem authorizing your SharePoint account:</p>
              <p className="text-red-600 mb-6">{errorMessage}</p>
              <Button onClick={handleReturn} className="bg-yellow-400 hover:bg-yellow-500 text-gray-800">
                Return to Integration Setup
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
