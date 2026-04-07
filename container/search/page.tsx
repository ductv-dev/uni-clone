"use client"
import { CardToken1 } from "@/components/custom/cards/card-token-1"
import { CardToken2 } from "@/components/custom/cards/card-token-2"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group"
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  Select,
} from "@/components/ui/select"
import { LIST_TOKEN } from "@/data/data-list-token"
import {
  ChartLine,
  ChartNoAxesCombined,
  ChartPie,
  ChevronsDownUp,
  ChevronsUpDown,
  icons,
  SearchIcon,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import { useState } from "react"

const OPTION_SELECT = [
  {
    label: "Khối lượng",
    icon: <ChartNoAxesCombined />,
    value: "khoi_luong",
  },
  {
    label: "TVL Uni",
    icon: <ChartLine />,
    value: "tvl_uni",
  },
  {
    label: "Vốn hóa thị trường",
    icon: <ChartPie />,
    value: "von_hoa_thi_truong",
  },
  {
    label: "Giá tăng(24H)",
    icon: <TrendingUp />,
    value: "gia_tang_24h",
  },
  {
    label: "Giá giảm(24H)",
    icon: <TrendingDown />,
    value: "gia_giam_2",
  },
]

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [quantityFavorite, setQuantityFavorite] = useState(4)
  return (
    <div className="flex h-full w-full">
      {/* Field tìm kiếm */}
      <div className="fixed top-0 z-50 w-full bg-white p-2.5">
        <Field className="max-w-sm">
          <InputGroup className="rounded-full">
            <InputGroupInput id="inline-start-input" placeholder="Search..." />
            <InputGroupAddon align="inline-start">
              <SearchIcon className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </div>

      <div className="mt-12 px-2.5 pb-20">
        {/* List token yêu thích */}
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-500">Token yêu thích</p>

          <div className="grid grid-cols-2 gap-2.5">
            {LIST_TOKEN.map(
              (token, index) =>
                index < quantityFavorite && (
                  <CardToken2
                    key={token.address}
                    name={token.name}
                    image={token.logoURI}
                    price={token.usdt}
                    number_changes={token.number_changes}
                  />
                )
            )}
          </div>
          <div className="flex items-center gap-2.5 px-2.5 py-2 text-gray-500">
            <p className="h-px flex-1 bg-gray-500"></p>

            {quantityFavorite === 4 ? (
              <button
                onClick={() => setQuantityFavorite(6)}
                className="flex items-center gap-1"
              >
                <p>Hiện thêm</p>
                <ChevronsUpDown className="" size={14} />
              </button>
            ) : (
              <button
                onClick={() => setQuantityFavorite(4)}
                className="flex items-center gap-1"
              >
                <p>Thu lại</p>
                <ChevronsDownUp className="" size={14} />
              </button>
            )}
            <p className="h-px flex-1 bg-gray-500"></p>
          </div>
        </div>
        {/* List token hàng đầu */}
        <div className="flex flex-col gap-2">
          {/* Bộ lọc */}
          <div className="flex items-center">
            <p className="flex-1 font-semibold text-gray-500">Token hàng đầu</p>
            <Select defaultValue={OPTION_SELECT[0].value}>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  {OPTION_SELECT.map((option, index) => (
                    <SelectItem key={index} value={option.value}>
                      <div className="flex items-center gap-1">
                        <div>{option.icon}</div>
                        <p>{option.label}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* Danh sách token */}
          <div>
            {LIST_TOKEN.map((token, index) => (
              <CardToken1
                rank={index + 1}
                name={token.name}
                image={token.logoURI}
                price={token.usdt}
                number_changes={token.number_changes}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
