"use client"

import { CardSetting } from "@/components/custom/cards/card-setting"
import { ChevronLeft, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
const LIST_SETTING = [
  {
    name: "Account",
    icon: <Settings size={16} strokeWidth={2} className="text-gray-500" />,
  },
  {
    name: "Notifications",
    icon: <Settings size={16} strokeWidth={2} className="text-gray-500" />,
  },
  {
    name: "Privacy",
    icon: <Settings size={16} strokeWidth={2} className="text-gray-500" />,
  },
  {
    name: "Security",
    icon: <Settings size={16} strokeWidth={2} className="text-gray-500" />,
  },
]

export const Setting = () => {
  const route = useRouter()
  return (
    <div>
      <div className="fixed top-2.5 w-full px-2.5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => route.back()}
            className="flex h-12 w-12 items-center justify-center rounded-full border-t border-black/10 bg-white shadow-lg shadow-black/10 hover:bg-gray-100"
          >
            <ChevronLeft strokeWidth={2} className="text-gray-500" />
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold text-gray-800">
            Settings
          </h1>
          <div className="h-12 w-12"></div>
        </div>
      </div>
      <div className="mt-24 flex flex-col gap-2">
        {LIST_SETTING.map((setting) => (
          <CardSetting
            key={setting.name}
            title={setting.name}
            icon={setting.icon}
          />
        ))}
      </div>
    </div>
  )
}
