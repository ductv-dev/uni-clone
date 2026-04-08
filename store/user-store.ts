import { TUser } from "@/types/type-user"
import { create } from "zustand"

type Action = {
  setName: (name: TUser["name"]) => void
}

type UserStore = {
  user: TUser
} & Action

export const useUser = create<UserStore>((set) => ({
  user: {
    name: "Account",
    id: "0x1234567890abcdef",
    avatar: "",
    email: "",
  },
  setName: (name: TUser["name"]) =>
    set((state: { user: TUser }) => ({ user: { ...state.user, name } })),
}))
