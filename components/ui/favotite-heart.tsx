"use client"
import { Star } from "lucide-react"

type TFavoriteStar = {
  isFavorite: boolean
  onClick?: () => void
}
export const FavoriteStar: React.FC<TFavoriteStar> = ({
  isFavorite = false,
  onClick,
}) => {
  return (
    <button className="p-2.5" onClick={onClick}>
      <Star
        className={`size-4 ${isFavorite ? "fill-yellow-500 text-yellow-500" : ""}`}
      />
    </button>
  )
}
