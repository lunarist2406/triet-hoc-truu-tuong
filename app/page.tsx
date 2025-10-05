"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ViewpointSection } from "@/components/viewpoint-section";
import { CommentSystem } from "@/components/comment-system";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/ui/page-transition";
import { AIPhilosophyChat } from "@/components/ai-philosophy-chat";

export default function Home() {
  const [activeViewpoint, setActiveViewpoint] = useState(1);

  // Listen for viewpoint change events from footer
  useEffect(() => {
    const handleViewpointChange = (event: CustomEvent) => {
      setActiveViewpoint(event.detail);
    };

    window.addEventListener(
      "changeViewpoint",
      handleViewpointChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "changeViewpoint",
        handleViewpointChange as EventListener
      );
    };
  }, []);

  const viewpoint1Data = {
    number: 1,
    title: "Con người bị kết án phải tự do",
    summary:
      'Câu nói "Con người bị kết án phải tự do" là của triết gia hiện sinh người Pháp Jean-Paul Sartre, xuất phát từ tác phẩm "Tồn tại và hư vô".',
    content: [
      "Sartre cho rằng, CON NGƯỜI HIỆN SINH LÀ CON NGƯỜI DẤN THÂN.",
      "Con người dấn thân là một phạm trù cơ bản trong quan niệm về con người hiện sinh của Sartre. Con người lúc đầu là hư vô, 'bị quẳng vào thế giới', bắt đầu sự hiện hữu của mình bằng một loạt những 'dự phóng' để lựa chọn và xây dựng ý nghĩa cuộc đời của mình.",
      'Con người hiện sinh thì tự do lựa chọn, "tự do quyết định những gì mà con người sẽ là". Cuộc sống của con người hiện sinh không bị lệ thuộc vào bất cứ ai, bất cứ điều gì, bởi "trên thực tế, mọi sự như thế nào là do con người quyết định"',
      "VÍ DỤ: Khi bạn đứng trước sự lựa chọn giữa việc được làm công việc đúng với đam mê của mình nhưng không đem lại được thu nhập tốt và việc bạn làm một công việc mà bạn không hề có hứng thú nhưng nó lại đem tới thu nhập cao cho bạn.",
      "=> Bạn có thể thấy rằng việc chúng ta đưa ra lựa chọn nó hoàn toàn là sự tự do, nhưng chúng ta sẽ phải chịu trách nhiệm trước những sự lựa chọn của mình. => Bị kết án, bởi vì chúng ta không tự tạo ra mình, nhưng dù sao vẫn tự do, và ngay từ lúc bị ném vào thế giới này, chúng ta phải chịu trách nhiệm cho mọi việc mình làm.",
      'Người hiện sinh không chối bỏ lựa chọn, không chối bỏ "dấn thân" [Dấn thân là hành động chủ động, dũng cảm lao vào một công việc, hoạt động hay thử thách, dù biết trước sẽ gặp nhiều khó khăn, nguy hiểm hay gian nan, mà không sợ hãi, không lùi bước], càng không đổ lỗi cho hoàn cảnh khách quan bên ngoài tác động.',
      'Con người hiện sinh là con người hành động, "số phận con người là trong bản thân con người". Số phận con người hiện sinh được tạo nên từ trong hành động của mỗi người hiện sinh.',
    ],
    examples: [
      "Chúng ta được sinh ra trong một gia đình không giàu có và bố mẹ chúng ta là những người không được học hành sách vở đủ đầy, việc chúng ta lựa chọn mình trở thành con người như thế nào sẽ quyết định số phận của chúng ta chứ không phải vì hoàn cảnh chúng ta như thế là số phận của chúng ta đã được định đoạt như vậy.",
    ],
    conclusion:
      'Theo Jean-Paul Sartre, "con người bị kết án phải tự do", nghĩa là từ khi hiện hữu, con người phải tự chịu trách nhiệm với mọi lựa chọn và hành động của mình. Con người hiện sinh là con người dấn thân, tự do quyết định bản thân qua "dự phóng" và hành động, không đổ lỗi cho hoàn cảnh. Số phận vì thế không định sẵn, mà do chính con người kiến tạo qua sự lựa chọn và trách nhiệm cá nhân.',
    sources: [
      "Trần Thái Đỉnh (2005), Triết học hiện sinh, Nxb Văn học, Hà Nội.",
      "Nguyễn Hào Hải (2001), Một số học thuyết triết học phương Tây hiện đại, Nxb Văn hoá - Thông tin, Hà Nội.",
      "Đỗ Minh Hợp (chủ biên), Trần Thị Điểu, Nguyễn Thị Như Huế, Phạm Thanh Tùng (2010), Triết học hiện sinh, Nxb Tôn giáo, Hà Nội.",
      "J.P. Sartre (2008), Buồn nôn, Phùng Thăng (dịch), Nxb Văn hóa Sài Gòn, Tp. Hồ Chí Minh.",
      "J.P. Sartre (2015), Thuyết hiện sinh là một thuyết nhân bản, Đinh Hồng Phúc (dịch), Nxb Tri thức, Hà Nội.",
    ],
    imageUrl: "/classical-philosophers-discussing-freedom.jpg",
    imageAlt: "Triết gia cổ điển thảo luận về tự do",
    images: [
      "/classical-philosophers-discussing-freedom.jpg",
      "/classical-philosophers-plato-and-aristotle-paintin.jpg",
      "/ancient-open-book-on-dark-background.jpg",
    ],
  };

  const viewpoint2Data = {
    number: 2,
    title: "Con người hiện sinh là con người tha nhân",
    summary:
      "Sartre cho rằng, CON NGƯỜI HIỆN SINH LÀ CON NGƯỜI THA NHÂN. 'Tha nhân' đơn giản là người khác, kẻ khác. Trong triết học, các nhà triết học hiện sinh cho rằng 'tha nhân - người khác' đóng vai trò quan trọng trong việc định hình bản thân chúng ta.",
    content: [
      "Chúng ta ý thức được sự tồn tại của mình thông qua mối quan hệ với 'tha nhân - người khác', và những hành động của chúng ta cũng được định hướng bởi cái nhìn của 'tha nhân - người khác' về chúng ta.",
      "Chính vì trong cuộc sống của chúng ta gắn liền với sự xuất hiện của tha nhân đã dẫn đến việc tha hóa con người.",
      "Tha hóa là một khái niệm chỉ sự vận động, thay đổi của đối tượng theo chiều hướng trái ngược với bản chất của mình. Thuật ngữ tha hóa theo nghĩa Hán Việt có nghĩa là biến đổi theo chiều hướng sai lầm.",
      "Theo C.Mác thực chất của lao động bị tha hóa là quá trình lao động và sản phẩm lao động từ chỗ để phục vụ và phát triển con người đã bị biến thành lực lượng đối lập, nô dịch và thống trị con người.",
      "=> Con người bị tha hóa là con người đánh mất mình trong lao động, tức là khi thực hiện chức năng đặc trưng, cao quý của con người thì họ chỉ như là con vật.",
      "VÍ DỤ - Trong lao động: Người lao động bị máy móc thay thế: Trong xã hội công nghiệp, sự phát triển của máy móc hiện đại khiến người công nhân trở thành một phần của máy móc, chỉ lặp đi lặp lại một công đoạn đơn giản như một cỗ máy để hoàn thành nhiệm vụ, mất đi sự sáng tạo và chủ động trong công việc.",
      "VÍ DỤ - Trong cuộc sống và đạo đức: Biến chất về đạo đức: Các cá nhân đánh mất các chuẩn mực đạo đức, lối sống lành mạnh, bị chi phối bởi những yếu tố tiêu cực, dẫn đến hành vi lệch chuẩn và suy đồi (ví dụ như trường hợp của Phúc XO, Khá Bảnh).",
    ],
    conclusion:
      "Sartre cho rằng con người hiện sinh là con người tha nhân vì ta nhận thức và tồn tại trong mối quan hệ với người khác. Tuy nhiên, sự lệ thuộc này dễ dẫn đến tha hóa: con người bị biến đổi tiêu cực, đánh mất bản chất vốn có. Theo C. Mác, tha hóa thể hiện rõ trong lao động khi con người trở thành công cụ, và trong đời sống khi đạo đức, nhân cách suy đồi. Nguyên nhân sâu xa bắt nguồn từ phân công lao động và chế độ tư hữu, khiến con người mất đi tính sáng tạo và chủ động.",
    sources: [
      "Trần Thái Đỉnh (2005), Triết học hiện sinh, Nxb Văn học, Hà Nội.",
      "Nguyễn Hào Hải (2001), Một số học thuyết triết học phương Tây hiện đại, Nxb Văn hoá - Thông tin, Hà Nội.",
      "Đỗ Minh Hợp (chủ biên), Trần Thị Điểu, Nguyễn Thị Như Huế, Phạm Thanh Tùng (2010), Triết học hiện sinh, Nxb Tôn giáo, Hà Nội.",
      "J.P. Sartre (2008), Buồn nôn, Phùng Thăng (dịch), Nxb Văn hóa Sài Gòn, Tp. Hồ Chí Minh.",
      "J.P. Sartre (2015), Thuyết hiện sinh là một thuyết nhân bản, Đinh Hồng Phúc (dịch), Nxb Tri thức, Hà Nội.",
    ],
    imageUrl: "/industrial-workers-and-alienation-concept.jpg",
    imageAlt: "Khái niệm tha hóa trong lao động",
    images: ["/industrial-workers-and-alienation-concept.jpg"],
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        activeViewpoint={activeViewpoint}
        onViewpointChange={setActiveViewpoint}
      />
      <HeroSection />

      <PageTransition>
        {activeViewpoint === 1 ? (
          <>
            <ViewpointSection {...viewpoint1Data} />
            <CommentSystem viewpointId={1} />
          </>
        ) : (
          <>
            <ViewpointSection {...viewpoint2Data} />
            <CommentSystem viewpointId={2} />
          </>
        )}
      </PageTransition>

      <Footer />

      {/* AI Chat Widget */}
      <AIPhilosophyChat />
    </div>
  );
}
