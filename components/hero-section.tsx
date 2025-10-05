import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image src="/ancient-open-book-on-dark-background.jpg" alt="Background" fill className="object-cover opacity-30" priority />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
            Quan Điểm Về Triết Học Trừu Tượng
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto text-pretty">
            Khoa học cho chúng ta tri thức, nhưng chỉ triết học mới có thể cho chúng ta sự thông thái.
          </p>
        </div>
      </div>
    </section>
  )
}
