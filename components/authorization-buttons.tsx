"use client"

import { Button } from "@/components/ui/button"
import { UserIcon, BuildingIcon } from "lucide-react"

interface AuthorizationButtonsProps {
  onDelegatedAuth: () => void
  onAppAuth: () => void
}

export default function AuthorizationButtons({ onDelegatedAuth, onAppAuth }: AuthorizationButtonsProps) {
  return (
    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
      <Button onClick={onDelegatedAuth} className="flex items-center justify-center">
        <UserIcon className="mr-2 h-4 w-4" />
        Authorize for myself (Delegated)
      </Button>
      <Button onClick={onAppAuth} className="flex items-center justify-center">
        <BuildingIcon className="mr-2 h-4 w-4" />
        Authorize for my organization (App level)
      </Button>
    </div>
  )
}
