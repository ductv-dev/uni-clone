"use client"

import { TriggerButton } from "@/components/custom/button/trigger-button"
import { CardToken1 } from "@/components/custom/cards/card-token-1"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {} from "@/components/ui/input-group"
import { LIST_TOKEN } from "@/data/data-list-token"
import { TToken } from "@/types/type-token"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

import { useEffect, useState } from "react"

export const BottomSheetBuySell = () => {
  const [isBuy, setIsBuy] = useState(true)
  const [currency, setCurrency] = useState(LIST_TOKEN[2].symbol)
  const [total, setTotal] = useState<null | number>(null)
  const selectedToken = LIST_TOKEN.find((t) => t.symbol === currency)
  const result = selectedToken?.usdt && total ? total / selectedToken.usdt : 0

  const [tokenFrom, setTokenFrom] = useState(
    LIST_TOKEN[0].symbol as TToken["symbol"]
  )
  const [isOpen, setIsOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    if (drawerOpen) {
      setTimeout(() => {
        const inputElement = document.getElementById(
          "total"
        ) as HTMLInputElement
        inputElement.focus()
      }, 100)
    }
  }, [drawerOpen])

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger>
        <TriggerButton className="w-30" icon="bank" title="Mua/Bán" />
      </DrawerTrigger>
      <DrawerContent className="h-full max-h-full">
        <DrawerHeader>
          <DrawerTitle className="flex w-full items-center justify-center gap-4">
            <motion.div className="flex w-fit rounded-full bg-accent">
              <Badge
                onClick={() => setIsBuy(true)}
                className={`rounded-full px-4 py-4 font-semibold text-foreground/60 ${isBuy ? "border-t border-t-primary/10 bg-primary/20 text-primary shadow-sm shadow-primary/50" : "bg-transparent"}`}
              >
                Mua
              </Badge>

              <Badge
                onClick={() => setIsBuy(false)}
                className={`rounded-full px-4 py-4 font-semibold text-foreground/60 ${!isBuy ? "border-t border-t-primary/10 bg-primary/20 text-primary shadow-sm shadow-primary/50" : "bg-transparent"}`}
              >
                Bán
              </Badge>
            </motion.div>
          </DrawerTitle>
        </DrawerHeader>
        <div className="no-scrollbar px-2.5">
          <div className="flex w-full flex-col items-center justify-center">
            <div className="my-12 flex flex-col items-center justify-between gap-2.5">
              <div className="flex justify-center gap-5">
                <label className="text-3xl font-bold text-foreground/60">USDT</label>
                <input
                  id="total"
                  name="total"
                  type="number"
                  value={total?.toString() || ""}
                  onChange={(e) => {
                    setTotal(parseFloat(e.target.value) || 0)
                  }}
                  placeholder="0"
                  className="text-end text-xl font-bold [-moz-appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </div>

              <span className="flex-1 text-sm text-foreground/60">
                ≈ {result.toFixed(4)}{" "}
                <Drawer open={isOpen} onOpenChange={setIsOpen}>
                  <DrawerTrigger>
                    <Badge>
                      {currency}
                      <ChevronDown />
                    </Badge>
                  </DrawerTrigger>
                  <DrawerContent className="h-[70%] max-h-full">
                    <DrawerHeader>
                      <DrawerTitle className="text-start text-lg font-medium">
                        Chọn token
                      </DrawerTitle>
                    </DrawerHeader>
                    <div className="no-scrollbar w-full overflow-y-auto px-2.5">
                      {LIST_TOKEN.map((token: TToken) => (
                        <CardToken1
                          key={token.symbol}
                          name={token.name}
                          image={token.logoURI}
                          symbol={token.symbol}
                          onClick={() => {
                            setCurrency(token.symbol)
                            setIsOpen(false)
                          }}
                          className={
                            token.symbol === tokenFrom ? "bg-accent" : ""
                          }
                        />
                      ))}
                    </div>
                  </DrawerContent>
                </Drawer>
              </span>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button className="mx-auto max-w-30">Xác nhận</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
