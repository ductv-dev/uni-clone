"use client"

import { ButtonNav } from "@/components/custom/button/button-navigation"
import { CardSetting } from "@/components/custom/cards/card-setting"
import { DrawerTrigger, DrawerContent, Drawer } from "@/components/ui/drawer"
import { shortenHex } from "@/lib/utils"
import { TUser } from "@/types/type-user"
import { Copy, Settings, User2, Wallet } from "lucide-react"
import image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

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

type Props = {
  data: TUser
}

export const SectionAccount: React.FC<Props> = ({ data }) => {
  const [isCopied, setIsCopied] = useState(false)
  const route = useRouter()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.id)
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
  const shortID = shortenHex(data.id)
  return (
    <div className="flex items-center border-b border-gray-200 px-2.5 py-4">
      <div className="flex flex-1 gap-1">
        <Drawer>
          <DrawerTrigger>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              {data.image ? (
                <img
                  src={data.image}
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
                {data.image ? (
                  <img
                    src={data.image}
                    alt="avatar"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <User2 size={20} className="text-blue-700" />
                )}
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="font-semibold text-gray-800"> {data.name}</p>
                <div className="flex gap-1">
                  <p className="text-xs text-gray-500">{shortID}</p>
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
          <p className="font-semibold text-gray-800"> {data.name}</p>
          <div className="flex gap-1">
            <p className="text-xs text-gray-500">{shortID}</p>
            <button onClick={() => handleCopy()} className="">
              <Copy size={16} strokeWidth={1} />
            </button>
          </div>
        </div>
      </div>
      <ButtonNav onClick={() => route.push("/user/setting")}>
        <Settings size={16} strokeWidth={2} className="text-gray-500" />
      </ButtonNav>
    </div>
  )
}
