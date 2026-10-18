import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/cn"

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "children"> & {
  variant?: "primary" | "neutral" | "subtle"
  size?: "medium" | "small"
  children: ReactNode
}

// Mirrors the class names of astraui's <Button> so links and buttons look identical.
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans leading-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary cursor-pointer hover:cursor-pointer"
const variants = {
  primary: "bg-brand-primary text-white border border-brand-primary hover:bg-brand-secondary hover:border-brand-secondary",
  neutral: "bg-transparent text-brand-primary border border-brand-primary hover:text-brand-secondary hover:border-brand-secondary",
  subtle: "bg-transparent text-brand-primary border-none hover:text-brand-secondary",
}

/** A Next.js <Link> styled as an astraui <Button>. */
export default function ButtonLink({
  variant = "primary",
  size = "medium",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const sizing =
    size === "small" ? "h-8 p-2 text-xs" : variant === "subtle" ? "h-10 px-3 py-1.5 text-base" : "h-10 px-4 py-2.5 text-base"

  return (
    <Link className={cn(base, variants[variant], sizing, className)} {...props}>
      <span className="shrink-0">{children}</span>
    </Link>
  )
}
