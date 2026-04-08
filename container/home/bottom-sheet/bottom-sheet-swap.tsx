"use client"

import { TriggerButton } from "@/components/custom/button/trigger-button"
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
import { cn } from "@/lib/utils"
import { LIST_TOKEN } from "@/data/mock-data-list-token"
import { TToken } from "@/types/type-token"
import { useEffect, useState } from "react"
import { CardToken1 } from "@/components/custom/cards/card-token-1"
import { ArrowDownUp } from "lucide-react"
import { toast } from "sonner"

type Props = {
  className?: string
  isMini: boolean
}
export const BottomSheetSwap: React.FC<Props> = ({
  className,
  isMini = false,
}) => {
  const [tokenFrom, setTokenFrom] = useState(
    LIST_TOKEN[0].symbol as TToken["symbol"]
  )
  const [tokenTo, setTokenTo] = useState(
    LIST_TOKEN[2].symbol as TToken["symbol"]
  )
  const [isOpen, setIsOpen] = useState(false)
  const [valueFrom, setValueFrom] = useState<number | null>(null)
  const [valueTo, setValueTo] = useState<number | null>(null)
  const [valueInUSDT, setValueInUSDT] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleSwap = async () => {
    try {
      if (!tokenFrom || !tokenTo) {
        toast.error("Vui lòng chọn cả hai token")
        return
      }

      if (tokenFrom === tokenTo) {
        toast.error("Token đi và token đến phải khác nhau")
        return
      }

      if (!valueFrom || Number(valueFrom) <= 0 || valueFrom > 9999999) {
        const inputElement = document.getElementById(
          "valueFrom"
        ) as HTMLInputElement
        inputElement.focus()
        toast.error("Vui lòng nhập số lượng hợp lệ")

        return
      }

      setIsLoading(true)

      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success(
        `Đã đổi ${valueFrom} ${tokenFrom} (${valueInUSDT.toFixed(2)} USDT) sang ${valueTo?.toFixed(6)} ${tokenTo}`
      )

      setValueFrom(null)
      setTokenTo("")
      setValueTo(0)
      setDrawerOpen(false)
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đổi token")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReverseTokens = () => {
    if (!tokenTo) {
      toast.error("Vui lòng chọn token đến trước")
      return
    }
    setTokenFrom(tokenTo)
    setTokenTo(tokenFrom)
    setValueFrom(null)
    setValueTo(null)
  }
  useEffect(() => {
    if (tokenFrom && tokenTo && valueFrom) {
      const tokenFromData = LIST_TOKEN.find((t) => t.symbol === tokenFrom)
      const tokenToData = LIST_TOKEN.find((t) => t.symbol === tokenTo)
      if (tokenFromData && tokenToData) {
        const valueFromNum = Number(valueFrom)
        if (valueFromNum > 0) {
          const valueUSDT = valueFromNum * tokenFromData.usdt
          setValueInUSDT(valueUSDT)
          const valueTo = valueUSDT / tokenToData.usdt
          setValueTo(valueTo)
        }
      }
    } else {
      setValueTo(0)
      setValueInUSDT(0)
    }
  }, [valueFrom, tokenFrom, tokenTo])

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger>
        <TriggerButton
          className={`w-30` + cn(className)}
          icon="swap"
          title={isMini ? "" : "Swap Token"}
        />
      </DrawerTrigger>
      <DrawerContent className="h-full max-h-full">
        <DrawerHeader>
          <DrawerTitle className="text-start text-lg font-medium">
            Swap
          </DrawerTitle>
        </DrawerHeader>
        <div className="no-scrollbar w-full overflow-y-auto px-2.5">
          {/*  From Token */}
          <div className="flex flex-col gap-2 rounded-lg border border-border p-4">
            <div className="flex flex-col items-center justify-between gap-2.5">
              <div className="flex w-full items-center justify-between gap-2.5">
                <p>Từ</p>
                {tokenFrom && <p>Ví {tokenFrom}</p>}
              </div>
              <div className="flex w-full items-center justify-between gap-2.5">
                <Drawer open={isOpen} onOpenChange={setIsOpen}>
                  <DrawerTrigger>
                    <Badge>{tokenFrom}</Badge>
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
                            setTokenFrom(token.symbol)
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
                <input
                  id="valueFrom"
                  name="valueFrom"
                  type="number"
                  value={valueFrom?.toString() || ""}
                  onChange={(e) => {
                    setValueFrom(parseFloat(e.target.value) || 0)
                  }}
                  placeholder="0"
                  className="text-end text-xl font-bold [-moz-appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>

          {/*  Swap Button */}
          <div className="flex justify-center py-2">
            <button
              onClick={handleReverseTokens}
              className="rounded-full border border-border bg-background p-2 transition-colors hover:bg-accent"
              type="button"
            >
              <ArrowDownUp className="h-4 w-4" />
            </button>
          </div>

          {/*  To Token */}
          <div className="flex flex-col gap-2 rounded-lg border border-border p-4">
            <div className="flex flex-col items-center justify-between gap-2.5">
              <div className="flex w-full items-center justify-between gap-2.5">
                <p>Đến</p>
                {tokenTo && <p>Ví {tokenTo}</p>}
              </div>
              <div className="flex w-full items-center justify-between gap-2.5">
                <Drawer open={isOpen} onOpenChange={setIsOpen}>
                  <DrawerTrigger>
                    <Badge>{tokenTo === "" ? "Chọn token" : tokenTo}</Badge>
                  </DrawerTrigger>
                  <DrawerContent className="h-[70%] max-h-full">
                    <DrawerHeader>
                      <DrawerTitle className="text-start text-lg font-medium">
                        Chọn token
                      </DrawerTitle>
                    </DrawerHeader>
                    <div className="no-scrollbar w-full overflow-y-auto px-2.5">
                      {LIST_TOKEN.map(
                        (token: TToken) =>
                          token.symbol !== tokenFrom && (
                            <CardToken1
                              key={token.symbol}
                              name={token.name}
                              price={token.usdt}
                              image={token.logoURI}
                              symbol={token.symbol}
                              onClick={() => {
                                setTokenTo(token.symbol)
                                setIsOpen(false)
                              }}
                              className={
                                token.symbol === tokenTo ? "bg-accent" : ""
                              }
                            />
                          )
                      )}
                    </div>
                  </DrawerContent>
                </Drawer>
                <label className="text-end text-xl font-bold">
                  {valueTo ? valueTo.toFixed(6) : "0"}
                </label>
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={handleSwap} disabled={isLoading}>
            {isLoading ? "Đang xử lý..." : "Hoán đổi ngay"}
          </Button>
          <DrawerClose>
            <Button variant="outline">Hủy</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
