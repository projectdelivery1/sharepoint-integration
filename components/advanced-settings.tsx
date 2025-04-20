"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdvancedSettings() {
  const [mirrorPermissions, setMirrorPermissions] = useState(true)
  const [enableRealTimeSearch, setEnableRealTimeSearch] = useState(true)

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Advanced Settings</CardTitle>
        <CardDescription>Configure advanced integration options</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="indexing">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="indexing">Indexing</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="sync">Synchronization</TabsTrigger>
          </TabsList>

          <TabsContent value="indexing" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="content-types">Content Types to Index</Label>
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
              <Label htmlFor="search-depth">Search Depth</Label>
              <Input id="search-depth" type="number" defaultValue="3" />
              <p className="text-sm text-gray-500">Maximum depth of nested content to index</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="enable-realtime" checked={enableRealTimeSearch} onCheckedChange={setEnableRealTimeSearch} />
                <Label htmlFor="enable-realtime">Enable Real-time Search Interface</Label>
              </div>
              <p className="text-sm text-gray-500">
                Provides a web-socket based interactive interface for real-time queries
              </p>
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4 pt-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="mirror-permissions" checked={mirrorPermissions} onCheckedChange={setMirrorPermissions} />
                <Label htmlFor="mirror-permissions">Mirror SharePoint Permissions</Label>
              </div>
              <p className="text-sm text-gray-500">Ensures users only see content they have access to in SharePoint</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="permission-sync">Permission Sync Frequency (hours)</Label>
              <Input id="permission-sync" type="number" defaultValue="24" disabled={!mirrorPermissions} />
            </div>
          </TabsContent>

          <TabsContent value="sync" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="sync-frequency">Sync Frequency (hours)</Label>
              <Input id="sync-frequency" type="number" defaultValue="24" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sync-window">Sync Window</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-time" className="text-xs">
                    Start Time
                  </Label>
                  <Input id="start-time" type="time" defaultValue="01:00" />
                </div>
                <div>
                  <Label htmlFor="end-time" className="text-xs">
                    End Time
                  </Label>
                  <Input id="end-time" type="time" defaultValue="05:00" />
                </div>
              </div>
              <p className="text-sm text-gray-500">Preferred time window for synchronization (server time)</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="delta-sync" defaultChecked />
                <Label htmlFor="delta-sync">Enable Delta Synchronization</Label>
              </div>
              <p className="text-sm text-gray-500">Only sync changes since the last synchronization</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
