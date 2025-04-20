"use client"

import { useEffect, useState } from "react"
import SharePointIntegration from "@/components/sharepoint-integration"
import { useToast } from "@/components/ui/use-toast"

export default function Home() {
  const { toast } = useToast()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check for auth success or error in URL
    const url = new URL(window.location.href)
    const authSuccess = url.searchParams.get("auth_success")
    const authError = url.searchParams.get("auth_error")

    if (authSuccess === "true") {
      toast({
        title: "Authorization Successful",
        description: "Your SharePoint account has been successfully authorized.",
      })

      // Remove the query parameter from the URL
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    if (authError === "true") {
      toast({
        title: "Authorization Failed",
        description: "There was a problem authorizing your SharePoint account.",
        variant: "destructive",
      })

      // Remove the query parameter from the URL
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    setIsLoaded(true)
  }, [toast])

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return <SharePointIntegration />
}
