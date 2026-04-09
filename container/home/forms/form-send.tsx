"use client"

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group"
import { ScanQrCode, SearchIcon, UserSearch } from "lucide-react"
import { useState } from "react"

export const FormSend: React.FC = () => {
  const [query, setQuery] = useState("")

  return (
    <div className="flex flex-col gap-4">
      <InputGroup className="bg-background rounded-xl border-border">
        <InputGroupAddon>
          <SearchIcon className="text-foreground/40" size={18} />
        </InputGroupAddon>
        <InputGroupInput 
          placeholder="Nhập địa chỉ hoặc tên người dùng..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent border-none text-base h-12 outline-none focus-visible:ring-0 px-2"
        />
        <InputGroupAddon align={"inline-end"}>
          <button className="text-foreground/40 hover:text-foreground transition-colors p-1">
            <ScanQrCode size={20} />
          </button>
        </InputGroupAddon>
      </InputGroup>
      
      {!query && (
        <div className="flex w-full flex-col items-center justify-center gap-4 py-16">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background text-primary shadow-lg shadow-primary/10">
            <UserSearch strokeWidth={2.5} size={28} />
          </div>
          <p className="text-sm text-foreground/50 text-center">Nhập địa chỉ, ENS hoặc tên người dùng<br/>để bắt đầu gửi tài sản</p>
        </div>
      )}
    </div>
  )
}
