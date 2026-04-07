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
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group"
import { ScanQrCode, SearchIcon, UserSearch, Wallet2Icon } from "lucide-react"

export const BottomSheetSend = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <TriggerButton className="w-30" icon="send" title="Gửi" />
      </DrawerTrigger>
      <DrawerContent className="h-full max-h-full">
        <DrawerHeader>
          <DrawerTitle>Chọn người gủi</DrawerTitle>
        </DrawerHeader>
        <div className="no-scrollbar w-full overflow-y-auto px-2.5">
          <InputGroup>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupAddon align={"inline-end"}>
              <ScanQrCode />
            </InputGroupAddon>
          </InputGroup>
          <div className="flex w-full flex-col items-center justify-center gap-2.5 py-20">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border-t border-border bg-background text-primary shadow-lg shadow-border">
              <UserSearch strokeWidth={3} size={24} />
            </div>
            <p>Nhập địa chỉ hoặc tên người dùng</p>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
