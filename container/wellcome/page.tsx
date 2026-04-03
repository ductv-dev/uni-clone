"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"

export const Wellcome = () => {
  return (
    <div className="min-h-screen w-screen">
      <div className="relative flex h-[50vh] w-full flex-col items-center justify-center overflow-hidden">
        <OrbitingCircles iconSize={40} speed={0.3}>
          <span className="font-bold text-blue-700">Swap</span>
          <span className="font-bold text-blue-700">Swap</span>
          <span className="font-bold text-blue-700">Swap</span>
          <span className="font-bold text-blue-700">Swap</span>
        </OrbitingCircles>
        <OrbitingCircles iconSize={30} radius={100} reverse speed={0.5}>
          <span className="font-bold text-blue-700">Swap</span>
          <span className="font-bold text-blue-700">Swap</span>
          <span className="font-bold text-blue-700">Swap</span>
          <span className="font-bold text-blue-700">Swap</span>
        </OrbitingCircles>
      </div>
      <div className="fixed bottom-0 w-full px-2.5 pb-15">
        <div className="flex w-full flex-col items-center justify-center gap-3">
          <a
            href="/create-wallet"
            className="flex h-12 items-center justify-center rounded-full border-t border-black/10 bg-blue-100 px-4 shadow-lg shadow-blue-700/30"
          >
            <p className="text-sm font-bold text-blue-700">Tạo ví</p>
          </a>
          <a
            href="/add-wallet"
            className="flex h-12 items-center justify-center rounded-full border-t border-black/10 bg-white px-4 shadow-lg shadow-black/10"
          >
            <p className="text-sm font-bold text-blue-700">Thêm ví hiện có</p>
          </a>
          <p className="px-auto text-center text-sm text-gray-500">
            Bằng việc tiếp tục, tôi đồng ý với{" "}
            <a href="" className="text-sm font-semibold text-blue-800">
              Điều khoản dịch vụ{" "}
            </a>
            và chấp nhận{" "}
            <a href="#" className="text-sm font-semibold text-blue-800">
              Chính sách về quyền riêng tư
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
