import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { ArrowLeft, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { ListAddWallet } from "../components/add-wallet"
import { useIsMobile } from "@/hooks/use-is-mobile"

export const HeaderMyWallet = () => {
    const route = useRouter()
    const isMobile = useIsMobile()
    return (
        <div className="flex items-center px-2.5 py-5 justify-between">
            <div className="lg:hidden">
                <Button variant="ghost" size="icon">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
            </div>
            <div>
                <h1 className="text-lg font-semibold">
                    My Wallet
                </h1>
            </div>
            <div>
                <Drawer direction={isMobile ? "bottom" : "right"}>
                    <DrawerTrigger>
                        <Button size="icon">
                            <Plus className="w-5 h-5" />
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

            </div>
        </div>
    )
}