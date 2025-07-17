"use client"

import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface HeaderProps {
  searchTerm: string
  onSearchChange: (term: string) => void
}

export function Header({ searchTerm, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image
            src="/placeholder.svg?height=32&width=32" // Placeholder for your logo
            width={32}
            height={32}
            alt="AL-Shhafi Group Global Logo"
            className="rounded-full"
          />
          <span className="text-lg">AL-Shhafi Group Global</span>
        </Link>
        <div className="relative flex-1 max-w-md mx-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full rounded-lg bg-background pl-8"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/admin" className="text-sm font-medium hover:underline">
            Admin Portal
          </Link>
        </nav>
      </div>
    </header>
  )
}
