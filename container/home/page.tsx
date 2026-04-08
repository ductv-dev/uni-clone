"use client"
import { SectionAccount } from "./sections/section-account"
import { useUser } from "@/store/user-store"
import { SectionBalance } from "./sections/section-balance"
import { SectionAction } from "./sections/section-action"
import { SectionNotifications } from "./sections/section-notifications"
import { SectionListToken } from "./sections/section-list-token"
import { LIST_TOKEN } from "@/data/mock-data-list-token"

export const Home = () => {
  const user = useUser((state: any) => state.user)
  const dataToken = LIST_TOKEN
  return (
    <div className="w-full">
      <SectionAccount data={user} />
      <SectionBalance number_changes={2.2} total_balance={10032432} />
      <SectionAction />
      <SectionNotifications />
      <SectionListToken data={dataToken} />
    </div>
  )
}
