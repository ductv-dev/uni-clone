import { NavbarDesktop } from "@/components/layout/nav-bar-desktop"
import { Navbar } from "@/components/layout/nav-bar-mobile"

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-full">
      <div className="md:hidden">
        <Navbar />
      </div>
      <div className="hidden md:block">
        <NavbarDesktop />
      </div>
      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  )
}
