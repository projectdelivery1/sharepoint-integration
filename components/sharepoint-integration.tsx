"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

// Hardcoded credentials for Microsoft Graph API
const TENANT_ID = "4ebbea79-0cb8-4817-9d44-b66492d06260"
const CLIENT_ID = "221e5ce2-7517-4bf5-b72b-514ce164f078"
// The redirect URI should match what's registered in your Azure AD app
const REDIRECT_URI = "https://kzmksioehzv75gayv8mm.lite.vusercontent.net/auth/callback"

export default function SharePointIntegration() {
  const { toast } = useToast()
  const [authorizationStatus, setAuthorizationStatus] = useState<"none" | "in-progress" | "complete">("none")
  const [syncType, setSyncType] = useState<"once" | "regular">("regular")
  const [isActive, setIsActive] = useState(true)
  const [description, setDescription] = useState("")
  const [language, setLanguage] = useState("en-US")
  const [department, setDepartment] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [notificationList, setNotificationList] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [view, setView] = useState<"form" | "dashboard">("form")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Check if auth was successful on page load
  useEffect(() => {
    const authStatus = localStorage.getItem("sharepoint_auth_status")
    if (authStatus === "complete") {
      setAuthorizationStatus("complete")
    }

    // Check if mobile and close sidebar by default
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    // Set initial state
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Function to redirect to Microsoft login
  const handleDelegatedAuth = () => {
    setAuthorizationStatus("in-progress")

    // Build the authorization URL
    const authUrl =
      `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize?` +
      `client_id=${CLIENT_ID}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&response_mode=query` +
      `&scope=${encodeURIComponent("Sites.Read.All Sites.ReadWrite.All Files.ReadWrite.All")}` +
      `&state=12345`

    // Redirect to Microsoft login
    window.location.href = authUrl
  }

  // Function for app-level auth (simplified for demo)
  const handleAppAuth = () => {
    setAuthorizationStatus("in-progress")

    // For demo purposes, we'll simulate app-level auth
    setTimeout(() => {
      setAuthorizationStatus("complete")
      localStorage.setItem("sharepoint_auth_status", "complete")
      toast({
        title: "Authorization Successful",
        description: "App-level authorization has been completed successfully.",
      })
    }, 1500)
  }

  const handleSave = async () => {
    if (authorizationStatus !== "complete") {
      toast({
        title: "Authorization Required",
        description: "Please authorize with SharePoint before saving",
        variant: "destructive",
      })
      return
    }

    if (!department || !username || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate saving and indexing process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Configuration Saved",
        description: "SharePoint integration has been configured successfully.",
      })

      // Simulate indexing completion
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Indexing Completed",
        description: `Indexed 1,250 items from SharePoint.`,
      })

      // Switch to dashboard view after successful save
      setView("dashboard")
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "An error occurred while saving the configuration",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Add a handleRemoveConnection function after the handleSave function
  const handleRemoveConnection = () => {
    // Reset authorization status
    setAuthorizationStatus("none")
    // Clear from localStorage
    localStorage.removeItem("sharepoint_auth_status")
    // Show toast notification
    toast({
      title: "Connection Removed",
      description: "SharePoint connection has been successfully removed.",
    })
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-[205px]" : "w-0"} border-r bg-white transition-all duration-300 md:w-[205px] fixed h-full z-10`}
      >
        <div className="p-4 border-b">
          <div className="flex items-center">
            <span className="font-semibold">eGain</span>
            <span className="mx-1">|</span>
            <span className="text-gray-600">AI Knowledge Hub</span>
          </div>
        </div>
        <div className="p-2">
          <Button
            variant="outline"
            className="w-full justify-start bg-yellow-400 border-yellow-500 hover:bg-yellow-500 text-gray-800"
          >
            <span className="mr-2">📦</span>
            Apps & Integrations
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 ${sidebarOpen ? "md:ml-[205px]" : ""} transition-all duration-300`}>
        {/* Mobile header with menu toggle */}
        <div className="md:hidden flex items-center p-4 border-b bg-white">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center">
            <span className="font-semibold">eGain</span>
            <span className="mx-1">|</span>
            <span className="text-gray-600">AI Knowledge Hub</span>
          </div>
        </div>

        {view === "form" ? (
          <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Button variant="ghost" size="sm" className="mr-2 p-0">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-xl font-medium">Add a SharePoint Instance</h1>
              </div>

              {/* Add Overview and Settings buttons */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-blue-50 text-blue-500"
                  onClick={() => {
                    if (authorizationStatus === "complete") {
                      setView("dashboard")
                      setActiveTab("overview")
                    } else {
                      toast({
                        title: "Authorization Required",
                        description: "Please complete the setup first",
                        variant: "destructive",
                      })
                    }
                  }}
                >
                  Overview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-500"
                  onClick={() => {
                    if (authorizationStatus === "complete") {
                      setView("dashboard")
                      setActiveTab("settings")
                    } else {
                      toast({
                        title: "Authorization Required",
                        description: "Please complete the setup first",
                        variant: "destructive",
                      })
                    }
                  }}
                >
                  Settings
                </Button>
              </div>
            </div>

            <div className="bg-blue-50 p-4 mb-6">
              <p className="text-sm">
                Sync knowledge content from SharePoint to eGain. For more help visit our,{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Help center
                </a>
                .
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="connect" className="font-medium">
                    Connect to SharePoint
                  </Label>
                  <span className="text-red-500 ml-1">*</span>
                </div>

                {authorizationStatus === "none" && (
                  <div className="space-y-2">
                    <Button
                      onClick={handleDelegatedAuth}
                      variant="outline"
                      className="w-full justify-start h-10 text-gray-700"
                    >
                      Authorize for myself (Delegated)
                    </Button>
                    <Button
                      onClick={handleAppAuth}
                      variant="outline"
                      className="w-full justify-start h-10 text-gray-700"
                    >
                      Authorize for my organization (App level)
                    </Button>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-2">
                      <Button variant="outline" className="flex-1">
                        Cancel
                      </Button>
                      <Button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-800 border-yellow-500">
                        Connect
                      </Button>
                    </div>
                  </div>
                )}

                {authorizationStatus === "in-progress" && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center">
                    <div className="bg-gray-100 text-gray-500 py-2 px-4 rounded mb-2 sm:mb-0">Authorizing...</div>
                    <div className="sm:ml-4 flex items-center text-amber-500">
                      <div className="h-2 w-2 bg-amber-500 rounded-full mr-2"></div>
                      Authorization in Progress
                    </div>
                  </div>
                )}

                {authorizationStatus === "complete" && (
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      <div className="bg-gray-100 text-gray-500 py-2 px-4 rounded mb-2 sm:mb-0">Authorized</div>
                      <div className="sm:ml-4 flex items-center text-green-500">
                        <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                        Authorization Complete
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={handleRemoveConnection}
                    >
                      Remove Connection
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter a description for this SharePoint instance"
                  className="resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="language" className="font-medium">
                    Language
                  </Label>
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <Input id="language" value={language} onChange={(e) => setLanguage(e.target.value)} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="department" className="font-medium">
                    Department
                  </Label>
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Label className="font-medium">Sync Type</Label>
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <div className="flex">
                  <Button
                    variant={syncType === "once" ? "default" : "outline"}
                    onClick={() => setSyncType("once")}
                    className={`rounded-r-none ${syncType === "once" ? "bg-yellow-400 hover:bg-yellow-500 text-gray-800 border-yellow-500" : "border-r-0"}`}
                  >
                    Once
                  </Button>
                  <Button
                    variant={syncType === "regular" ? "default" : "outline"}
                    onClick={() => setSyncType("regular")}
                    className={`rounded-l-none ${syncType === "regular" ? "bg-yellow-400 hover:bg-yellow-500 text-gray-800 border-yellow-500" : "border-l-0"}`}
                  >
                    Regular
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Sync once will import only during start, sync regular will import every 24 hours
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="active" className="font-medium">
                    Active
                  </Label>
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <Switch
                  checked={isActive}
                  onCheckedChange={setIsActive}
                  id="active"
                  className="data-[state=checked]:bg-yellow-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="username" className="font-medium">
                    eGain API Username
                  </Label>
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="font-medium">
                    eGain API Password
                  </Label>
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Label htmlFor="notification" className="font-medium">
                      Notification Mailing List
                    </Label>
                    <span className="text-red-500 ml-1">*</span>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full bg-gray-200 h-6 w-6 text-black">
                    +
                  </Button>
                </div>
                <Textarea
                  id="notification"
                  placeholder="Enter email addresses"
                  className="resize-none"
                  value={notificationList}
                  onChange={(e) => setNotificationList(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
                <Button
                  variant="secondary"
                  onClick={handleSave}
                  disabled={isSubmitting || authorizationStatus !== "complete" || !department || !username || !password}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
                <Button variant="outline" className="bg-gray-600 text-white hover:bg-gray-700 border-gray-600">
                  Close
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
      </div>
    </div>
  )
}

function Dashboard({ activeTab, setActiveTab }) {
  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium">SharePoint Integration</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className={`${activeTab === "overview" ? "bg-blue-50 text-blue-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`${activeTab === "settings" ? "bg-blue-50 text-blue-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </Button>
        </div>
      </div>

      {activeTab === "overview" ? (
        <>
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

          {/* Sync Status */}
          <div className="bg-white p-4 md:p-6 rounded-md border mb-6 overflow-x-auto">
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
          <div className="bg-white p-4 md:p-6 rounded-md border mb-6">
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
          </div>

          {/* Permission Mapping Status */}
          <div className="bg-white p-4 md:p-6 rounded-md border">
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

            <div className="mt-4 text-center">
              <Button variant="outline" size="sm" className="text-blue-500">
                View Detailed Report
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white p-6 rounded-md border">
          <h2 className="text-lg font-medium mb-4">Integration Settings</h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sync-frequency" className="font-medium">
                Sync Frequency
              </Label>
              <Select defaultValue="24">
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">Every 6 hours</SelectItem>
                  <SelectItem value="12">Every 12 hours</SelectItem>
                  <SelectItem value="24">Every 24 hours</SelectItem>
                  <SelectItem value="48">Every 48 hours</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">How often content should be synchronized from SharePoint</p>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Content Types to Index</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Switch id="sites" defaultChecked />
                  <Label htmlFor="sites">Sites</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="pages" defaultChecked />
                  <Label htmlFor="pages">Pages</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="lists" defaultChecked />
                  <Label htmlFor="lists">Lists</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="libraries" defaultChecked />
                  <Label htmlFor="libraries">Document Libraries</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="mirror-permissions" defaultChecked />
                <Label htmlFor="mirror-permissions">Mirror SharePoint Permissions</Label>
              </div>
              <p className="text-sm text-gray-500">Ensures users only see content they have access to in SharePoint</p>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 border-yellow-500">
                Save Changes
              </Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
