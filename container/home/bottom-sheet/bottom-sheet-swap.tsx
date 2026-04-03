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
import { cn } from "@/lib/utils"

type Props = {
  className?: string
  isMini: boolean
}
export const BottomSheetSwap: React.FC<Props> = ({
  className,
  isMini = false,
}) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <TriggerButton
          className={`w-30` + cn(className)}
          icon="swap"
          title={isMini ? "" : "Swap Token"}
        />
      </DrawerTrigger>
      <DrawerContent className="h-full max-h-full">
        <DrawerHeader>
          <DrawerTitle>Swap</DrawerTitle>
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
