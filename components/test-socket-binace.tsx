import { useEffect, useState } from "react"

export default function TestBinanceSocket() {
  const [currentPrice, setCurrentPrice] = useState(0)
  const [isSocketConnected, setIsSocketConnected] = useState(false)

  useEffect(() => {
    // Khởi tạo kết nối đến luồng nến 1 phút của BTC/USDT
    const ws = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@kline_1s"
    )

    ws.onopen = () => {
      console.log("✅ Đã kết nối với Binance WebSocket!")
      setIsSocketConnected(true)
    }

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      const kline = message.k // Lấy object chứa thông tin nến

      // Lấy giá đóng cửa (giá hiện tại)
      const price = parseFloat(kline.c)
      setCurrentPrice(price)

      // In log ra console để bạn xem toàn bộ cấu trúc data
      // console.log('Dữ liệu trả về:', kline);
    }

    ws.onerror = (error) => {
      console.error("❌ Lỗi kết nối WebSocket:", error)
    }

    ws.onclose = () => {
      console.log("🔌 Kết nối đã đóng.")
      setIsSocketConnected(false)
    }

    // Cleanup function: Đóng kết nối khi component bị unmount
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close()
      }
    }
  }, [])

  return (
    <div className="max-w-sm rounded-lg border p-4 font-sans">
      <h2 className="mb-2 text-lg font-bold">Test Binance WebSocket</h2>
      <div className="flex items-center gap-2">
        Trạng thái:
        <span className={isSocketConnected ? "text-green-500" : "text-red-500"}>
          {isSocketConnected ? "Đang kết nối 🟢" : "Ngắt kết nối 🔴"}
        </span>
      </div>
      <div className="mt-4 font-mono text-2xl">
        BTC/USDT: $
        {currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </div>
    </div>
  )
}
