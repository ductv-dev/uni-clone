"use client"

import { CardSetting } from "@/components/custom/cards/card-setting"
import { Button } from "@/components/ui/button"
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "@/components/ui/drawer"
import { Copy, User2, Wallet } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
type UProps = {
  name?: string
  id?: string
  image?: string
}

const lIST_SETTING = [
  {
    title: "Đổi tên ví",

    icon: <User2 strokeWidth={3} size={20} />,
  },
  {
    title: "Thêm ví",
    icon: <Wallet strokeWidth={3} size={20} />,
  },
]

export const SectionAccount: React.FC<UProps> = ({
  name = "Wallet 1",
  id = "0x000...0000",
  image,
}) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(id)
      toast.success("Đã sao chép vào clipboard!", {
        duration: 2000,
        className: "",
        icon: <Copy size={16} strokeWidth={2} className="text-green-500" />,
      })
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000) // Reset state after 2s
    } catch (err) {
      console.error("Failed to copy: ", err)
      toast.error("Failed to copy to clipboard!")
    }
  }

  return (
    <div className="flex items-center p-2.5">
      <div className="flex flex-1 gap-1">
        <Drawer>
          <DrawerTrigger>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              {image ? (
                <img
                  src={image}
                  alt="avatar"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <User2 size={20} className="text-blue-700" />
              )}
            </div>
          </DrawerTrigger>
          <DrawerContent className="p-2.5">
            {/* Account */}
            <div className="mt-5 flex flex-col items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                {image ? (
                  <img
                    src={image}
                    alt="avatar"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <User2 size={20} className="text-blue-700" />
                )}
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="font-semibold text-gray-800"> {name}</p>
                <div className="flex gap-1">
                  <p className="text-xs text-gray-500">{id}</p>
                  <button onClick={() => handleCopy()} className="">
                    <Copy size={16} strokeWidth={1} />
                  </button>
                </div>
              </div>
            </div>
            {/* Setting */}
            <div className="flex flex-col items-center justify-center">
              {lIST_SETTING.map((setting) => (
                <CardSetting
                  key={setting.title}
                  title={setting.title}
                  icon={setting.icon}
                />
              ))}
            </div>
          </DrawerContent>
        </Drawer>

        <div className="flex flex-col">
          <p className="font-semibold text-gray-800"> {name}</p>
          <div className="flex gap-1">
            <p className="text-xs text-gray-500">{id}</p>
            <button onClick={() => handleCopy()} className="">
              <Copy size={16} strokeWidth={1} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
