"use client"

import {
  ChevronLeft,
  Key,
  ShieldCheck,
  Cpu,
  User,
  Wallet,
  Wallet2Icon,
} from "lucide-react"
import { useRouter } from "next/navigation"
const LIST_WALLET = [
  {
    name: "Nhập cụm từ khóa khôi phục",
    description: "Nhập private key của bạn để thêm ví vào ứng dụng",
    icon: <Key size={20} className="text-blue-700" />,
  },
  {
    name: "Khôi phục ví",
    description: "Nhập seed phrase của bạn để thêm ví vào ứng dụng",
    icon: <Wallet size={20} className="text-blue-700" />,
  },
  {
    name: "Connect with hardware wallet",
    description: "Kết nối ví phần cứng của bạn để thêm ví vào ứng dụng",
    icon: <Cpu size={20} className="text-blue-700" />,
  },
]

export const AddWallet = () => {
  const route = useRouter()
  return (
    <div className="w-full">
      <div className="fixed top-2.5 w-full px-2.5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => route.back()}
            className="flex h-12 w-12 items-center justify-center rounded-full border-t border-black/10 bg-white shadow-lg shadow-black/10 hover:bg-gray-100"
          >
            <ChevronLeft strokeWidth={2} className="text-gray-500" />
          </button>
        </div>
      </div>
      <div className="mt-24 flex w-full flex-col items-center justify-center gap-12">
        <div className="flex flex-col items-center justify-center gap-2.5 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border-t border-black/10 bg-white text-blue-700 shadow-lg shadow-black/10">
            <Wallet2Icon strokeWidth={3} size={24} />
          </div>
          <h5 className="font-semibold text-gray-500">
            Chọn cách thêm ví của bạn
          </h5>
        </div>
        <div className="flex flex-col gap-2.5">
          {LIST_WALLET.map((wallet) => (
            <a
              href="#"
              key={wallet.name}
              className="flex w-full items-center justify-center rounded-sm border-t border-black/10 bg-white shadow-lg shadow-black/10 hover:bg-gray-100"
            >
              <div className="flex gap-2.5 px-2.5 py-5">
                <div className="flex flex-col items-start justify-center rounded-full bg-blue-100/50 px-2.5 py-1">
                  {wallet.icon}
                </div>
                <div className="">
                  <p className="-sm font-semibold text-gray-700">
                    {wallet.name}
                  </p>
                  <p className="line-clamp-1 text-xs text-gray-400">
                    {wallet.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
