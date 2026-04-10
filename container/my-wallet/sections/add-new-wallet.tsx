"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-is-mobile"
import { CircleOff, Wallet2 } from "lucide-react"
import { ListAddWallet } from "../components/add-wallet"

export const AddNewWallet = () => {
    const isMobile = useIsMobile()
    return (
        <div className="flex flex-col w-full items-center justify-center flex-1">
            <Card className="w-full max-w-sm" >
                <CardContent className="flex flex-col items-center gap-2.5">
                    <span className="p-4 rounded-2xl shadow-sm shadow-red-500/50 w-fit  flex items-center justify-center border-t border-red-500 bg-red-500/5 ">
                        <CircleOff className="text-red-500" />
                    </span>
                    <p className="text-sm text-muted-foreground">Hiện tại bạn chưa có ví tiền</p>

                    <Drawer direction={isMobile ? "bottom" : "right"}>
                        <DrawerTrigger>
                            <Button size={"lg"}>
                                <div className="cursor-pointer flex gap-2 items-center">
                                    <Wallet2 />
                                    <span>Thêm ví để bắt đầu</span>
                                </div>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Thêm ví</DrawerTitle>
                            </DrawerHeader>
                            <ListAddWallet />
                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <Button variant="outline" className="max-w-sm mx-auto">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </CardContent>
            </Card>
        </div>
    )
}