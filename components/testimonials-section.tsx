import { TestimonialCard } from "./testimonial-card"

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <TestimonialCard
            name="Thanh Đoàn"
            icon="😊"
            content="Sartre xây dựng luận điểm này khi bàn về cũng thực tồn hiện hữu trước bản chất và bản chất là gì phải do con người tự quyết định. Mỗi người đều có quyền tự do lựa chọn và hành động, nhưng đồng thời phải chịu trách nhiệm cho những lựa chọn đó. Mỗi người bản thân chúc ta nghĩa hiện sinh là tự do và tự do là bản chất của con người."
          />
          <TestimonialCard
            name="Việt Anh"
            icon="🤔"
            content="Những khoảnh khắc tĩnh lặng này xây dựng con người cảm thấy sợ hãi vì sự tự do của mình. Sartre muốn ta cho ý rằng trong vĩ trí đó, chỉ chính bản thân mỗi người mới là kẻ đó chịu đựng của chúa khác của họ."
          />
        </div>

      </div>
    </section>
  )
}
