"use client"

import { TriggerButton } from "@/components/custom/button/trigger-button"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { shortenHex } from "@/lib/utils"
import { useUser } from "@/store/user-store"
import { Coins, Copy } from "lucide-react"
import { toast } from "sonner"

export const BottomSheetReceive = () => {
  const user = useUser((state: any) => state.user)
  const id = shortenHex(user.id)
  console.log("user", user)
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Đã copy vào clipboard", {
          icon: <Copy className="text-green-700" size={14} />,
          style: { borderRadius: 100 },
        })
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra khi copy vào clipboard")
      })
  }
  return (
    <Drawer>
      <DrawerTrigger>
        <TriggerButton className="w-30" icon="import" title="Nhận" />
      </DrawerTrigger>
      <DrawerContent className="max-h-full">
        <DrawerHeader>
          <DrawerTitle>Nhận</DrawerTitle>
          <DrawerDescription>
            Nạp tiền vào ví bằng cách chuyển crypto từ ví hoặc tài khoản khác
          </DrawerDescription>
        </DrawerHeader>
        <div className="no-scrollbar w-full overflow-y-auto px-2.5 pb-10">
          <div className="flex flex-col gap-2 p-4">
            <div className="flex items-center justify-center gap-2">
              <p className="font-semibold text-gray-600">{id}</p>
              <Button onClick={() => copyToClipboard(user.id)}>
                <Copy />
              </Button>
            </div>
            <hr />
            <p>Từ tài khoản khác</p>
            <a
              href="https://www.coinbase.com/fr-fr"
              className="flex items-center gap-2.5 rounded-lg border border-gray-300/50 p-2.5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-700">
                <Coins color="gold" />
              </div>
              <p>Coinbase</p>
            </a>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
