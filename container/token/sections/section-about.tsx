import { TToken } from "@/types/type-token"

type Props = {
  data: TToken
}
export const SectionAbout: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col p-2.5">
      <p className="text-lg font-bold text-foreground/60">
        Giới thiệu về {data.name}{" "}
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur
        temporibus nesciunt ipsam sed totam doloremque! Repudiandae tempora ab
        omnis porro deleniti earum officia laudantium, esse commodi! Doloremque
        cupiditate eius minus.
      </p>
    </div>
  )
}
