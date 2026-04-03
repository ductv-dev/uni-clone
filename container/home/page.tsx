"use client"
import { SectionAccount } from "./sections/section-account"
import { useUser } from "@/store/user-store"

export const Home = () => {
  const user = useUser((state: any) => state.user)
  console.log(user)
  return (
    <div className="w-full">
      <SectionAccount data={user} />
    </div>
  )
}
