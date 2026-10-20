/**
 * Renders Schema.org JSON-LD. Several schemas are combined into one `@graph` so a page
 * emits a single script tag. Nothing is rendered visually.
 */
export default function JsonLd({ schemas }: { schemas: object[] }) {
  const graph = { "@context": "https://schema.org", "@graph": schemas }
  return (
    <script
      type="application/ld+json"
      // JSON.stringify can't produce "</script>"; the "<" escape guards against a stray
      // "<!--" in any data field breaking out of the script element.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  )
}
