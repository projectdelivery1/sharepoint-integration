import { type NextRequest, NextResponse } from "next/server"

/**
 * Initiates a manual sync of SharePoint content
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { accessToken } = body

    if (!accessToken) {
      return NextResponse.json({ error: "Access token is required" }, { status: 400 })
    }

    // In a real implementation, this would:
    // 1. Start a background job to sync content from SharePoint
    // 2. Return a job ID that can be used to check the status

    // For demo purposes, we're simulating the sync process
    const syncJob = {
      id: `sync-job-${Date.now()}`,
      status: "started",
      startTime: new Date().toISOString(),
      estimatedCompletionTime: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes from now
    }

    return NextResponse.json({
      success: true,
      message: "Sync job started successfully",
      job: syncJob,
    })
  } catch (error) {
    console.error("Sync error:", error)
    return NextResponse.json({ error: "Failed to start sync job", details: (error as Error).message }, { status: 500 })
  }
}

/**
 * Gets the status of a sync job
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const jobId = searchParams.get("jobId")

    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 })
    }

    // In a real implementation, this would retrieve the job status from a database

    // For demo purposes, we're returning a mock job status
    const job = {
      id: jobId,
      status: "completed",
      startTime: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
      endTime: new Date().toISOString(),
      itemsProcessed: 1250,
      itemsAdded: 120,
      itemsUpdated: 350,
      itemsRemoved: 5,
    }

    return NextResponse.json({
      success: true,
      job,
    })
  } catch (error) {
    console.error("Job status error:", error)
    return NextResponse.json(
      { error: "Failed to retrieve job status", details: (error as Error).message },
      { status: 500 },
    )
  }
}
