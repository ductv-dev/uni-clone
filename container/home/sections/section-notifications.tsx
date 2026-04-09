"use client"

import { CardNotification } from "@/components/custom/cards/card-notification"
import { Wallet } from "lucide-react"
import { useState } from "react"

type TNotification = {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  is_repuired: boolean
  read?: boolean
}
type Props = {
  isDesktop?: boolean
  notifications?: TNotification[]
  onMarkRead?: (id: number, read: boolean) => void
}

export const SectionNotifications: React.FC<Props> = ({
  isDesktop = false,
  notifications,
  onMarkRead,
}) => {
  const [internalNotifications, setInternalNotifications] = useState<TNotification[]>([
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

  const data = notifications || internalNotifications
  const unreadNotifications = data.filter((noti) => !noti.read)

  const handleSetNotification = (id: number, read: boolean) => {
    if (onMarkRead) {
      onMarkRead(id, read)
    } else {
      setInternalNotifications((prev) =>
        prev.map((item) => (item.id === id ? { ...item, read } : item))
      )
    }
  }

  if (unreadNotifications.length === 0 && isDesktop) {
    return null
  }

  if (isDesktop) {
    return (
      <div className="flex flex-col gap-2">
        <p className="px-1 text-xs font-semibold uppercase tracking-wider text-foreground/40">
          Thông báo
        </p>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {unreadNotifications.map((noti) => (
            <CardNotification
              key={noti.id}
              title={noti.title}
              description={noti.description}
              icon={noti.icon}
              isRequired={noti.is_repuired}
              setNotification={(read: boolean) => handleSetNotification(noti.id, read)}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full">
      <div className="no-scrollbar flex w-full gap-2.5 overflow-x-auto py-5">
        {unreadNotifications.map((noti) => (
          <CardNotification
            key={noti.id}
            title={noti.title}
            description={noti.description}
            icon={noti.icon}
            isRequired={noti.is_repuired}
            setNotification={(read: boolean) => handleSetNotification(noti.id, read)}
          />
        ))}
      </div>
    </div>
  )
}
