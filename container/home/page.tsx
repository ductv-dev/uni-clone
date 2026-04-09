"use client"
import { LIST_TOKEN } from "@/data/mock-data-list-token"
import { useUser } from "@/store/user-store"
import { SectionAccount } from "./sections/section-account"
import { SectionAction } from "./sections/section-action"
import { SectionBalance } from "./sections/section-balance"
import { SectionListToken } from "./sections/section-list-token"
import { SectionNotifications } from "./sections/section-notifications"
import { DesktopActionTabs } from "./desktop/desktop-action-tabs"
import { Wallet } from "lucide-react"
import { useState } from "react"
import { TUser } from "@/types"

export const Home = () => {
  const user = useUser((state: { user: TUser }) => state.user)
  const dataToken = LIST_TOKEN.slice(0, 5)

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Nhận token đầu tiên của bạn",
      description: "Hãy nhận token đầu tiên của bạn để bắt đầu hành trình khám phá thế giới DeFi!",
      icon: <Wallet strokeWidth={3} size={20} />,
      is_repuired: true,
      read: false,
    },
    {
      id: 2,
      title: "Thiết lập tên người dùng",
      description: "Hãy thiết lập tên người dùng của bạn để hoàn thành quá trình đăng ký!",
      icon: <Wallet strokeWidth={3} size={20} />,
      is_repuired: false,
      read: false,
    },
  ])

  const totalBalance = 10032432
  const numberChanges = 2.2
  return (
    <div className="w-full">
      {/* ── Mobile ── */}
      <div className="md:hidden">
        <SectionAccount data={user} />
        <SectionBalance number_changes={numberChanges} total_balance={totalBalance} />
        <SectionAction />
        <SectionNotifications
          notifications={notifications}
          onMarkRead={(id, read) =>
            setNotifications((prev) =>
              prev.map((item) => (item.id === id ? { ...item, read } : item))
            )
          }
        />
        <SectionListToken data={dataToken} />
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex w-full max-w-7xl mx-auto gap-6 px-6 py-8">
        <div className="flex flex-1 flex-col gap-5 min-w-0">
          <SectionBalance
            number_changes={numberChanges}
            total_balance={totalBalance}
            isDesktop
          />
          <SectionNotifications
            isDesktop
            notifications={notifications}
            onMarkRead={(id, read) =>
              setNotifications((prev) =>
                prev.map((item) => (item.id === id ? { ...item, read } : item))
              )
            }
          />

          <SectionListToken data={dataToken} isDesktop />
        </div>

        <div className="w-[380px]   shrink-0">
          <div className="sticky top-24">
            <DesktopActionTabs />
          </div>
        </div>
      </div>
    </div>
  )
}
