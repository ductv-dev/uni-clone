import { BookAlert } from "lucide-react"

export const HistoryPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-2.5 p-2.5">
      <h1 className="text-xl font-semibold">Hoạt động</h1>
      <div className="flex w-full flex-col items-center justify-center gap-2.5 py-20">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border-t border-black/10 bg-white text-blue-700 shadow-lg shadow-black/10">
          <BookAlert strokeWidth={3} size={24} />
        </div>
        <p>Chưa có hoạt động nào</p>
      </div>
    </div>
  )
}
