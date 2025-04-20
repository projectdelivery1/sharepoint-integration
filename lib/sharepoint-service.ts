/**
 * Service for interacting with SharePoint via Microsoft Graph API
 */
export class SharePointService {
  private accessToken: string
  private baseUrl = "https://graph.microsoft.com/v1.0"

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  /**
   * Makes an authenticated request to the Microsoft Graph API
   */
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Unknown error" }))
      throw new Error(`API request failed: ${error.error?.message || error.message || "Unknown error"}`)
    }

    return response.json()
  }

  /**
   * Gets all sites in the tenant
   */
  async getSites() {
    return this.request("/sites?search=*")
  }

  /**
   * Gets a specific site by ID
   */
  async getSite(siteId: string) {
    return this.request(`/sites/${siteId}`)
  }

  /**
   * Gets all lists in a site
   */
  async getLists(siteId: string) {
    return this.request(`/sites/${siteId}/lists`)
  }

  /**
   * Gets items in a list
   */
  async getListItems(siteId: string, listId: string) {
    return this.request(`/sites/${siteId}/lists/${listId}/items?expand=fields`)
  }

  /**
   * Gets all pages in a site
   */
  async getPages(siteId: string) {
    // Pages are typically stored in the "Site Pages" library
    const lists = await this.getLists(siteId)
    const pagesLibrary = lists.value.find((list: any) => list.name === "Site Pages")

    if (!pagesLibrary) {
      return { value: [] }
    }

    return this.getListItems(siteId, pagesLibrary.id)
  }

  /**
   * Gets all documents in a site
   */
  async getDocuments(siteId: string) {
    return this.request(`/sites/${siteId}/drive/root/children`)
  }

  /**
   * Searches for content across SharePoint
   */
  async search(query: string) {
    return this.request("/search/query", {
      method: "POST",
      body: JSON.stringify({
        requests: [
          {
            entityTypes: ["driveItem", "listItem", "list", "site"],
            query: {
              queryString: query,
            },
            from: 0,
            size: 25,
          },
        ],
      }),
    })
  }

  /**
   * Gets permissions for a site
   */
  async getSitePermissions(siteId: string) {
    return this.request(`/sites/${siteId}/permissions`)
  }

  /**
   * Gets permissions for a specific item
   */
  async getItemPermissions(siteId: string, itemId: string) {
    return this.request(`/sites/${siteId}/items/${itemId}/permissions`)
  }
}
