import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TToken } from "@/types/type-token"
import { ChevronDown, ChevronUp } from "lucide-react"
import image from "next/image"

type Props = {
  data: TToken
}
export const SectionMain: React.FC<Props> = ({ data }) => {
  return (
    <div className="mt-20 flex flex-col gap-2.5 p-2.5">
      <div className="flex gap-2.5">
        <Avatar className="h-12 w-12">
          <AvatarImage src={data.logoURI} alt="token image" className="" />
          <AvatarFallback>{data.symbol.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xl font-semibold text-gray-800">{data.name}</p>
          <p className="text-sm text-gray-400">{data.symbol}</p>
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">
          {data.usdt.toFixed(2)} US$
        </p>
        <div className="flex gap-2.5">
          <div className="flex">
            {(data.number_changes ?? 0) > 0 ? (
              <ChevronUp className="text-green-500" />
            ) : (
              <ChevronDown className="text-red-500" />
            )}
            <p className="text-gray-500">
              {((data.number_changes ?? 0) * data.usdt).toFixed(2)}
            </p>
          </div>
          <p className="text-gray-500">({data.number_changes ?? 0.0}%)</p>
        </div>
      </div>
    </div>
  )
}
