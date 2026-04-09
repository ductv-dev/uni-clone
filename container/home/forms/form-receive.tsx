"use client"

import { shortenHex } from "@/lib/utils"
import { useUser } from "@/store/user-store"
import { Coins, Copy } from "lucide-react"
import { toast } from "sonner"

export const FormReceive: React.FC = () => {
  const user = useUser((state: any) => state.user)
  const id = shortenHex(user?.id ?? "")

  const copyToClipboard = () => {
    if (!user?.id) return
    navigator.clipboard
      .writeText(user.id)
      .then(() => {
        toast.success("Đã copy vào clipboard", {
          icon: <Copy className="text-green-700" size={14} />,
          style: { borderRadius: 100 },
        })
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra khi copy vào clipboard")
      })
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-foreground/60 text-center pb-2">
        Nạp tiền vào ví bằng cách chuyển crypto từ ví hoặc tài khoản khác
      </p>
      
      <div className="flex flex-col gap-2 p-4 border border-border rounded-xl bg-background">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-foreground/60 text-lg tracking-wider bg-accent/50 py-1.5 px-3 rounded-lg overflow-hidden text-ellipsis whitespace-nowrapflex-1">
            {id}
          </p>
          <button 
            onClick={copyToClipboard}
            className="flex items-center justify-center p-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Copy size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-4 py-2">
        <div className="h-[1px] bg-border flex-1"></div>
        <p className="text-xs text-foreground/40 font-semibold uppercase tracking-widest">Từ tài khoản khác</p>
        <div className="h-[1px] bg-border flex-1"></div>
      </div>

      <a
        href="https://www.coinbase.com/fr-fr"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3.5 rounded-xl border border-border/50 bg-background hover:bg-accent/50 transition-colors p-3"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0052FF] text-white shadow-sm">
          <Coins strokeWidth={2} />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-foreground/80">Coinbase</p>
          <p className="text-xs text-foreground/50">Kết nối tài khoản</p>
        </div>
      </a>
    </div>
  )
}
