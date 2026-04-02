"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"

export const CreateWallet = () => {
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
          <Button className="bg-blue-700">Tạo ví</Button>
          <Button className="text-blue-700" variant={"outline"}>
            Thêm ví hiện có
          </Button>
          <p className="px-auto text-sm text-gray-500">
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
