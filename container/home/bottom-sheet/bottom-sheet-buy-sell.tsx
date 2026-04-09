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
import { LIST_TOKEN } from "@/data/mock-data-list-token"
import { cn } from "@/lib/utils"
import { TToken } from "@/types/type-token"
import { ChevronDown } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

type Props = {
  className?: string
  defaultTokenSymbol?: TToken["symbol"]
  trigger?: React.ReactNode
}

export const BottomSheetBuySell: React.FC<Props> = ({
  className,
  defaultTokenSymbol,
  trigger,
}) => {
  const fallbackSymbol = LIST_TOKEN[2]?.symbol
  const initialSymbol =
    LIST_TOKEN.find((token) => token.symbol === defaultTokenSymbol)?.symbol ??
    defaultTokenSymbol ??
    fallbackSymbol

  const [isBuy, setIsBuy] = useState(true)
  const [currency, setCurrency] = useState(initialSymbol)
  const [amount, setAmount] = useState<number | null>(null)
  const [isTokenPickerOpen, setIsTokenPickerOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (defaultTokenSymbol) {
      const nextToken = LIST_TOKEN.find(
        (token) => token.symbol === defaultTokenSymbol
      )

      if (nextToken) {
        setCurrency(nextToken.symbol)
      }
    }
  }, [defaultTokenSymbol])

  useEffect(() => {
    if (drawerOpen) {
      setTimeout(() => {
        const inputElement = document.getElementById("buy-sell-amount")
        inputElement?.focus()
      }, 100)
    }
  }, [drawerOpen])

  const selectedToken = useMemo(
    () => LIST_TOKEN.find((token) => token.symbol === currency),
    [currency]
  )

  const result = useMemo(() => {
    if (!selectedToken || !amount || amount <= 0) {
      return 0
    }

    return isBuy ? amount / selectedToken.usdt : amount * selectedToken.usdt
  }, [amount, isBuy, selectedToken])

  const handleConfirm = async () => {
    try {
      if (!selectedToken) {
        toast.error("Vui lòng chọn token")
        return
      }

      if (!amount || Number(amount) <= 0 || amount > 9999999) {
        const inputElement = document.getElementById(
          "buy-sell-amount"
        ) as HTMLInputElement | null
        inputElement?.focus()
        toast.error("Vui lòng nhập số lượng hợp lệ")
        return
      }

      setIsLoading(true)

      await new Promise((resolve) => setTimeout(resolve, 1200))

      if (isBuy) {
        toast.success(
          `Đã mua ${result.toFixed(6)} ${selectedToken.symbol} với ${amount.toFixed(2)} USDT`
        )
      } else {
        toast.success(
          `Đã bán ${amount.toFixed(6)} ${selectedToken.symbol} và nhận ${result.toFixed(2)} USDT`
        )
      }

      setAmount(null)
      setDrawerOpen(false)
    } catch {
      toast.error("Có lỗi xảy ra khi xử lý giao dịch")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>
        {trigger ?? (
          <button type="button">
            <TriggerButton
              className={cn("w-30", className)}
              icon="bank"
              title="Mua/Bán"
            />
          </button>
        )}
      </DrawerTrigger>
      <DrawerContent className="h-full max-h-full">
        <DrawerHeader>
          <DrawerTitle className="flex w-full items-center justify-center">
            <div className="flex w-fit rounded-full bg-accent p-1">
              <button
                onClick={() => setIsBuy(true)}
                className={cn(
                  "rounded-full px-4 py-2 font-semibold text-foreground/60 transition-colors",
                  isBuy &&
                    "border-t border-t-primary/10 bg-primary/20 text-primary shadow-sm shadow-primary/50"
                )}
                type="button"
              >
                Mua
              </button>
              <button
                onClick={() => setIsBuy(false)}
                className={cn(
                  "rounded-full px-4 py-2 font-semibold text-foreground/60 transition-colors",
                  !isBuy &&
                    "border-t border-t-primary/10 bg-primary/20 text-primary shadow-sm shadow-primary/50"
                )}
                type="button"
              >
                Bán
              </button>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-2.5">
          <div className="flex flex-col gap-4 rounded-lg border border-border p-4">
            <div className="flex items-center justify-between gap-2.5">
              <p className="text-sm text-foreground/60">
                {isBuy ? "Thanh toán" : "Số lượng bán"}
              </p>
              <p className="text-sm text-foreground/60">
                {isBuy ? "Bằng USDT" : `Token ${selectedToken?.symbol ?? ""}`}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2.5">
              <label className="text-2xl font-bold text-foreground/60">
                {isBuy ? "USDT" : selectedToken?.symbol}
              </label>
              <input
                id="buy-sell-amount"
                name="buy-sell-amount"
                type="number"
                value={amount?.toString() || ""}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="w-full text-end text-xl font-bold [-moz-appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
          </div>

          <div className="py-3 text-center text-sm text-foreground/60">
            {isBuy ? "Bạn nhận được" : "Bạn nhận về"}:
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-lg font-semibold text-foreground">
                {result.toFixed(isBuy ? 6 : 2)}
              </span>
              {isBuy ? (
                <Drawer
                  open={isTokenPickerOpen}
                  onOpenChange={setIsTokenPickerOpen}
                >
                  <DrawerTrigger asChild>
                    <button type="button">
                      <Badge className="h-7 px-3">
                        {currency}
                        <ChevronDown />
                      </Badge>
                    </button>
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
                            setIsTokenPickerOpen(false)
                          }}
                          className={
                            token.symbol === currency ? "bg-accent" : ""
                          }
                        />
                      ))}
                    </div>
                  </DrawerContent>
                </Drawer>
              ) : (
                <span className="font-semibold text-foreground">USDT</span>
              )}
            </div>
          </div>

          {selectedToken && (
            <div className="rounded-lg border border-border px-4 py-3 text-sm text-foreground/60">
              {isBuy ? (
                <p>
                  1 {selectedToken.symbol} = {selectedToken.usdt.toFixed(2)}{" "}
                  USDT
                </p>
              ) : (
                <p>
                  1 {selectedToken.symbol} bán được{" "}
                  {selectedToken.usdt.toFixed(2)} USDT
                </p>
              )}
            </div>
          )}
        </div>
        <DrawerFooter>
          <Button size={"lg"} onClick={handleConfirm} disabled={isLoading}>
            {isLoading
              ? "Đang xử lý..."
              : isBuy
                ? `Mua ${selectedToken?.symbol ?? "token"}`
                : `Bán ${selectedToken?.symbol ?? "token"}`}
          </Button>
          <DrawerClose asChild>
            <Button size={"lg"} variant="outline">
              Hủy
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
