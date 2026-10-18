import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTrack(track: string): string {
  return track.charAt(0).toUpperCase() + track.slice(1);
}
