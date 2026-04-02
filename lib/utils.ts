import { clsx, type ClassValue } from "clsx"
import { Time } from "lightweight-charts"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function generateOHLC(count = 150, startPrice = 120) {
  const data = []
  let open = startPrice
  const now = Math.floor(Date.now() / 1000)
  const DAY = 86400
  for (let i = count; i >= 0; i--) {
    const time = (now - i * DAY) as Time
    const change = (Math.random() - 0.48) * 4
    const close = Math.max(1, open + change)
    const high = Math.max(open, close) + Math.random() * 2
    const low = Math.min(open, close) - Math.random() * 2
    data.push({
      time,
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +close.toFixed(2),
    })
    open = close
  }
  return data
}
