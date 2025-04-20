"use client"

import { Button } from "@/components/ui/button"

interface OverviewSectionProps {
  onSyncNow?: () => void
  onSettings?: () => void
}

export default function OverviewSection({ onSyncNow, onSettings }: OverviewSectionProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-medium">SharePoint Integration</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="text-blue-500 border-blue-200" onClick={onSyncNow}>
            <span className="mr-2">↻</span> Sync Now
          </Button>
          <Button variant="outline" size="sm" className="bg-gray-100" onClick={onSettings}>
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-md border">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm text-gray-500">Connection Status</div>
            <div className="text-gray-400">+</div>
          </div>
          <div className="text-2xl font-semibold mb-1">Connected</div>
          <div className="text-sm text-green-600">+ All systems operational</div>
          <div className="text-xs text-gray-500 mt-1">Last verified: 5 minutes ago</div>
        </div>

        <div className="bg-white p-4 rounded-md border">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm text-gray-500">Indexed Documents</div>
            <div className="text-blue-500">📄</div>
          </div>
          <div className="text-2xl font-semibold mb-1">12,543</div>
          <div className="text-sm text-green-600">+2,464 from last sync</div>
        </div>

        <div className="bg-white p-4 rounded-md border">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm text-gray-500">Users Mapped</div>
            <div className="text-blue-500">👤</div>
          </div>
          <div className="text-2xl font-semibold mb-1">573</div>
          <div className="text-sm text-gray-500">100% of SharePoint users</div>
        </div>

        <div className="bg-white p-4 rounded-md border">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm text-gray-500">Last Sync</div>
            <div className="text-blue-500">🕒</div>
          </div>
          <div className="text-2xl font-semibold mb-1">2h ago</div>
          <div className="text-sm text-gray-500">Next sync in 4h</div>
        </div>
      </div>
    </div>
  )
}
