"use client"

import { ButtonNav } from "@/components/custom/button/button-navigation"
import { LIST_TOKEN } from "@/data/mock-data-list-token"
import { SectionHeader } from "./sections/section-header"
import { Landmark, SearchX, SquareArrowOutUpRight } from "lucide-react"
import { SectionMain } from "./sections/section-main"
import { SectionChart } from "./sections/section-chart"
import { SectionAbout } from "./sections/section-about"
import { StatisticalSection } from "./sections/section-statistical"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { NavbarDesktop } from "@/components/layout/nav-bar-desktop"
import { NAVBAR_ITEMS } from "@/lib/nav-config"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FieldGroup, Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
  symbol: string
}
export const TokenInfor: React.FC<Props> = ({ symbol }) => {
  const data = LIST_TOKEN.find((t) => t.symbol === symbol)
  const [amount, setAmount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const totalUSDT = useMemo(() => {
    if (!amount || !data) return 0
    return amount * data.usdt
  }, [amount, data])

  const handleConfirm = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Mua thành công")
      setAmount(null)
      setIsOpen(false)
    }, 2000)

  }
  if (!data)
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-5">

        <div className="flex h-14 w-14 items-center justify-center rounded-xl border-t border-red-500/40 bg-background text-red-500 shadow-lg shadow-red-500/10">
          <SearchX strokeWidth={3} size={24} />
        </div>
        <p className="text-xl font-bold"> Token không tồn tại</p>
        <a href="/user/home">Về trang chủ</a>
      </div>
    )
  return (
    <div className="w-full pb-20">

      <NavbarDesktop data={NAVBAR_ITEMS} />
      <SectionHeader />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 md:flex-row md:px-6 md:py-8">
        {/* Cột trái (Mặc định full trên Mobile, 2/3 trên Desktop) */}
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <SectionMain data={data} />
          <SectionChart />

          <SectionAbout data={data} />
          <StatisticalSection data={data} />
        </div>

        {/* Cột phải (Ẩn trên Mobile, fixed width trên Desktop) */}
        <div className="hidden w-[380px] shrink-0 md:block">
          <div className="sticky top-24">
            <Card className="rounded-2xl border-border bg-card shadow-sm">
              <CardHeader className="pb-3 text-center">
                <CardTitle className="text-xl font-bold tracking-tight text-foreground">
                  Giao dịch {data.symbol}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {/* Khối Mua */}
                <div className="flex flex-col gap-2 rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between text-xs text-foreground/50">
                    <span>Bạn mua</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-xl font-bold text-foreground">
                      {data.symbol}
                    </label>
                    <input
                      type="number"
                      value={amount?.toString() || ""}
                      onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      className="w-full bg-transparent text-end text-2xl font-bold [-moz-appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  </div>
                </div>

                {/* Khối Trả bằng USDT */}
                <div className="flex flex-col gap-2 rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between text-xs text-foreground/50">
                    <span>Bạn thanh toán</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-xl font-bold text-foreground">
                      USDT
                    </label>
                    <input
                      disabled
                      type="number"
                      value={totalUSDT ? totalUSDT.toFixed(2) : ""}
                      placeholder="0"
                      className="w-full bg-transparent text-end text-2xl font-bold text-foreground/50 [-moz-appearance:textfield] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground/50">
                  <p>1 {data.symbol} ≈ {data.usdt.toFixed(2)} USDT</p>
                </div>

                <Button
                  size="lg"
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className="mt-2 w-full font-semibold"
                >
                  {isLoading ? "Đang xử lý..." : `Mua ${data.symbol}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Button Mua/Bán dưới cùng màn hình (Chỉ hiện trên Mobile) */}
      <div className="fixed bottom-0  flex w-full justify-center bg-accent/0 pb-5 px-4 md:hidden">

        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger>
            <ButtonNav classname="w-full">
              <div className="flex items-center justify-center gap-1 font-bold text-primary">
                <Landmark /> <p>Mua</p>
              </div>
            </ButtonNav>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Mua {data.symbol}</DrawerTitle>
            </DrawerHeader>

            <CardHeader className="pb-3 text-center">
              <CardTitle className="text-xl font-bold tracking-tight text-foreground">
                Giao dịch {data.symbol}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {/* Khối Mua */}
              <div className="flex flex-col gap-2 rounded-xl border border-border bg-background p-4">
                <div className="flex items-center justify-between text-xs text-foreground/50">
                  <span>Bạn mua</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xl font-bold text-foreground">
                    {data.symbol}
                  </label>
                  <input
                    type="number"
                    value={amount?.toString() || ""}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="w-full bg-transparent text-end text-2xl font-bold [-moz-appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {/* Khối Trả bằng USDT */}
              <div className="flex flex-col gap-2 rounded-xl border border-border bg-background p-4">
                <div className="flex items-center justify-between text-xs text-foreground/50">
                  <span>Bạn thanh toán</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xl font-bold text-foreground">
                    USDT
                  </label>
                  <input
                    disabled
                    type="number"
                    value={totalUSDT ? totalUSDT.toFixed(2) : ""}
                    placeholder="0"
                    className="w-full bg-transparent text-end text-2xl font-bold text-foreground/50 [-moz-appearance:textfield] focus:outline-none"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground/50">
                <p>1 {data.symbol} ≈ {data.usdt.toFixed(2)} USDT</p>
              </div>


            </CardContent>
            <CardFooter>
              <Button
                size="lg"
                onClick={handleConfirm}
                disabled={isLoading}
                className="mt-2 w-full font-semibold"
              >
                {isLoading ? "Đang xử lý..." : `Mua ${data.symbol}`}
              </Button>
            </CardFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}
