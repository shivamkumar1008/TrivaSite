import { mernIcons } from "@/data/technologies"
import type { Technology } from "@/types"

export default function TechnologyLogo({ name, slug }: Technology) {
  return (
    <>
      {slug === "mern" ? (
        <span className="mern-symbol" aria-hidden="true">
          {mernIcons.map((icon) => (
            <img key={icon} src={`/tech/${icon}.svg`} alt="" />
          ))}
        </span>
      ) : slug === "rest" ? (
        <span className="rest-symbol" aria-hidden="true">
          {"{ / }"}
        </span>
      ) : (
        <img src={`/tech/${slug}.svg`} alt="" />
      )}
      <span>{name}</span>
    </>
  )
}
