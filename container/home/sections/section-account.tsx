"use client"

import { ButtonNav } from "@/components/custom/button/button-navigation"
import { CardSetting } from "@/components/custom/cards/card-setting"
import { Button } from "@/components/ui/button"
import {
  DrawerTrigger,
  Drawer,
  DrawerContent,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group"

import { shortenHex } from "@/lib/utils"
import { useUser } from "@/store/user-store"
import { TUser } from "@/types/type-user"
import { Copy, Settings, User2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
  data: TUser
}

export const SectionAccount: React.FC<Props> = ({ data }) => {
  const route = useRouter()
  const setName = useUser((state) => state.setName)
  const [newName, setNewName] = useState<TUser["name"]>("")

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.id)
      toast.success("Đã sao chép vào clipboard!", {
        duration: 2000,
        className: "",
        icon: <Copy size={16} strokeWidth={2} className="text-green-500" />,
      })
    } catch (err) {
      console.error("Failed to copy: ", err)
      toast.error("Failed to copy to clipboard!")
    }
  }
  const [isOpen, setIsOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleSetName = () => {
    setName(newName)
    toast.success("Đã lưu tên người dùng!")
    setIsOpen(false)
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
                  width={48}
                  height={48}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <User2 size={20} className="text-blue-700" />
              )}
            </div>
          </DrawerTrigger>
          <DrawerContent className="px-2.5 pb-20">
            {/* Account */}
            <div className="mt-5 flex flex-col items-center justify-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="avatar"
                    width={64}
                    height={64}
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
            <div className="flex flex-col">
              <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger className="w-full">
                  <CardSetting
                    title="Đổi tên người dùng"
                    icon={<User2 strokeWidth={3} size={20} />}
                  />
                </DrawerTrigger>
                <DrawerContent className="w-full px-2.5">
                  <div className="flex w-full flex-col items-center gap-2 py-10">
                    <p className="text-lg font-semibold text-gray-500">
                      Chỉnh sửa tên người dùng của bạn
                    </p>
                    <InputGroup className="max-w-xs">
                      <InputGroupInput
                        onChange={(e) => setNewName(e.currentTarget.value)}
                        placeholder="Nhập tên người dùng mới"
                        value={newName}
                      />

                      <InputGroupAddon align="inline-end">
                        .uni.eth
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                  <DrawerFooter>
                    <Button onClick={() => handleSetName()} variant="outline">
                      Lưu
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
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
