import { Navbar } from "@/components/custom/nav-bar"

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-full">
      {children}
      <Navbar />
    </div>
  )
}
