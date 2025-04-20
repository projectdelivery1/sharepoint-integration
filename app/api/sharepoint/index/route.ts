import { type NextRequest, NextResponse } from "next/server"
import { SharePointService } from "@/lib/sharepoint-service"

/**
 * Initiates the indexing of SharePoint content
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      accessToken,
      contentTypes = ["sites", "pages", "lists", "libraries"],
      syncType = "regular",
      searchDepth = 3,
    } = body

    if (!accessToken) {
      return NextResponse.json({ error: "Access token is required" }, { status: 400 })
    }

    // Create a SharePoint service instance
    const sharePointService = new SharePointService(accessToken)

    // Start indexing process
    // In a real implementation, this would be a background job
    // For this demo, we'll simulate the process

    // Get all sites
    const sitesResponse = await sharePointService.getSites()

    // For each site, get content based on contentTypes
    const indexedItems = []

    for (const site of sitesResponse.value.slice(0, 5)) {
      // Limit to 5 sites for demo
      // Get site details
      const siteDetails = await sharePointService.getSite(site.id)
      indexedItems.push({
        id: site.id,
        title: site.displayName,
        url: site.webUrl,
        type: "site",
        lastModified: site.lastModifiedDateTime,
      })

      // Get lists if requested
      if (contentTypes.includes("lists")) {
        const listsResponse = await sharePointService.getLists(site.id)
        for (const list of listsResponse.value.slice(0, 3)) {
          // Limit to 3 lists per site
          indexedItems.push({
            id: list.id,
            title: list.displayName,
            url: `${site.webUrl}/lists/${list.name}`,
            type: "list",
            lastModified: list.lastModifiedDateTime,
            parentSite: site.displayName,
          })
        }
      }

      // Get documents if requested
      if (contentTypes.includes("libraries")) {
        const documentsResponse = await sharePointService.getDocuments(site.id)
        for (const doc of documentsResponse.value.slice(0, 3)) {
          // Limit to 3 docs per site
          if (doc.file) {
            indexedItems.push({
              id: doc.id,
              title: doc.name,
              url: doc.webUrl,
              type: "document",
              lastModified: doc.lastModifiedDateTime,
              parentSite: site.displayName,
            })
          }
        }
      }
    }

    // Create an indexing job record
    const indexingJob = {
      id: `job-${Date.now()}`,
      status: "completed",
      contentTypes,
      syncType,
      searchDepth,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      itemsIndexed: indexedItems.length,
      nextScheduledSync: syncType === "regular" ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() : null,
    }

    return NextResponse.json({
      success: true,
      message: "Indexing completed successfully",
      job: indexingJob,
      indexedItems: indexedItems.slice(0, 10), // Return first 10 items for preview
    })
  } catch (error) {
    console.error("Indexing error:", error)
    return NextResponse.json(
      { error: "Failed to complete indexing", details: (error as Error).message },
      { status: 500 },
    )
  }
}

/**
 * Gets the status of indexing jobs
 */
export async function GET(req: NextRequest) {
  try {
    // In a real implementation, this would retrieve job status from a database
    // For this demo, we'll return a sample job
    const jobs = [
      {
        id: "job-1681234567890",
        status: "completed",
        contentTypes: ["sites", "pages", "lists", "libraries"],
        syncType: "regular",
        searchDepth: 3,
        startTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        itemsIndexed: 1250,
        nextScheduledSync: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
    ]

    return NextResponse.json({
      success: true,
      jobs,
    })
  } catch (error) {
    console.error("Job status error:", error)
    return NextResponse.json(
      { error: "Failed to retrieve job status", details: (error as Error).message },
      { status: 500 },
    )
  }
}
