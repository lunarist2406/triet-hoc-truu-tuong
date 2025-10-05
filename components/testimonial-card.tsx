import { Card } from "@/components/ui/card"

interface TestimonialCardProps {
  name: string
  content: string
  icon?: string
}

export function TestimonialCard({ name, content, icon = "👤" }: TestimonialCardProps) {
  return (
    <Card className="bg-primary/10 border-primary/20 p-6 rounded-lg">
      <div className="flex items-start gap-3 mb-4">
        <div className="text-2xl">{icon}</div>
        <h3 className="text-lg font-bold text-primary">{name}</h3>
      </div>
      <p className="text-foreground leading-relaxed text-sm">{content}</p>
    </Card>
  )
}
