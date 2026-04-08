"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"

export const Wellcome = () => {
  return (
    <div className="min-h-screen w-screen">
      <div className="relative flex h-[50vh] w-full flex-col items-center justify-center overflow-hidden">
        <OrbitingCircles iconSize={40} speed={0.3}>
          <span className="font-bold text-primary">Swap</span>
          <span className="font-bold text-primary">Swap</span>
          <span className="font-bold text-primary">Swap</span>
          <span className="font-bold text-primary">Swap</span>
        </OrbitingCircles>
        <OrbitingCircles iconSize={30} radius={100} reverse speed={0.5}>
          <span className="font-bold text-primary">Swap</span>
          <span className="font-bold text-primary">Swap</span>
          <span className="font-bold text-primary">Swap</span>
          <span className="font-bold text-primary">Swap</span>
        </OrbitingCircles>
      </div>
      <div className="fixed bottom-0 w-full px-2.5 pb-15">
        <div className="flex w-full flex-col items-center justify-center gap-3">
          <a
            href="/create-wallet"
            className="shadow-primary/50/30 flex h-12 items-center justify-center rounded-full border-t border-border bg-primary/20 px-4 shadow-lg"
          >
            <p className="text-sm font-bold text-primary">Tạo ví</p>
          </a>
          <a
            href="/add-wallet"
            className="flex h-12 items-center justify-center rounded-full border-t border-border bg-background px-4 shadow-lg shadow-border"
          >
            <p className="text-sm font-bold text-primary">Thêm ví hiện có</p>
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
