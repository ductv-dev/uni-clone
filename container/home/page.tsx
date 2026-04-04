"use client"
import { SectionAccount } from "./sections/section-account"
import { useUser } from "@/store/user-store"
import { SectionBalance } from "./sections/section-balance"
import { SectionAction } from "./sections/section-action"
import { SectionNotifications } from "./sections/section-notifications"
import { Section } from "lucide-react"
import { SectionListToken } from "./sections/section-list-token"
import { generateListRandomToken } from "@/lib/utils"
import { LIST_TOKEN } from "@/data/data-list-token"

export const Home = () => {
  const user = useUser((state: any) => state.user)
  const dataToken = LIST_TOKEN
  console.log(user)
  return (
    <div className="w-full">
      <SectionAccount data={user} />
      <SectionBalance number_changes={2.2} data={user} />
      <SectionAction />
      <SectionNotifications data={user} />
      <SectionListToken data={dataToken} />
    </div>
  )
}
