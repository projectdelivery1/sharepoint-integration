import { ToastProvider } from "@/components/ui/use-toast"
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
