"use client"

import { CardToken1 } from "@/components/custom/cards/card-token-1"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group"
import { SkeletonCardToken1 } from "@/components/custom/skeleton/skeleton-card-token-1"
import { useSearchTokens } from "@/hooks/use-search"
import { ChevronLeft, Search, SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const BottomSheetSearch = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const route = useRouter()
  const { data, isLoading, error } = useSearchTokens(searchQuery)

  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    if (drawerOpen) {
      setTimeout(() => {
        const inputElement = document.getElementById(
          "search-token"
        ) as HTMLInputElement
        inputElement.focus()
      }, 100)
    }
  }, [drawerOpen])

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger className="w-full">
        <div className="flex flex-1 gap-2 rounded-full border-t border-border bg-background p-2.5 shadow-md shadow-border">
          <Search />
          <p>Nhập từ khóa tìm kiếm</p>
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-full max-h-full">
        <div className="flex items-center gap-1 p-2.5">
          <DrawerClose className="px-2">
            <ChevronLeft />
          </DrawerClose>
          <InputGroup className="w-full">
            <InputGroupInput
              id="search-token"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="no-scrollbar w-full overflow-y-auto px-2.5">
          <div className="flex w-full flex-col items-center justify-center gap-2.5 py-2">
            {isLoading ? (
              <div className="flex w-full flex-col gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <SkeletonCardToken1 key={index} />
                ))}
              </div>
            ) : error ? (
              <p className="text-sm text-destructive">
                Lỗi tìm kiếm. Vui lòng thử lại.
              </p>
            ) : data?.length ? (
              data.map((token) => (
                <CardToken1
                  key={token.symbol}
                  onClick={() => route.push(`/token/${token.symbol}`)}
                  name={token.name}
                  image={token.logoURI}
                  price={token.usdt}
                  number_changes={token.number_changes}
                />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Không có kết quả phù hợp.
              </p>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
