import RealTimeQuery from "@/components/real-time-query"

export default function QueryPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">SharePoint Knowledge Query</h1>
        <RealTimeQuery />
      </div>
    </div>
  )
}
