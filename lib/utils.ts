import { TToken } from "@/types/type-token"
import { clsx, type ClassValue } from "clsx"
import { CandlestickData, Time } from "lightweight-charts"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
    usdt: Math.random() * 1000,
  }
}

export type Timeframe = "1H" | "1D" | "1W" | "1M" | "1Y"

export function generateOHLC(
  count = 150,
  startPrice = 120,
  timeframe: Timeframe = "1D"
) {
  const data = []
  let open = startPrice

  // Điều chỉnh mức độ biến động giá (volatility) dựa trên khung thời gian
  let volatility = 4
  switch (timeframe) {
    case "1H":
      volatility = 100
      break
    case "1D":
      volatility = 4
      break
    case "1W":
      volatility = 10
      break
    case "1M":
      volatility = 25
      break
    case "1Y":
      volatility = 80
      break
  }

  // 1. Tính toán thời điểm bắt đầu (lui về quá khứ 'count' khoảng thời gian)
  const currentTime = new Date()
  if (timeframe === "1H") currentTime.setHours(currentTime.getHours() - count)
  if (timeframe === "1D") currentTime.setDate(currentTime.getDate() - count)
  if (timeframe === "1W") currentTime.setDate(currentTime.getDate() - count * 7)
  if (timeframe === "1M") currentTime.setMonth(currentTime.getMonth() - count)
  if (timeframe === "1Y")
    currentTime.setFullYear(currentTime.getFullYear() - count)

  // 2. Tạo dữ liệu tiến dần về hiện tại
  for (let i = 0; i < count; i++) {
    // Cộng thêm thời gian cho cây nến tiếp theo
    if (timeframe === "1H") currentTime.setHours(currentTime.getHours() + 1)
    if (timeframe === "1D") currentTime.setDate(currentTime.getDate() + 1)
    if (timeframe === "1W") currentTime.setDate(currentTime.getDate() + 7)
    if (timeframe === "1M") currentTime.setMonth(currentTime.getMonth() + 1)
    if (timeframe === "1Y")
      currentTime.setFullYear(currentTime.getFullYear() + 1)

    // Lightweight charts yêu cầu timestamp Unix (tính bằng GIÂY)
    const time = Math.floor(currentTime.getTime() / 1000) as Time

    const change = (Math.random() - 0.48) * volatility
    const close = Math.max(1, open + change)

    // Bóng nến (wick)
    const high = Math.max(open, close) + Math.random() * (volatility / 2)
    const low = Math.min(open, close) - Math.random() * (volatility / 2)

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

export function generateVolumeData(data: CandlestickData<Time>[]) {
  return data.map((candle) => ({
    time: candle.time,
    value: candle.high - candle.low,
    color: candle.close >= candle.open ? "#26a69a" : "#ef5350",
  }))
}

// random data 24h của token
export function randomData24h() {
  const data = []
  const now = Date.now()
  for (let i = 0; i < 24; i++) {
    data.push({
      time: now - i * 60 * 60 * 1000,
      value: Math.random() * 100,
    })
  }
  return data
}
// random data realtime
let randomFactor = 25 + Math.random() * 25
const samplePoint = (i: number) =>
  i *
    (0.5 +
      Math.sin(i / 1) * 0.2 +
      Math.sin(i / 2) * 0.4 +
      Math.sin(i / randomFactor) * 0.8 +
      Math.sin(i / 50) * 0.5) +
  200 +
  i * 2

export function generateDataRealtime(
  numberOfCandles = 500,
  updatesPerCandle = 5,
  startAt = 100
) {
  const createCandle = (val: number, time: number) => ({
    time,
    open: val,
    high: val,
    low: val,
    close: val,
  })

  const updateCandle = (
    candle: {
      time: number
      open: number
      high: number
      low: number
      close: number
    },
    val: number
  ) => ({
    time: candle.time,
    close: val,
    open: candle.open,
    low: Math.min(candle.low, val),
    high: Math.max(candle.high, val),
  })

  randomFactor = 25 + Math.random() * 25
  const date = new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0))
  const numberOfPoints = numberOfCandles * updatesPerCandle
  const initialData = []
  const realtimeUpdates = []
  let lastCandle:
    | { time: number; open: number; high: number; low: number; close: number }
    | undefined
  let previousValue = samplePoint(-1)
  for (let i = 0; i < numberOfPoints; ++i) {
    if (i % updatesPerCandle === 0) {
      date.setUTCDate(date.getUTCDate() + 1)
    }
    const time = date.getTime() / 1000
    let value = samplePoint(i)
    const diff = (value - previousValue) * Math.random()
    value = previousValue + diff
    previousValue = value
    if (i % updatesPerCandle === 0) {
      const candle = createCandle(value, time)
      lastCandle = candle
      if (i >= startAt) {
        realtimeUpdates.push(candle)
      }
    } else {
      const newCandle = updateCandle(lastCandle!, value)
      lastCandle = newCandle
      if (i >= startAt) {
        realtimeUpdates.push(newCandle)
      } else if ((i + 1) % updatesPerCandle === 0) {
        initialData.push(newCandle)
      }
    }
  }

  return {
    initialData,
    realtimeUpdates,
  }
}
