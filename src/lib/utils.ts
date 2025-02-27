import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleWatch = ({
  type,
  slug,
  episode,
}: {
  type: "movies" | "series";
  slug: string;
  episode?: string;
}): string => {
  return `/${type}/${slug}${episode ? `/episodes/${episode}` : ""}`;
};
