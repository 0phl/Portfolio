import type React from "react"

interface BrowserFrameProps {
  children: React.ReactNode
  className?: string
  url?: string
  showControls?: boolean
  theme?: "light" | "dark"
}

const BrowserFrame: React.FC<BrowserFrameProps> = ({ 
  children, 
  className = "", 
  url = "https://example.com",
  showControls = true,
  theme = "dark"
}) => {
  const headerBg = theme === "dark" ? "bg-gray-700" : "bg-gray-200"
  const urlBg = theme === "dark" ? "bg-gray-600" : "bg-white"
  const urlText = theme === "dark" ? "text-gray-300" : "text-gray-700"

  return (
    <div className={`flex flex-col rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
      {/* Browser Header */}
      <div className={`flex items-center gap-2 px-4 py-3 ${headerBg} rounded-t-lg`}>
        {showControls && (
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors cursor-pointer"></div>
          </div>
        )}
        <div className="flex-1 mx-4">
          <div className={`${urlBg} rounded px-3 py-1 text-xs ${urlText} font-mono`}>
            {url}
          </div>
        </div>
      </div>
      {/* Browser Content */}
      <div className="flex-1 overflow-hidden rounded-b-lg">
        {children}
      </div>
    </div>
  )
}

export default BrowserFrame
