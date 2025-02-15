import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isOdd = (n: number) => n % 2 === 1;

export const isEven = (n: number) => n % 2 === 0;