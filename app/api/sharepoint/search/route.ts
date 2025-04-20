import { type NextRequest, NextResponse } from "next/server"

/**
 * Searches SharePoint content through eGain
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { query, userId, accessToken, page = 1, pageSize = 10 } = body

    if (!query) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 })
    }

    if (!accessToken) {
      return NextResponse.json({ error: "Access token is required" }, { status: 400 })
    }

    // In a real implementation, this would:
    // 1. Search the indexed content in eGain
    // 2. Filter results based on the user's permissions
    // 3. Return the filtered results

    // For demo purposes, we're returning mock search results
    const mockResults = [
      {
        id: "doc-1",
        title: "Project Overview Document",
        url: "https://contoso.sharepoint.com/sites/project/documents/overview.docx",
        snippet:
          "This document provides an overview of the project, including goals, timeline, and key stakeholders...",
        lastModified: "2025-03-15T09:30:00Z",
        contentType: "document",
        siteTitle: "Project Site",
      },
      {
        id: "page-1",
        title: "Team Collaboration Guidelines",
        url: "https://contoso.sharepoint.com/sites/project/SitePages/collaboration.aspx",
        snippet: "Guidelines for effective team collaboration, including communication channels, meeting schedules...",
        lastModified: "2025-04-01T14:45:00Z",
        contentType: "page",
        siteTitle: "Project Site",
      },
      {
        id: "list-1",
        title: "Project Tasks",
        url: "https://contoso.sharepoint.com/sites/project/Lists/Tasks",
        snippet: "A list of all project tasks, including status, assignee, and due dates...",
        lastModified: "2025-04-18T11:20:00Z",
        contentType: "list",
        siteTitle: "Project Site",
      },
    ]

    return NextResponse.json({
      success: true,
      results: mockResults,
      pagination: {
        page,
        pageSize,
        totalResults: mockResults.length,
        totalPages: Math.ceil(mockResults.length / pageSize),
      },
    })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Search failed", details: (error as Error).message }, { status: 500 })
  }
}
