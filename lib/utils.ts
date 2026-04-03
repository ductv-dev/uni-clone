import { TToken } from "@/types/type-token"
import { clsx, type ClassValue } from "clsx"
import { Time } from "lightweight-charts"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function generateOHLC(count: number, startPrice = 120) {
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
export function shortenHex(str: string, start = 6, end = 4) {
  if (!str) return ""

  // Chuẩn hóa về chữ thường
  const s = str.toLowerCase()

  if (s.length <= start + end) return s

  return `${s.slice(0, start)}...${s.slice(-end)}`
}

export function generateListRandomToken(count: number): TToken[] {
  const tokens: TToken[] = []
  for (let i = 0; i < count; i++) {
    tokens.push(generateRandomToken())
  }
  return tokens
}

export function generateRandomToken(): TToken {
  const symbols = ["ETH", "BTC", "USDT", "UNI", "LINK", "AAVE", "MKR", "COMP"]
  const randomSymbol =
    symbols[Math.floor(Math.random() * symbols.length)] +
    Math.floor(Math.random() * 1000)
  return {
    name: `${randomSymbol} Token `,
    symbol: randomSymbol,
    address: `0x${Math.random().toString(16).substr(2, 40)}`,
    decimals: 18,
    logoURI: `https://via.placeholder.com/32?text=${randomSymbol}`,
    number_changes: parseFloat((Math.random() * 10 - 5).toFixed(2)),
  }
}
