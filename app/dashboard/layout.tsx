import Link from "next/link";
import { ReactNode } from "react";
import Logo from "../components/shared/Logo";
import { AlertCircleIcon, CircleUser, DollarSign, Globe, Home, Menu } from "lucide-react";
import { DashboardItems } from "../components/dashboard/DashboardItems";
import { ThemeToggle } from "../components/dashboard/ThemeToggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Toaster } from "@/components/ui/sonner";

export const navLinks = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: 'Sites',
    href: '/dashboard/sites',
    icon: Globe,
  },
  // {
  //   name: 'Articles',
  //   href: '/dashboard/articles',
  //   icon: AlertCircleIcon,
  // },
  // {
  //   name: "Pricing",
  //   href: "/dashboard/pricing",
  //   icon: DollarSign,
  // }
]


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href='/' className="flex items-center gap-2 font-semibold">
              <Logo />
            </Link>
          </div>
          <div className="flex-1 items-start px-2 font-medium lg:px-4">
            <nav>
              <DashboardItems />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          {/* Logo - visible on all screens */}
          <Link href="/dashboard" className="md:hidden">
            <Logo />
          </Link>

          <div className="ml-auto flex items-center gap-x-5">
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='secondary' size='icon' className="rounded-full">
                  <CircleUser />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <LogoutLink>Logout</LogoutLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu - Only visible on small screens, at the end right */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {navLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href} className="flex items-center gap-2 cursor-pointer">
                        <link.icon className="h-4 w-4" />
                        {link.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
          <Toaster richColors closeButton />
        </main>
      </div>
    </div>
  )
}