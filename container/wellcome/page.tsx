"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"
import {
  Bitcoin,
  ChartNoAxesCombined,
  ChartPie,
  Coins,
  HandCoins,
  Send,
  ShieldCheck,
  WalletCards,
} from "lucide-react"

export const Wellcome = () => {
  return (
    <div className="min-h-screen w-screen">
      <div className="relative flex h-[50vh] w-full flex-col items-center justify-center overflow-hidden">
        <OrbitingCircles iconSize={40} speed={0.3}>
          <span className="rounded-full bg-accent p-2.5 text-yellow-500 backdrop-blur-2xl">
            <Bitcoin />
          </span>
          <span className="rounded-full bg-accent p-2.5 text-yellow-500 backdrop-blur-2xl">
            <HandCoins />
          </span>
          <span className="rounded-full bg-accent p-2.5 text-yellow-500 backdrop-blur-2xl">
            <WalletCards />
          </span>
          <span className="rounded-full bg-accent p-2.5 text-yellow-500 backdrop-blur-2xl">
            <Coins />
          </span>
        </OrbitingCircles>
        <OrbitingCircles iconSize={30} radius={100} reverse speed={0.5}>
          <span className="font-bold text-primary">
            <ChartNoAxesCombined />
          </span>
          <span className="font-bold text-primary">
            <ChartPie />
          </span>
          <span className="font-bold text-primary">
            <Send />
          </span>
          <span className="font-bold text-primary">
            <ShieldCheck />
          </span>
        </OrbitingCircles>
      </div>
      <div className="fixed bottom-0 w-full px-2.5 pb-15">
        <div className="flex w-full flex-col items-center justify-center gap-3">
          <h1 className="border-b border-border text-lg font-bold text-primary">
            Wellcome to Uni Crypto
          </h1>
          <a
            href="/login"
            className="shadow-primary/50/30 flex h-12 items-center justify-center rounded-full border-t border-border bg-primary/20 px-4 shadow-lg"
          >
            <p className="text-sm font-bold text-primary">Đăng nhập</p>
          </a>
          <a
            href="/register"
            className="flex h-12 items-center justify-center rounded-full border-t border-border bg-background px-4 shadow-lg shadow-border"
          >
            <p className="text-sm font-bold text-primary">Đăng ký</p>
          </a>
          <p className="px-auto text-center text-sm text-foreground/60">
            Bằng việc tiếp tục, tôi đồng ý với{" "}
            <a href="" className="text-sm font-semibold text-primary">
              Điều khoản dịch vụ{" "}
            </a>
            và chấp nhận{" "}
            <a href="#" className="text-sm font-semibold text-primary">
              Chính sách về quyền riêng tư
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
