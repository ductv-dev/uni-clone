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

export const BottomSheetSend = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <TriggerButton className="w-30" icon="send" title="Gửi" />
      </DrawerTrigger>
      <DrawerContent className="h-full max-h-full">
        <DrawerHeader>
          <DrawerTitle>Gửi</DrawerTitle>
        </DrawerHeader>
        <div className="no-scrollbar w-full overflow-y-auto px-2.5">
          <div className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4">
            <div>
              <input
                type="text"
                placeholder="0"
                className="text-xl font-bold"
              />
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
