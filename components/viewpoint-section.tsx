import Image from "next/image";
import { ImageCarousel } from "@/components/ui/image-carousel";

interface ViewpointSectionProps {
  number: number;
  title: string;
  summary: string;
  content: string[];
  examples?: string[];
  conclusion?: string;
  sources?: string[];
  imageUrl: string;
  imageAlt: string;
  images?: string[];
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
  images,
}: ViewpointSectionProps) {
  return (
    <section id="viewpoint" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Image Carousel */}
          {images && images.length > 1 ? (
            <ImageCarousel
              images={images}
              alt={imageAlt}
              autoPlay={true}
              autoPlayInterval={5000}
              className="w-full"
            />
          ) : (
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={
                  images && images.length === 1
                    ? images[0]
                    : imageUrl || "/placeholder.svg"
                }
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Right Column - Content */}
          <div className="space-y-6">
            {/* Main Content Block */}
            <div className="bg-orange-50/80 backdrop-blur-sm rounded-xl p-6 border border-orange-200/50 shadow-sm">
              <div className="text-sm text-primary font-semibold mb-2">
                Quan điểm {number}
              </div>
              <h2 className="text-3xl font-bold text-primary mb-6 uppercase">
                {title}
              </h2>

              <div className="space-y-4 text-foreground leading-relaxed">
                {content.map((paragraph, index) => (
                  <p
                    key={index}
                    className={
                      paragraph.includes("VÍ DỤ:")
                        ? "text-muted-foreground italic"
                        : ""
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {examples && examples.length > 0 && (
                <div className="mt-6 space-y-3">
                  {examples.map((example, index) => (
                    <div
                      key={index}
                      className="pl-4 border-l-2 border-primary/50"
                    >
                      <p className="text-muted-foreground italic text-sm leading-relaxed">
                        {example}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary Block */}
            <div className="bg-orange-50/60 backdrop-blur-sm rounded-xl p-6 border border-orange-200/40 shadow-sm">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                TÓM TẮT
              </h3>
              <p className="text-muted-foreground leading-relaxed">{summary}</p>
              {conclusion && (
                <p className="text-muted-foreground leading-relaxed mt-4">
                  {conclusion}
                </p>
              )}
            </div>

            {/* Sources Block */}
            {sources && sources.length > 0 && (
              <div className="bg-orange-50/40 backdrop-blur-sm rounded-xl p-6 border border-orange-200/30 shadow-sm">
                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center">
                  <span className="w-2 h-2 bg-orange-300 rounded-full mr-3"></span>
                  Nguồn tham khảo
                </h4>
                <ul className="space-y-2">
                  {sources.map((source, index) => (
                    <li
                      key={index}
                      className="text-xs text-muted-foreground leading-relaxed pl-4 border-l border-orange-200/50"
                    >
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
  );
}
