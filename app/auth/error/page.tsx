import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col items-center text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Authorization Failed</h1>
          <p className="text-gray-600 mb-6">
            There was a problem authorizing your SharePoint account. Please try again or contact support if the issue
            persists.
          </p>
          <Link href="/">
            <Button>Return to Integration Setup</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
