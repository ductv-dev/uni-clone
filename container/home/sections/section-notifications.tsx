"use client"

import { CardNotification } from "@/components/custom/cards/card-notification"
import { TUser } from "@/types/type-user"
import { Wallet } from "lucide-react"
import { useState } from "react"

type Props = {
  data: TUser
}
type TNotification = {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  is_repuired: boolean
  read?: boolean
}
export const SectionNotifications: React.FC<Props> = ({ data }) => {
  const [dataNotifications, setDataNotifications] = useState<TNotification[]>([
    {
      id: 1,
      title: "Nhận token đầu tiên của bạn",
      description:
        "Hãy nhận token đầu tiên của bạn để bắt đầu hành trình khám phá thế giới DeFi!",
      icon: <Wallet strokeWidth={3} size={20} />,
      is_repuired: true,
      read: false,
    },
    {
      id: 2,
      title: "Thiết lập tên người dùng",
      description:
        "Hãy thiết lập tên người dùng của bạn để hoàn thành quá trình đăng ký!",
      icon: <Wallet strokeWidth={3} size={20} />,
      is_repuired: false,
      read: false,
    },
  ])
  return (
    <div className="flex w-full">
      <div className="no-scrollbar flex w-full gap-2.5 overflow-x-auto py-5">
        {dataNotifications.map(
          (noti) =>
            noti.read === false && (
              <CardNotification
                key={noti.id}
                title={noti.title}
                description={noti.description}
                icon={noti.icon}
                isRequired={noti.is_repuired}
                setNotification={(read: boolean) =>
                  setDataNotifications((prev) =>
                    prev.map((item) =>
                      item.id === noti.id ? { ...item, read } : item
                    )
                  )
                }
              />
            )
        )}
      </div>
    </div>
  )
}
