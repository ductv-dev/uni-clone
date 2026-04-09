"use client"

import { CardSetting } from "@/components/custom/cards/card-setting"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { usePwaInstall } from "@/hooks/use-pwa-install"
import { ChevronLeft, Download, Moon, Settings, Sun, User2 } from "lucide-react"
import { useTheme } from "next-themes"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const LIST_SETTING = [
  {
    name: "Notifications",
    icon: <Settings size={16} strokeWidth={2} className="text-foreground/60" />,
  },
  {
    name: "Privacy",
    icon: <Settings size={16} strokeWidth={2} className="text-foreground/60" />,
  },
  {
    name: "Security",
    icon: <Settings size={16} strokeWidth={2} className="text-foreground/60" />,
  },
]

export const Setting = () => {
  const route = useRouter()
  const { isInstallable, install } = usePwaInstall()
  const handleLogout = () => {
    toast.success("Đăng xuất thành công")
    redirect("/wellcome")
  }
  return (
    <div>
      <div className="fixed top-2.5 w-full px-2.5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => route.back()}
            className="flex h-12 w-12 items-center justify-center rounded-full border-t border-border bg-background shadow-lg shadow-border hover:bg-accent"
          >
            <ChevronLeft strokeWidth={2} className="text-foreground/60" />
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold text-foreground/60">
            Settings
          </h1>
          <div className="">
            <AnimatedThemeToggler />
          </div>
        </div>
      </div>
      <div className="mt-24 flex flex-col gap-2 px-2.5">
        {isInstallable && (
          <CardSetting
            title="Install App"
            icon={
              <Download size={16} strokeWidth={2} className="text-primary" />
            }
            onClick={install}
            className="mx-auto rounded-lg border border-primary/20 bg-primary/50 text-primary hover:bg-primary/20"
          />
        )}
        {LIST_SETTING.map((setting) => (
          <CardSetting
            key={setting.name}
            title={setting.name}
            icon={setting.icon}
          />
        ))}
        <CardSetting
          className=""
          onClick={() => redirect("/user/account")}
          title="Account"
          icon={<User2 size={16} className="text-primary" strokeWidth={2} />}
        />

        <CardSetting
          className="text-red-500"
          onClick={() => handleLogout()}
          title="Đăng xuất"
          icon={<Download size={16} className="text-red-500" strokeWidth={2} />}
        />
      </div>
    </div>
  )
}
