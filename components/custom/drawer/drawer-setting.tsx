"use client"

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
type Props = {}
export const DrawerSetting: React.FC<Props> = ({}) => {
  return (
    <Drawer>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent className="h-full max-h-full">
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum atque
          aut consequuntur, hic quo nulla commodi neque ducimus quibusdam,
          distinctio quam alias delectus necessitatibus repudiandae consequatur
          suscipit nihil qui? Molestiae!
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
