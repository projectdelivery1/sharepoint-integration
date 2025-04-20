import OverviewSection from "@/components/overview-section"

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-[205px] border-r bg-white h-screen fixed">
          <div className="p-4 border-b">
            <div className="flex items-center">
              <span className="font-semibold">eGain</span>
              <span className="mx-1">|</span>
              <span className="text-gray-600">AI Knowledge Hub</span>
            </div>
          </div>
          <div className="p-2">
            <button className="w-full text-left py-2 px-3 bg-yellow-400 rounded-md font-medium text-gray-800 flex items-center">
              <span className="mr-2">📦</span>
              Apps & Integrations
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="ml-[205px] flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <h1 className="text-xl font-medium">SharePoint Integration</h1>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-1 rounded-md text-sm font-medium bg-blue-50 text-blue-500">Overview</button>
              <button className="px-4 py-1 rounded-md text-sm font-medium text-gray-500">Settings</button>
            </div>
          </div>

          <OverviewSection
            onSyncNow={() => alert("Starting sync process...")}
            onSettings={() => alert("Opening settings...")}
          />

          {/* Sync Status */}
          <div className="bg-white p-6 rounded-md border mb-6 overflow-x-auto">
            <h2 className="text-lg font-medium mb-2">Sync Status</h2>
            <p className="text-sm text-gray-500 mb-4">Last 7 days of synchronization activity</p>

            <div className="space-y-4 min-w-[600px]">
              {[
                { day: "Monday", time: "09:00 AM", duration: 45, items: 2450, status: "Completed" },
                { day: "Monday", time: "03:00 PM", duration: 32, items: 1230, status: "Completed" },
                { day: "Tuesday", time: "09:00 AM", duration: 38, items: 1890, status: "Completed" },
                { day: "Tuesday", time: "03:00 PM", duration: 35, items: 2100, status: "Completed with warnings" },
                { day: "Wednesday", time: "09:00 AM", duration: 41, items: 2340, status: "Completed" },
                { day: "Wednesday", time: "03:00 PM", duration: 35, items: 1560, status: "Completed" },
                { day: "Thursday", time: "09:00 AM", duration: 40, items: 2100, status: "Completed" },
              ].map((sync, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6">
                    {sync.status === "Completed with warnings" ? (
                      <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center">
                        <span className="text-yellow-500">⚠️</span>
                      </div>
                    ) : (
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-500">✓</span>
                      </div>
                    )}
                  </div>
                  <div className="w-48 ml-2">
                    <div className="font-medium">
                      {sync.day} {sync.time}
                    </div>
                    <div className="text-sm text-gray-500">Duration: {sync.duration} min</div>
                  </div>
                  <div className="flex-1 text-right">{sync.items.toLocaleString()} items</div>
                  <div className="w-48 text-right">
                    <span className={sync.status === "Completed with warnings" ? "text-yellow-500" : "text-green-600"}>
                      {sync.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Indexing Status */}
          <div className="bg-white p-6 rounded-md border mb-6">
            <h2 className="text-lg font-medium mb-2">Content Indexing Status</h2>
            <p className="text-sm text-gray-500 mb-4">Overview of indexed SharePoint content by type</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-gray-500 mb-1 font-bold text-base">Sites</div>
                <div className="text-2xl font-semibold mb-1">24</div>
                <div className="text-xs text-green-600 mb-2">100% indexed</div>

                <div className="text-sm text-gray-500 mb-1 font-bold text-base">Pages</div>
                <div className="text-2xl font-semibold mb-1">1,245</div>
                <div className="text-xs text-green-600">100% indexed</div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-1 font-bold text-base">Lists</div>
                <div className="text-2xl font-semibold mb-1">156</div>
                <div className="text-xs text-green-600 mb-2">100% indexed</div>

                <div className="text-sm text-gray-500 mb-1 font-bold text-base">Documents</div>
                <div className="text-2xl font-semibold mb-1">10,876</div>
                <div className="text-xs text-amber-600">98% indexed</div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-1 font-bold text-base">Document Libraries</div>
                <div className="text-2xl font-semibold mb-1">87</div>
                <div className="text-xs text-green-600 mb-2">100% indexed</div>

                <div className="text-sm text-gray-500 mb-1 font-bold text-base">List Items</div>
                <div className="text-2xl font-semibold mb-1">24,567</div>
                <div className="text-xs text-amber-600">95% indexed</div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button className="text-blue-500 text-sm font-medium">View Detailed Report</button>
            </div>
          </div>

          {/* Permission Mapping Status */}
          <div className="bg-white p-6 rounded-md border">
            <h2 className="text-lg font-medium mb-2">Permission Mapping Status</h2>
            <p className="text-sm text-gray-500 mb-4">Overview of SharePoint permissions mirrored to eGain</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-gray-500 mb-1 font-bold text-base">Users</div>
                <div className="text-2xl font-semibold mb-1">573</div>
                <div className="text-xs text-green-600">100% mapped</div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-1 font-bold text-base">Groups</div>
                <div className="text-2xl font-semibold mb-1">42</div>
                <div className="text-xs text-green-600">100% mapped</div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-1 font-bold text-base">Permission Levels</div>
                <div className="text-2xl font-semibold mb-1">15</div>
                <div className="text-xs text-green-600">100% mapped</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
