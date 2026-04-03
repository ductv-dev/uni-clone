import { create } from "zustand"
type TUser = {
  name: string
  id: string
  image: string | null
}
type Action = {
  setName: (name: TUser["name"]) => void
  setImage: (image: TUser["image"]) => void
}

export const useUser = create((set) => ({
  user: {
    name: "Viết Đức",
    id: "0x1234567890abcdef",
    image: "https://www.ductv.dev/_next/image?url=%2Fninhbinh.jpg&w=828&q=75",
  },
  setName: (name: TUser["name"]) =>
    set((state: { user: TUser }) => ({ user: { ...state.user, name } })),

  setImage: (image: string | null) =>
    set((state: { user: TUser }) => ({ user: { ...state.user, image } })),
}))
