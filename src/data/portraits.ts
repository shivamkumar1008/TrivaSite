import type { Portrait } from "@/types"

export const growthPortraits: Portrait[] = [
  {
    image: "1560250097-0b93528c311a",
    title: "For the bold thinkers.",
    caption: "Turning an idea into a business",
  },
  {
    image: "1506863530036-1efeddceb993",
    title: "For the next generation.",
    caption: "Building something that matters",
  },
  {
    image: "1624797432677-6f803a98acb3",
    title: "For the change-makers.",
    caption: "Finding a better way forward",
  },
  {
    image: "1631377307692-36a9b6ae3ef6",
    title: "For the ambitious.",
    caption: "Ready for the next chapter",
  },
  {
    image: "1676989880361-091e12efc056",
    title: "For the possibility-seekers.",
    caption: "Growing beyond expectations",
  },
]

export const unsplashUrl = (id: string, width: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=85`
