import Image from "next/image"

interface ViewpointSectionProps {
  number: number
  title: string
  summary: string
  content: string[]
  examples?: string[]
  conclusion?: string
  sources?: string[]
  imageUrl: string
  imageAlt: string
}

export function ViewpointSection({
  number,
  title,
  summary,
  content,
  examples,
  conclusion,
  sources,
  imageUrl,
  imageAlt,
}: ViewpointSectionProps) {
  return (
    <section id={`quan-diem-${number}`} className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image src={imageUrl || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" />
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <div className="text-sm text-primary font-semibold mb-2">Quan điểm {number}</div>
              <h2 className="text-3xl font-bold text-primary mb-6 uppercase">{title}</h2>

              <div className="space-y-4 text-foreground leading-relaxed">
                {content.map((paragraph, index) => (
                  <p key={index} className={paragraph.includes("VÍ DỤ:") ? "text-muted-foreground italic" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {examples && examples.length > 0 && (
                <div className="mt-6 space-y-3">
                  {examples.map((example, index) => (
                    <div key={index} className="pl-4 border-l-2 border-primary/50">
                      <p className="text-muted-foreground italic text-sm leading-relaxed">{example}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-xl font-bold text-foreground mb-4">TÓM TẮT</h3>
              <p className="text-muted-foreground leading-relaxed">{summary}</p>
              {conclusion && <p className="text-muted-foreground leading-relaxed mt-4">{conclusion}</p>}
            </div>

            {sources && sources.length > 0 && (
              <div className="border-t border-border pt-6">
                <h4 className="text-sm font-bold text-foreground mb-3">Nguồn:</h4>
                <ul className="space-y-1">
                  {sources.map((source, index) => (
                    <li key={index} className="text-xs text-muted-foreground leading-relaxed">
                      {index + 1}. {source}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
