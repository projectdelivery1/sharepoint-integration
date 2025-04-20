import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function AuthSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col items-center text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Authorization Successful</h1>
          <p className="text-gray-600 mb-6">
            Your SharePoint account has been successfully authorized. You can now return to the integration setup.
          </p>
          <Link href="/?auth_success=true">
            <Button>Return to Integration Setup</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
