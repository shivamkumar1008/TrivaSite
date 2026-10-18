type QuickIconName = "web" | "mobile" | "ai" | "automation" | "cloud" | "data" | "design" | "security" | "support" | "marketing" | "chat"

const paths: Record<QuickIconName, string> = {
  web: "M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-13ZM3 9h18M6 6.5h.01M8.5 6.5h.01",
  mobile: "M8 3h8a1.5 1.5 0 0 1 1.5 1.5v15A1.5 1.5 0 0 1 16 21H8a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 8 3ZM11 18h2",
  ai: "M12 3.5 13.6 8.4 18.5 10 13.6 11.6 12 16.5 10.4 11.6 5.5 10 10.4 8.4 12 3.5ZM18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z",
  automation: "M4 12a8 8 0 0 1 13.7-5.6M20 12a8 8 0 0 1-13.7 5.6M17.5 3v3.5H14M6.5 21v-3.5H10",
  cloud: "M7 18.5a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4.5 4.5 0 0 1-.5 9H7Z",
  data: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  design: "M4 20l4-1 10.5-10.5a2.12 2.12 0 0 0-3-3L5 16l-1 4ZM13.5 7.5l3 3",
  security: "M7.5 11V8a4.5 4.5 0 0 1 9 0v3M6 11h12a1.5 1.5 0 0 1 1.5 1.5v6A1.5 1.5 0 0 1 18 20H6a1.5 1.5 0 0 1-1.5-1.5v-6A1.5 1.5 0 0 1 6 11ZM12 14.5v2.5",
  support: "M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17ZM12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM6 6l3.5 3.5M14.5 14.5 18 18M18 6l-3.5 3.5M9.5 14.5 6 18",
  marketing: "M3.5 10v4a1 1 0 0 0 1 1H7l7 4.5v-15L7 9H4.5a1 1 0 0 0-1 1ZM17.5 9a4 4 0 0 1 0 6M8 15l1.2 4.5",
  chat: "M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-5 4V5.5Z",
}

/** Small line icons for the hero quick links. */
export default function QuickIcon({ name }: { name: QuickIconName }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" className="quick-icon">
      <path d={paths[name]} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
