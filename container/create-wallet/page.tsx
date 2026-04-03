"use client"
import { Field } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group"
import { ChevronLeft, Info, User } from "lucide-react"
import { useRouter } from "next/navigation"

export const CreateWallet = () => {
  const route = useRouter()
  return (
    <div className="w-full py-12">
      {/* Header */}
      <div className="fixed top-2.5 w-full px-2.5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => route.back()}
            className="flex h-12 w-12 items-center justify-center rounded-full border-t border-black/10 bg-white shadow-lg shadow-black/10 hover:bg-gray-100"
          >
            <ChevronLeft strokeWidth={2} className="text-gray-500" />
          </button>
          <button className="flex h-12 items-center justify-center rounded-full border-t border-black/10 bg-white px-4 shadow-lg shadow-black/10 hover:bg-gray-100">
            <span className="font-semibold text-gray-500">Bỏ qua</span>
          </button>
        </div>
      </div>
      {/* Phần nội dung chính */}
      <div className="mt-24 flex w-full flex-col items-center justify-center gap-12">
        <div className="flex flex-col items-center justify-center gap-2.5 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border-t border-black/10 bg-white text-blue-700 shadow-lg shadow-black/10">
            <User strokeWidth={3} size={24} />
          </div>
          <h5 className="font-semibold text-gray-500">
            Tạo tên người dùng của bạn
          </h5>
          <p className="text-sm text-gray-500">
            Đây là địa chỉ cá nhân mọi người có thể gửi crypto đến
          </p>
        </div>
        <div>
          <Field>
            <InputGroup className="h-14 rounded-2xl">
              <InputGroupInput
                className="text-xl font-semibold text-black focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
                id="input-group-url"
                placeholder="your-username"
              />
              <InputGroupAddon align="inline-end">
                <p className="text-xl font-semibold text-black">.uni.eth</p>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <div className="mt-2 flex w-full items-center justify-center gap-1 text-sm text-gray-500">
            <p>0x000...0000</p>
            <Info size={16} strokeWidth={2} />
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="fixed bottom-0 w-full px-2.5 pb-15">
        <div className="flex w-full flex-col items-center justify-center gap-3">
          <a
            href="/user/home"
            className="flex h-14 items-center justify-center rounded-2xl border-t border-black/10 bg-white px-4 shadow-lg shadow-black/10 hover:bg-gray-100"
          >
            <span className="font-semibold text-gray-500">Tiếp tục</span>
          </a>
        </div>
      </div>
    </div>
  )
}
