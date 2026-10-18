import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/** Same class merging as astraui's `cn`, safe to use in server components. */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
