"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Loader2 } from "lucide-react"

interface SearchResult {
  id: string
  title: string
  url: string
  snippet: string
  contentType: string
  siteTitle: string
}

export default function RealTimeQuery() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<{ type: "query" | "response"; content: string }[]>([])
  const wsRef = useRef<WebSocket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simulate WebSocket connection
  useEffect(() => {
    // In a real implementation, this would connect to a WebSocket server
    // For demo purposes, we're simulating the connection
    const connectWebSocket = () => {
      setIsConnected(true)
      return {
        send: (message: string) => {
          console.log("WebSocket message sent:", message)
          // Simulate receiving a response after a delay
          setTimeout(() => {
            handleWebSocketMessage({
              data: JSON.stringify({
                type: "search_results",
                results: [
                  {
                    id: "doc-1",
                    title: "Project Overview Document",
                    url: "https://contoso.sharepoint.com/sites/project/documents/overview.docx",
                    snippet:
                      "This document provides an overview of the project, including goals, timeline, and key stakeholders...",
                    contentType: "document",
                    siteTitle: "Project Site",
                  },
                  {
                    id: "page-1",
                    title: "Team Collaboration Guidelines",
                    url: "https://contoso.sharepoint.com/sites/project/SitePages/collaboration.aspx",
                    snippet:
                      "Guidelines for effective team collaboration, including communication channels, meeting schedules...",
                    contentType: "page",
                    siteTitle: "Project Site",
                  },
                ],
              }),
            })
          }, 1000)
        },
        close: () => {
          setIsConnected(false)
        },
      }
    }

    wsRef.current = connectWebSocket() as any

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleWebSocketMessage = (event: { data: string }) => {
    try {
      const data = JSON.parse(event.data)

      if (data.type === "search_results") {
        setResults(data.results)
        setIsSearching(false)

        // Add response to messages
        const responseText =
          data.results.length > 0
            ? `I found ${data.results.length} results that might help with your query.`
            : "I couldn't find any results matching your query."

        setMessages((prev) => [...prev, { type: "response", content: responseText }])
      }
    } catch (error) {
      console.error("Error parsing WebSocket message:", error)
    }
  }

  const handleSearch = () => {
    if (!query.trim() || !isConnected) return

    setIsSearching(true)
    setMessages((prev) => [...prev, { type: "query", content: query }])

    // Send query via WebSocket
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify({ type: "search", query }))
    }

    setQuery("")
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>SharePoint Knowledge Assistant</CardTitle>
        <CardDescription>Ask questions about your SharePoint content</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] overflow-y-auto border rounded-md p-4 mb-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 h-full flex items-center justify-center">
              <p>Ask a question to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === "query" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === "query" ? "bg-blue-500 text-white" : "bg-white border"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isSearching && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-white border">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Search Results</h3>
            <div className="space-y-2">
              {results.map((result) => (
                <div key={result.id} className="border rounded-md p-3 text-sm">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{result.title}</h4>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{result.contentType}</span>
                  </div>
                  <p className="text-gray-600 text-xs mt-1">{result.snippet}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs text-gray-500">{result.siteTitle}</span>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:underline"
                    >
                      View in SharePoint
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Ask a question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch()
              }
            }}
            disabled={isSearching || !isConnected}
          />
          <Button
            type="submit"
            size="icon"
            onClick={handleSearch}
            disabled={isSearching || !query.trim() || !isConnected}
          >
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
