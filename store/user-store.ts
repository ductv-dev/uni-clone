import { TUser } from "@/types/type-user"
import { create } from "zustand"

type Action = {
  setName: (name: TUser["name"]) => void
  setImage: (image: TUser["image"]) => void
}

export const useUser = create((set) => ({
  user: {
    name: "Viết Đức",
    id: "0x1234567890abcdef",
    image: "https://www.ductv.dev/_next/image?url=%2Fninhbinh.jpg&w=828&q=75",
    balance: 10000000,
    walletAddress: "",
    walletName: "My Wallet",
  },
  setName: (name: TUser["name"]) =>
    set((state: { user: TUser }) => ({ user: { ...state.user, name } })),

  setImage: (image: string | null) =>
    set((state: { user: TUser }) => ({ user: { ...state.user, image } })),
  setWalletAddress: (walletAddress: string) =>
    set((state: { user: TUser }) => ({
      user: { ...state.user, walletAddress },
    })),

  setWalletName: (walletName: string) =>
    set((state: { user: TUser }) => ({ user: { ...state.user, walletName } })),
}))
