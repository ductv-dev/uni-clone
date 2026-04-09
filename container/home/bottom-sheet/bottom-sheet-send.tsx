"use client"

import { TriggerButton } from "@/components/custom/button/trigger-button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { FormSend } from "../forms/form-send"

export const BottomSheetSend = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <TriggerButton className="w-30" icon="send" title="Gửi" />
      </DrawerTrigger>
      <DrawerContent className="max-h-[90%]">
        <DrawerHeader>
          <DrawerTitle className="text-start text-lg font-medium opacity-0 h-0">Chọn người gủi</DrawerTitle>
        </DrawerHeader>
        <div className="no-scrollbar w-full overflow-y-auto px-4 pb-12">
          <FormSend />
          <DrawerClose asChild>
            <div className="mt-8 text-center cursor-pointer text-sm font-semibold text-foreground/60 transition-colors">
              Hủy
            </div>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

