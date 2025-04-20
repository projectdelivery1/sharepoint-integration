/**
 * Service for interacting with eGain API
 */
export class EGainService {
  private apiUsername: string
  private apiPassword: string
  private baseUrl: string

  constructor(apiUsername: string, apiPassword: string, baseUrl: string) {
    this.apiUsername = apiUsername
    this.apiPassword = apiPassword
    this.baseUrl = baseUrl
  }

  /**
   * Makes an authenticated request to the eGain API
   */
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`

    // Basic authentication
    const authHeader = `Basic ${Buffer.from(`${this.apiUsername}:${this.apiPassword}`).toString("base64")}`

    const headers = {
      ...options.headers,
      Authorization: authHeader,
      "Content-Type": "application/json",
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Unknown error" }))
      throw new Error(`eGain API request failed: ${error.message}`)
    }

    return response.json()
  }

  /**
   * Indexes content in eGain
   */
  async indexContent(content: any) {
    return this.request("/api/v2/knowledge/content", {
      method: "POST",
      body: JSON.stringify(content),
    })
  }

  /**
   * Updates indexed content in eGain
   */
  async updateContent(contentId: string, content: any) {
    return this.request(`/api/v2/knowledge/content/${contentId}`, {
      method: "PUT",
      body: JSON.stringify(content),
    })
  }

  /**
   * Deletes indexed content from eGain
   */
  async deleteContent(contentId: string) {
    return this.request(`/api/v2/knowledge/content/${contentId}`, {
      method: "DELETE",
    })
  }

  /**
   * Searches indexed content in eGain
   */
  async searchContent(query: string, userId: string) {
    return this.request(
      `/api/v2/knowledge/search?q=${encodeURIComponent(query)}&userId=${encodeURIComponent(userId)}`,
      {
        method: "GET",
      },
    )
  }

  /**
   * Maps SharePoint permissions to eGain
   */
  async mapPermissions(permissions: any) {
    return this.request("/api/v2/knowledge/permissions", {
      method: "POST",
      body: JSON.stringify(permissions),
    })
  }
}
