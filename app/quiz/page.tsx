"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Chủ nghĩa thực dụng xuất phát từ quốc gia nào?",
    options: ["Anh", "Pháp", "Mỹ", "Trung Quốc"],
    correctAnswer: 2,
    explanation:
      "Chủ nghĩa thực dụng (Pragmatism) xuất phát từ Mỹ, được phát triển bởi các triết gia như Charles Sanders Peirce, William James và John Dewey.",
  },
  {
    id: 2,
    question: "Hoạt động sản xuất đầu tiên của con người là gì?",
    options: [
      "Săn bắt, hái lượm",
      "Săn bắn, nấu chín thức ăn",
      "Làm đồ trang sức bằng đá",
      "Trồng trọt và chăn nuôi",
    ],
    correctAnswer: 3,
    explanation:
      "Trồng trọt và chăn nuôi là hoạt động sản xuất đầu tiên của con người, đánh dấu sự chuyển từ kinh tế hái lượm sang kinh tế sản xuất.",
  },
  {
    id: 3,
    question: "Quan điểm về Tam tòng của trường phái Nho giáo là gì?",
    options: [
      "Tề gia, trị quốc, bình thiên hạ",
      "Tại gia tòng phụ, xuất giá tòng phu, phụ tử tòng tử",
      "Vua – Tôi, Cha – Con, Chồng – Vợ",
      "Tài – Trí – Đức",
    ],
    correctAnswer: 1,
    explanation:
      "Tam tòng trong Nho giáo là: Tại gia tòng phụ (ở nhà theo cha), xuất giá tòng phu (lấy chồng theo chồng), phụ tử tòng tử (chồng chết theo con).",
  },
  {
    id: 4,
    question:
      'Trong kho tàng ca dao tục ngữ có câu "Tre già măng mọc", câu ca dao tục ngữ trên nói đến quy luật nào của phép biện chứng duy vật?',
    options: [
      "Quy luật về mối liên hệ phổ biến",
      "Quy luật lượng chất",
      "Quy luật mâu thuẫn",
      "Quy luật phủ định của phủ định",
    ],
    correctAnswer: 3,
    explanation:
      'Câu "Tre già măng mọc" thể hiện quy luật phủ định của phủ định - cái cũ bị phủ định bởi cái mới, nhưng cái mới lại chứa đựng những yếu tố tích cực của cái cũ.',
  },
  {
    id: 5,
    question: "Đâu không phải là bộ phận cấu thành chủ nghĩa Mác – Lênin?",
    options: [
      "Bộ phận lí luận triết học",
      "Bộ phận lí luận kinh tế - chính trị",
      "Bộ phận lí luận chủ nghĩa xã hội khoa học",
      "Bộ phận lí luận chủ nghĩa cộng sản",
    ],
    correctAnswer: 3,
    explanation:
      "Chủ nghĩa Mác-Lênin gồm 3 bộ phận: Triết học Mác-Lênin, Kinh tế chính trị Mác-Lênin, và Chủ nghĩa xã hội khoa học. Không có bộ phận lí luận chủ nghĩa cộng sản.",
  },
  {
    id: 6,
    question: "Lửa theo quan điểm của Heraclitus (Hercalit) là gì?",
    options: ["Lửa trời", "Lửa thần", "Lửa Tiên", "Lửa Thiêng"],
    correctAnswer: 3,
    explanation:
      'Theo Heraclitus, lửa là nguyên tố cơ bản của vũ trụ, là "Lửa Thiêng" - nguyên lý vận động và biến đổi của mọi sự vật.',
  },
  {
    id: 7,
    question: 'Luật "Công xưởng nhân tạo" là của ai?',
    options: ["Phuriê", "Lênin", "Ooen", "Hegel"],
    correctAnswer: 2,
    explanation:
      'Robert Owen là người đề xuất "Công xưởng nhân tạo" - một mô hình xã hội chủ nghĩa không tưởng trong thế kỷ 19.',
  },
  {
    id: 8,
    question: 'Tác phẩm "Biện chứng của tự nhiên" do ai viết ra?',
    options: ["Mác và Ăngghen", "Ăngghen", "Lênin", "Hồ Chí Minh"],
    correctAnswer: 1,
    explanation:
      'Tác phẩm "Biện chứng của tự nhiên" được viết bởi Friedrich Engels (Ăngghen), là một trong những tác phẩm quan trọng của chủ nghĩa Mác.',
  },
  {
    id: 9,
    question: "Tư tưởng Lênin ra đời trong giai đoạn nào?",
    options: [
      "Chủ nghĩa tư bản giai đoạn tư bản độc quyền",
      "Chủ nghĩa tư bản giai đoạn cách mạng lật đổ",
      "Chủ nghĩa tư bản giai đoạn rụi tàn",
      "Chủ nghĩa tư bản giai đoạn tự do cạnh tranh",
    ],
    correctAnswer: 0,
    explanation:
      "Tư tưởng Lênin ra đời trong giai đoạn chủ nghĩa tư bản chuyển sang giai đoạn đế quốc chủ nghĩa (tư bản độc quyền), cuối thế kỷ 19 đầu thế kỷ 20.",
  },
  {
    id: 10,
    question: "Cách mạng tháng 10 Nga diễn ra vào thời gian nào?",
    options: ["10/1917", "11/1917", "12/1917", "1/1918"],
    correctAnswer: 1,
    explanation:
      "Cách mạng tháng 10 Nga diễn ra vào tháng 11/1917 (theo lịch Gregorian), đánh dấu sự thành lập nhà nước Xô viết đầu tiên trên thế giới.",
  },
  {
    id: 11,
    question: "Nhận định nào sau đây không đúng về thế giới quan tôn giáo?",
    options: [
      "Bắt buộc người theo tôn giáo phải tin",
      "Giáo dục đạo đức, hướng con người đến cái thiện",
      "Ảnh hưởng vượt ngoài khuôn khổ quốc gia, dân tộc",
      "Được chứng thực bởi cuộc sống thường ngày",
    ],
    correctAnswer: 3,
    explanation:
      "Thế giới quan tôn giáo dựa trên niềm tin vào thần linh, không được chứng thực bởi cuộc sống thường ngày mà dựa trên đức tin.",
  },
  {
    id: 12,
    question:
      'Trong kho tàng ca dao tục ngữ có câu "Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao", câu ca dao tục ngữ trên nói đến quy luật nào của phép biện chứng duy vật?',
    options: [
      "Quy luật về mối liên hệ phổ biến",
      "Quy luật lượng – chất",
      "Quy luật mâu thuẫn",
      "Quy luật phủ định của phủ định",
    ],
    correctAnswer: 1,
    explanation:
      "Câu ca dao này thể hiện quy luật lượng - chất: sự thay đổi về lượng (từ 1 cây thành 3 cây) dẫn đến sự thay đổi về chất (từ không thành non thành hòn núi cao).",
  },
  {
    id: 13,
    question: "Chủ nghĩa kinh viện phát triển ở thời kì triết học nào?",
    options: [
      "Triết học Hy Lạp – La Mã cổ đại",
      "Triết học Tây Âu trung cổ",
      "Triết học cổ điển Đức",
      "Triết học phương Tây hiện đại",
    ],
    correctAnswer: 1,
    explanation:
      "Chủ nghĩa kinh viện (Scholasticism) phát triển mạnh mẽ trong triết học Tây Âu trung cổ, đặc biệt từ thế kỷ 11-14.",
  },
  {
    id: 14,
    question:
      "Học thuyết ngũ hành cho rằng thế giới bắt nguồn từ những yếu tố nào?",
    options: [
      "Kim – Thuỷ – Mộc – Hoả – Thổ",
      "Kim – Mộc – Thuỷ – Hoả – Thổ",
      "Thổ – Thuỷ – Mộc – Hoả – Kim",
      "Thuỷ – Thổ – Kim – Mộc – Hoả",
    ],
    correctAnswer: 0,
    explanation:
      "Học thuyết ngũ hành trong triết học Trung Hoa cho rằng thế giới được tạo thành từ 5 yếu tố: Kim, Thủy, Mộc, Hỏa, Thổ.",
  },
  {
    id: 15,
    question:
      "Nhận định nào sau đây không đúng về định nghĩa vật chất của Lênin?",
    options: [
      "Vật chất là khái niệm rất rộng, rất bao quát về toàn bộ sự vật hiện tượng trong thế giới khách quan",
      "Tất cả các sự vật đều là vật chất",
      "Con người hoàn toàn có khả năng nhận biết được thế giới vật chất",
      "Vật chất tồn tại một cách khách quan",
    ],
    correctAnswer: 1,
    explanation:
      "Theo định nghĩa của Lênin, không phải tất cả các sự vật đều là vật chất. Vật chất là phạm trù triết học chỉ thực tại khách quan được đem lại cho con người trong cảm giác.",
  },
  {
    id: 16,
    question:
      'Quan điểm "Vận động của tự nhiên và lịch sử là sự tha hoá tự sự tự vận động của ý niệm tuyệt đối" thuộc lập trường triết học nào?',
    options: [
      "Chủ nghĩa duy vật",
      "Chủ nghĩa duy tâm chủ quan",
      "Chủ nghĩa duy tâm khách quan",
      "Chủ nghĩa nhị nguyên triết học",
    ],
    correctAnswer: 2,
    explanation:
      "Quan điểm này thuộc chủ nghĩa duy tâm khách quan của Hegel, cho rằng ý niệm tuyệt đối là cơ sở của mọi tồn tại và vận động.",
  },
  {
    id: 17,
    question: "Nhận thức cảm tính được thực hiện dưới các hình thức nào?",
    options: [
      "Kiểm nghiệm thực tiễn",
      "Cảm giác, tri giác và khái niệm",
      "Cảm giác, tri giác và biểu tượng",
      "Khái niệm, phán đoán và suy luận",
    ],
    correctAnswer: 2,
    explanation:
      "Nhận thức cảm tính bao gồm: cảm giác (phản ánh từng thuộc tính riêng lẻ), tri giác (phản ánh toàn bộ sự vật), và biểu tượng (hình ảnh của sự vật trong trí nhớ).",
  },
  {
    id: 18,
    question:
      "Tác phẩm nào được coi là đánh dấu sự chín muồi của chủ nghĩa duy vật về lịch sử?",
    options: [
      "Hệ tư tưởng Đức",
      "Bản thảo kinh tế triết học 1844",
      "Sự khốn cùng của triết học",
      "Luận cương về Phoiobach",
    ],
    correctAnswer: 0,
    explanation:
      'Tác phẩm "Hệ tư tưởng Đức" (1845-1846) của Mác và Engels được coi là đánh dấu sự chín muồi của chủ nghĩa duy vật lịch sử.',
  },
  {
    id: 19,
    question: "Đâu là nguồn gốc tự nhiên của ý thức?",
    options: [
      "Lao động",
      "Ngôn ngữ",
      "Con người",
      "Bộ não và thế giới khách quan",
    ],
    correctAnswer: 3,
    explanation:
      "Nguồn gốc tự nhiên của ý thức là bộ não (cơ quan vật chất) và thế giới khách quan (đối tượng phản ánh).",
  },
  {
    id: 20,
    question: "Phật giáo là mang tư tưởng triết học theo trường phái nào?",
    options: [
      "Chủ nghĩa duy tâm",
      "Chủ nghĩa duy vật",
      "Tôn giáo cực đoan",
      "Chủ nghĩa hoài nghi",
    ],
    correctAnswer: 1,
    explanation:
      "Phật giáo mang tư tưởng triết học duy vật, phủ nhận sự tồn tại của Thượng đế và cho rằng mọi sự vật đều do nhân duyên tạo thành.",
  },
  {
    id: 21,
    question:
      "Quy luật nào của phép biện chứng duy vật nói lên cách thức của sự phát triển?",
    options: [
      "Quy luật về sự phát triển",
      "Quy luật lượng – chất",
      "Quy luật mâu thuẫn",
      "Quy luật phủ định của phủ định",
    ],
    correctAnswer: 1,
    explanation:
      "Quy luật lượng - chất nói lên cách thức của sự phát triển: sự thay đổi về lượng dẫn đến sự thay đổi về chất.",
  },
  {
    id: 22,
    question:
      "Giai đoạn con người tổng hợp thông tin trọn vẹn về sự vật hiện tượng là gì?",
    options: ["Cảm giác", "Tri giác", "Biểu tượng", "Chân lí"],
    correctAnswer: 1,
    explanation:
      "Tri giác là giai đoạn con người tổng hợp thông tin trọn vẹn về sự vật hiện tượng, tạo ra hình ảnh hoàn chỉnh của đối tượng.",
  },
  {
    id: 23,
    question:
      "Trong các cặp khái niệm dưới đây, cặp nào (có thể) là quan hệ nhân quả?",
    options: ["Đông – Tây", "Nghèo – Dốt", "Xuân – Hạ", "Ngày – Đêm"],
    correctAnswer: 1,
    explanation:
      'Cặp "Nghèo – Dốt" có thể có quan hệ nhân quả: nghèo có thể dẫn đến dốt (thiếu điều kiện học tập) hoặc dốt có thể dẫn đến nghèo (thiếu kiến thức để phát triển).',
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setShowResult(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80)
      return "Xuất sắc! Bạn đã hiểu rất tốt về triết học hiện sinh.";
    if (percentage >= 60) return "Tốt! Bạn đã nắm được những kiến thức cơ bản.";
    return "Cần cố gắng thêm! Hãy đọc lại nội dung và thử lại.";
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 z-0">
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundImage: [
                "url('/classical-philosophers-discussing-freedom.jpg')",
                "url('/classical-philosophers-plato-and-aristotle-paintin.jpg')",
                "url('/ancient-open-book-on-dark-background.jpg')",
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "blur(8px) brightness(0.3)",
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-slate-900/40 to-yellow-900/30" />
          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => {
              // Fixed positions to avoid hydration mismatch
              const positions = [
                { left: 10, top: 20 },
                { left: 25, top: 15 },
                { left: 40, top: 30 },
                { left: 60, top: 10 },
                { left: 75, top: 25 },
                { left: 85, top: 40 },
                { left: 15, top: 60 },
                { left: 30, top: 75 },
                { left: 50, top: 80 },
                { left: 70, top: 65 },
                { left: 90, top: 70 },
                { left: 5, top: 45 },
                { left: 35, top: 50 },
                { left: 55, top: 35 },
                { left: 80, top: 55 },
                { left: 20, top: 85 },
                { left: 45, top: 5 },
                { left: 65, top: 90 },
                { left: 95, top: 15 },
                { left: 12, top: 35 },
              ];
              const pos = positions[i] || { left: 50, top: 50 };

              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-orange-400/20 rounded-full"
                  animate={{
                    x: [0, 100, 0],
                    y: [0, -100, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 8 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                  }}
                />
              );
            })}
          </div>
        </div>

        <Header activeViewpoint={1} onViewpointChange={() => {}} />

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="bg-gradient-to-br from-orange-50/90 to-yellow-50/90 border-orange-200 backdrop-blur-sm shadow-2xl">
              <CardHeader>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="mx-auto mb-4"
                >
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center ${
                      (score / questions.length) * 100 >= 60
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    {(score / questions.length) * 100 >= 60 ? (
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    ) : (
                      <XCircle className="w-10 h-10 text-red-600" />
                    )}
                  </div>
                </motion.div>

                <CardTitle className="text-3xl font-bold text-primary mb-2">
                  Kết Quả Trắc Nghiệm
                </CardTitle>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className={`text-4xl font-bold ${getScoreColor()}`}
                >
                  {score}/{questions.length}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-lg text-muted-foreground mt-4"
                >
                  {getScoreMessage()}
                </motion.p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={handleRestartQuiz}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Làm Lại
                  </Button>

                  <Button asChild>
                    <Link href="/" className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Về Trang Chủ
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundImage: [
              "url('/classical-philosophers-discussing-freedom.jpg')",
              "url('/classical-philosophers-plato-and-aristotle-paintin.jpg')",
              "url('/ancient-open-book-on-dark-background.jpg')",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(8px) brightness(0.3)",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-slate-900/40 to-yellow-900/30" />
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => {
            // Fixed positions to avoid hydration mismatch
            const positions = [
              { left: 10, top: 20 },
              { left: 25, top: 15 },
              { left: 40, top: 30 },
              { left: 60, top: 10 },
              { left: 75, top: 25 },
              { left: 85, top: 40 },
              { left: 15, top: 60 },
              { left: 30, top: 75 },
              { left: 50, top: 80 },
              { left: 70, top: 65 },
              { left: 90, top: 70 },
              { left: 5, top: 45 },
              { left: 35, top: 50 },
              { left: 55, top: 35 },
              { left: 80, top: 55 },
              { left: 20, top: 85 },
              { left: 45, top: 5 },
              { left: 65, top: 90 },
              { left: 95, top: 15 },
              { left: 12, top: 35 },
            ];
            const pos = positions[i] || { left: 50, top: 50 };

            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-orange-400/20 rounded-full"
                animate={{
                  x: [0, 100, 0],
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 8 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                }}
              />
            );
          })}
        </div>
      </div>

      <Header activeViewpoint={1} onViewpointChange={() => {}} />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Câu {currentQuestion + 1} / {questions.length}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <Card className="bg-gradient-to-br from-orange-50/90 to-yellow-50/90 border-orange-200 backdrop-blur-sm shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">
                {questions[currentQuestion].question}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      selectedAnswer === index
                        ? showResult
                          ? index === questions[currentQuestion].correctAnswer
                            ? "border-green-500 bg-green-50 text-green-800"
                            : "border-red-500 bg-red-50 text-red-800"
                          : "border-orange-500 bg-orange-50 text-orange-800"
                        : showResult &&
                          index === questions[currentQuestion].correctAnswer
                        ? "border-green-500 bg-green-50 text-green-800"
                        : "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-25"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === index
                            ? showResult
                              ? index ===
                                questions[currentQuestion].correctAnswer
                                ? "border-green-500 bg-green-500"
                                : "border-red-500 bg-red-500"
                              : "border-orange-500 bg-orange-500"
                            : showResult &&
                              index === questions[currentQuestion].correctAnswer
                            ? "border-green-500 bg-green-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedAnswer === index && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                        {showResult &&
                          index === questions[currentQuestion].correctAnswer &&
                          selectedAnswer !== index && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Giải thích:
                  </h4>
                  <p className="text-blue-700">
                    {questions[currentQuestion].explanation}
                  </p>
                </motion.div>
              )}

              <div className="flex justify-end mt-6">
                {!showResult ? (
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                  >
                    Xác Nhận
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                  >
                    {currentQuestion < questions.length - 1
                      ? "Câu Tiếp Theo"
                      : "Xem Kết Quả"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
