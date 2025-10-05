const fs = require("fs");
const path = require("path");

// Đường dẫn đến file blogs.json
const BLOGS_FILE = path.join(process.cwd(), "data", "blogs.json");

// Dữ liệu các bài viết từ markdown files
const blogPosts = [
  {
    title: "Khái lược về triết học — Overview of philosophy",
    content: `## 1. Triết học là gì?
- **Định nghĩa khái quát**: Triết học là hệ thống tri thức lý luận chung nhất về **thế giới** và **vị trí của con người** trong thế giới đó. Triết học trả lời ba nhóm câu hỏi: *thế giới là gì* (bản thể luận), *con người có thể biết thế giới không* (nhận thức luận), và *con người nên sống thế nào* (giá trị – đạo đức).
- **Đặc trưng**: tính khái quát cao, tính hệ thống, tính phản tư – phê phán, và gắn với điều kiện lịch sử – xã hội.

## 2. Chức năng của triết học
1) **Thế giới quan**: cung cấp bức tranh tổng quát về thế giới.  
2) **Phương pháp luận**: định hướng cách tư duy và hành động khoa học.  
3) **Giá trị – nhân sinh**: định vị con người, tự do, trách nhiệm, hạnh phúc.  
4) **Dự báo – phê phán**: phát hiện mâu thuẫn, xu hướng phát triển.

## 3. Cấu trúc – ngành của triết học
- Bản thể luận, nhận thức luận, lôgic, đạo đức, mỹ học, triết học chính trị, xã hội, ngôn ngữ, khoa học, công nghệ…
- Quan hệ với khoa học chuyên ngành: triết học **không thay thế** khoa học, mà khái quát kết quả khoa học để hình thành nguyên lý – phạm trù – quy luật ở cấp độ phổ quát.

## 4. Các mô hình triết học lớn trong lịch sử (cực ngắn)
- **Duy vật / Duy tâm**; **Kinh nghiệm / Duy lý**; **Siêu hình / Biện chứng**; **Hiện tượng học / Phân tích**; **Hiện sinh / Thực dụng**…

## 5. Ý nghĩa học tập
- Nắm được các **khái niệm công cụ**: bản chất/hiện tượng, tất nhiên/ngẫu nhiên, nội dung/hình thức, nguyên nhân/kết quả, khả năng/hiện thực…
- Hình thành **thói quen tư duy biện chứng**: nhìn thấy mối liên hệ – vận động – phát triển.`,
    author: "MLN111 Study Guide",
    tags: ["Triết học", "Mác–Lênin", "MLN111", "Chương 1", "Khái niệm cơ bản"],
    readingPages: "GT 2021: 12–33",
  },
  {
    title: "Vấn đề cơ bản của triết học — Basic issues of philosophy",
    content: `## 1. Vấn đề cơ bản của triết học
- **Mặt bản thể**: mối quan hệ **vật chất – ý thức** (cái nào có trước, cái nào quyết định?).  
  - **Duy vật**: vật chất có trước, ý thức là **sản phẩm** của vật chất phát triển đến một trình độ tổ chức cao (não người).  
  - **Duy tâm**: tinh thần/ý niệm có trước, quy định tồn tại.
- **Mặt nhận thức**: con người **có khả năng nhận thức** được thế giới khách quan không?  
  - **Khả tri**: có thể biết (chân lý khách quan).  
  - **Bất khả tri/hoài nghi**: phủ nhận hoặc nghi ngờ khả năng biết.

## 2. Ý nghĩa phương pháp luận
- Khẳng định **tính khách quan** của thế giới là cơ sở để khoa học phát triển.  
- Thừa nhận **khả năng nhận thức** ⇒ đề cao thực nghiệm, kiểm chứng, tính mở của chân lý (tiệm cận).`,
    author: "MLN111 Study Guide",
    tags: ["Triết học", "Mác–Lênin", "MLN111", "Chương 1", "Vấn đề cơ bản"],
    readingPages: "33–47",
  },
  {
    title: "Biện chứng và Siêu hình — Dialectics vs. Metaphysics",
    content: `## 1. Siêu hình và Biện chứng – hai kiểu tư duy
- **Siêu hình** (metaphysical): xem sự vật **tách rời**, **bất biến**, nhấn mạnh *định danh – thuộc tính tĩnh*. Hữu ích ở mức mô tả – phân loại nhưng **bế tắc** trước biến đổi.
- **Biện chứng** (dialectical): xem sự vật trong **mối liên hệ**, **vận động**, **phát triển**; nhấn mạnh *mâu thuẫn nội tại* là nguồn gốc biến đổi.

## 2. So sánh nhanh
| Tiêu chí | Siêu hình | Biện chứng |
|---|---|---|
| Quan niệm về sự vật | Tĩnh, cô lập | Động, liên hệ |
| Nguồn gốc biến đổi | Tác động bên ngoài | Mâu thuẫn bên trong là chủ yếu |
| Phương pháp | Phân tích rời rạc | Phân tích–tổng hợp hệ thống |

## 3. Ý nghĩa
- Dùng **biện chứng** để tránh "suy luận tuyến tính", thấy *điểm ngoặt*, *lượng – chất*, *phủ định của phủ định* trong phát triển.`,
    author: "MLN111 Study Guide",
    tags: [
      "Triết học",
      "Mác–Lênin",
      "MLN111",
      "Chương 1",
      "Biện chứng",
      "Siêu hình",
    ],
    readingPages: "33–47",
  },
  {
    title:
      "Điều kiện lịch sử cho sự ra đời triết học Mác — Historical conditions",
    content: `## 1. Ba điều kiện lịch sử cho sự ra đời của triết học Mác
1) **Tiền đề kinh tế–xã hội**: Chủ nghĩa tư bản (tk. XVIII–XIX) → đại công nghiệp, mâu thuẫn giai cấp tư sản–vô sản.  
2) **Tiền đề khoa học tự nhiên**: Định luật bảo toàn–chuyển hoá năng lượng; Học thuyết tế bào; Tiến hoá Darwin ⇒ **thống nhất vật chất – vận động – phát triển**.  
3) **Tiền đề lý luận**: Kế thừa phê phán **triết học cổ điển Đức** (Hegel – biện chứng, Feuerbach – duy vật), **kinh tế chính trị học cổ điển Anh** (Smith, Ricardo) và **chủ nghĩa xã hội không tưởng Pháp** (Saint-Simon, Fourier, Owen).

## 2. Tính tất yếu lịch sử
- Khi **lực lượng sản xuất** và **đấu tranh giai cấp** đạt ngưỡng, cần một học thuyết có khả năng **giải thích khoa học** và **chỉ dẫn hành động** ⇒ triết học Mác xuất hiện.`,
    author: "MLN111 Study Guide",
    tags: [
      "Triết học",
      "Mác–Lênin",
      "MLN111",
      "Chương 1",
      "Lịch sử",
      "Điều kiện ra đời",
    ],
    readingPages: "48–95",
  },
  {
    title: "Các thời kỳ hình thành & phát triển triết học Mác — Main periods",
    content: `## Các thời kỳ hình thành & phát triển triết học Mác (rất cô đọng)
1) **Tiền Mác (1841–1844)**: từ duy tâm Hegel → phê phán → chuyển sang duy vật nhân bản (ảnh hưởng Feuerbach).  
2) **Mác trưởng thành (1844–1848)**: hình thành **chủ nghĩa duy vật lịch sử**; tác phẩm tiêu biểu: *Luận cương về Feuerbach*, *Gia đình thần thánh*, *Tuyên ngôn của ĐCS*.  
3) **Hoàn thiện (1849–1883)**: triển khai **kinh tế–chính trị** (*Tư bản*), khái quát quy luật vận động của CNTB.  
4) **Giai đoạn Ăngghen (1883–1895)**: hệ thống hoá, phổ biến, mở rộng sang **tự nhiên** (*Biện chứng của Tự nhiên*).`,
    author: "MLN111 Study Guide",
    tags: [
      "Triết học",
      "Mác–Lênin",
      "MLN111",
      "Chương 1",
      "Lịch sử",
      "Phát triển",
    ],
    readingPages: "48–95",
  },
  {
    title:
      "Thực chất & ý nghĩa cuộc cách mạng trong triết học của Mác–Ăngghen — Essence & significance",
    content: `## Thực chất cách mạng trong triết học của Mác – Ăngghen
- **Đảo "đầu xuống đất" Hegel**: giữ **hạt nhân hợp lý** của biện chứng, loại bỏ duy tâm; chuyển sang **duy vật biện chứng**.  
- Phát hiện **quy luật lịch sử – xã hội**: quan hệ sản xuất ↔ lực lượng sản xuất; cơ sở hạ tầng ↔ kiến trúc thượng tầng; đấu tranh giai cấp là động lực lịch sử.  
- Kết hợp **thế giới quan khoa học** với **phương pháp luận cách mạng** ⇒ triết học trở thành "**vũ khí tinh thần**" cho hoạt động thực tiễn.

## Ý nghĩa
- Tạo cơ sở lý luận cho nghiên cứu xã hội học, kinh tế chính trị hiện đại; xác lập vai trò **thực tiễn** trong nhận thức.`,
    author: "MLN111 Study Guide",
    tags: [
      "Triết học",
      "Mác–Lênin",
      "MLN111",
      "Chương 1",
      "Cách mạng",
      "Mác-Ăngghen",
    ],
    readingPages: "48–95",
  },
  {
    title: "Giai đoạn Lênin trong phát triển triết học Mác — Leninist stage",
    content: `## Giai đoạn Lênin
- Bổ sung – phát triển trong **thời kỳ đế quốc chủ nghĩa**: phân tích đặc điểm CNTB độc quyền, vấn đề dân tộc–thuộc địa.  
- Tác phẩm **'Chủ nghĩa duy vật và chủ nghĩa kinh nghiệm phê phán'**: bảo vệ và phát triển học thuyết nhận thức duy vật, khẳng định **tính khách quan của thế giới vật chất**; lý luận phản ánh.  
- **Lý luận đảng kiểu mới**, **cách mạng vô sản** trong điều kiện cụ thể.

## Đóng góp phương pháp
- Nhấn mạnh **tính cụ thể lịch sử**: phải xuất phát từ hoàn cảnh cụ thể để vận dụng biện chứng.`,
    author: "MLN111 Study Guide",
    tags: [
      "Triết học",
      "Mác–Lênin",
      "MLN111",
      "Chương 1",
      "Lênin",
      "Phát triển",
    ],
    readingPages: "48–95",
  },
  {
    title:
      "Đối tượng & chức năng của triết học Mác–Lênin — Objects & functions",
    content: `## Đối tượng & Chức năng
- **Đối tượng**: những quy luật vận động – phát triển chung nhất của **tự nhiên, xã hội và tư duy**.  
- **Chức năng**:  
  1) **Thế giới quan khoa học** (duy vật, lịch sử, biện chứng).  
  2) **Phương pháp luận** (nguyên tắc toàn diện, lịch sử–cụ thể, phát triển).  
  3) **Phê phán – thực tiễn** (gắn với cải biến thực tại).

## Phân biệt
- Không nghiên cứu hiện tượng riêng lẻ; triết học Mác–Lênin **khái quát** ở bình diện phổ quát – quy luật.`,
    author: "MLN111 Study Guide",
    tags: [
      "Triết học",
      "Mác–Lênin",
      "MLN111",
      "Chương 1",
      "Đối tượng",
      "Chức năng",
    ],
    readingPages: "95–115",
  },
  {
    title:
      "Vai trò của triết học Mác–Lênin trong đời sống xã hội & đổi mới ở Việt Nam — Role in society & renovation",
    content: `## Vai trò trong đời sống xã hội & đổi mới ở Việt Nam
- Cung cấp **nền tảng tư tưởng** cho đường lối phát triển; bảo đảm **định hướng XHCN**.  
- Phương pháp luận để **nhận diện mâu thuẫn**, **quản trị thay đổi**, **phát triển bền vững** (kết hợp tăng trưởng–công bằng).  
- Trong đổi mới: vận dụng nguyên tắc **lịch sử–cụ thể**, **thực tiễn là tiêu chuẩn chân lý** để vừa phát triển kinh tế thị trường, vừa bảo đảm mục tiêu XHCN.`,
    author: "MLN111 Study Guide",
    tags: [
      "Triết học",
      "Mác–Lênin",
      "MLN111",
      "Chương 1",
      "Vai trò",
      "Việt Nam",
      "Đổi mới",
    ],
    readingPages: "95–115",
  },
  {
    title:
      "Vật chất & phương thức tồn tại của vật chất — Matter & modes of existence",
    content: `## 1. Vật chất là gì?
- Theo Lênin: *"Vật chất là phạm trù triết học dùng để chỉ thực tại khách quan được đem lại cho con người trong cảm giác, được cảm giác chép lại, chụp lại, phản ánh, và tồn tại **không lệ thuộc** vào cảm giác."*
- **Thuộc tính cơ bản**: tính **khách quan**.

## 2. Phương thức tồn tại của vật chất
- **Vận động** (mọi biến đổi) — thuộc tính cố hữu; các hình thức: cơ học, vật lý, hoá học, sinh học, xã hội.  
- **Không gian – thời gian**: hình thức tồn tại phổ biến của vật chất.

## 3. Phân biệt triết học – khoa học tự nhiên
- Triết học nói đến **phạm trù**, **thuộc tính chung nhất**; khoa học mô tả **dạng vật chất cụ thể** và **cơ chế**.

## 4. Hệ quả phương pháp luận
- Tôn trọng **tính khách quan**; xuất phát từ **thực tại vật chất** khi hoạch định chính sách – nghiên cứu – quản trị.`,
    author: "MLN111 Study Guide",
    tags: [
      "Triết học",
      "Mác–Lênin",
      "MLN111",
      "Chương 2",
      "Vật chất",
      "Tồn tại",
    ],
    readingPages: "117–149",
  },
  {
    title:
      "Nguồn gốc, bản chất & kết cấu của ý thức — Origin, nature & structure of consciousness",
    content: `## 1. Nguồn gốc của ý thức
- **Tự nhiên**: bộ não người (tiền đề vật chất) + **thế giới khách quan** tác động.  
- **Xã hội**: **lao động** và **ngôn ngữ** là hai **điều kiện quyết định** biến phản xạ sinh học → ý thức xã hội–lịch sử.

## 2. Bản chất của ý thức
- **Hình ảnh chủ quan của thế giới khách quan** (tính phản ánh).  
- **Tính sáng tạo**: không chỉ sao chép mà xử lý, khái quát, dự báo.

## 3. Kết cấu của ý thức
- Tri thức; tình cảm; ý chí; niềm tin; lý tưởng; vô thức/tiềm thức (ở góc nhìn hiện đại).

## 4. Ý nghĩa
- Nhấn mạnh **vai trò thực tiễn – xã hội** trong hình thành và phát triển ý thức cá nhân.`,
    author: "MLN111 Study Guide",
    tags: [
      "Triết học",
      "Mác–Lênin",
      "MLN111",
      "Chương 2",
      "Ý thức",
      "Nguồn gốc",
      "Bản chất",
    ],
    readingPages: "149–172",
  },
  {
    title: "Quan hệ giữa vật chất và ý thức — Matter–consciousness relation",
    content: `## Quan hệ vật chất – ý thức
- **Vật chất quyết định ý thức**: về **nguồn gốc**, **nội dung**, **sự vận động**.  
- **Ý thức có tính độc lập tương đối** và **tác động trở lại** vật chất thông qua **hoạt động thực tiễn** (mục tiêu, kế hoạch, quyết sách).

### Nguyên tắc phương pháp
- Xuất phát từ **thực tế khách quan**; tôn trọng quy luật.  
- Phát huy **tính năng động chủ quan** đúng quy luật.`,
    author: "MLN111 Study Guide",
    tags: [
      "Triết học",
      "Mác–Lênin",
      "MLN111",
      "Chương 2",
      "Vật chất",
      "Ý thức",
      "Quan hệ",
    ],
    readingPages: "172–182",
  },
  {
    title:
      "Hai loại hình biện chứng & phép biện chứng duy vật — Two kinds of dialectics & materialist dialectics",
    content: `## Hai loại hình biện chứng
1) **Biện chứng tự phát** (cổ đại, duy vật chất phác).  
2) **Biện chứng duy tâm** (Hegel).  
→ Mác–Ăngghen xây dựng **biện chứng duy vật**: giữ hạt nhân hợp lý (mâu thuẫn–phủ định–phát triển) nhưng đặt trên **nền tảng vật chất**.

## Biện chứng duy vật là gì?
- Hệ thống **nguyên lý, phạm trù, quy luật** phản ánh mối liên hệ – vận động – phát triển của hiện thực khách quan.`,
    author: "MLN111 Study Guide",
    tags: [
      "Triết học",
      "Mác–Lênin",
      "MLN111",
      "Chương 2",
      "Biện chứng",
      "Duy vật",
    ],
    readingPages: "182–189",
  },
  {
    title:
      "Hai nguyên lý của phép biện chứng duy vật — Two principles of dialectical materialism",
    content: `## Hai nguyên lý cơ bản
1) **Nguyên lý về mối liên hệ phổ biến**: mọi sự vật hiện tượng đều **liên hệ – ràng buộc** lẫn nhau (bên trong/bên ngoài, trực tiếp/gián tiếp).  
   - Phương pháp: nhìn nhận **toàn diện**, **hệ thống**, chống phiến diện.
2) **Nguyên lý về sự phát triển**: thế giới luôn **vận động – phát triển**, từ thấp đến cao, theo đường **xoáy ốc**.  
   - Phương pháp: coi trọng **biến đổi**, phát hiện **điểm nút**, **bước nhảy**.

### Cặp nguyên tắc thao tác
- **Lịch sử – cụ thể**, **nguyên nhân – kết quả**, **nội dung – hình thức**, **tất nhiên – ngẫu nhiên**… (chuẩn bị cho phạm trù ở phần sau).`,
    author: "MLN111 Study Guide",
    tags: [
      "Triết học",
      "Mác–Lênin",
      "MLN111",
      "Chương 2",
      "Nguyên lý",
      "Biện chứng",
    ],
    readingPages: "189–203",
  },
  {
    title:
      "Các phạm trù cơ bản của phép biện chứng duy vật — Basic categories of dialectical materialism",
    content: `## Các phạm trù cơ bản (chọn lọc và giải thích ngắn)
- **Cái riêng/cái chung/cái đơn nhất**: mối quan hệ bao hàm – đặc thù.  
- **Nguyên nhân/kết quả**: quan hệ sinh thành; đa nhân, đa hiệu.  
- **Tất nhiên/ngẫu nhiên**: cái lặp lại ổn định vs. cái xảy ra có thể khác; ngẫu nhiên **bổ sung** cho tất nhiên, không đối lập siêu hình.  
- **Nội dung/hình thức**: nội dung quyết định hình thức; hình thức tác động trở lại.  
- **Bản chất/hiện tượng**: bản chất bộc lộ qua nhiều hiện tượng; cần phương pháp để thâm nhập.  
- **Khả năng/hiện thực**: điều kiện chuyển hoá, vai trò của **điểm nút**.

### Cách dùng trong phân tích
- Luôn chỉ ra **tương tác hai chiều**, **điều kiện** và **giới hạn**.`,
    author: "MLN111 Study Guide",
    tags: [
      "Triết học",
      "Mác–Lênin",
      "MLN111",
      "Chương 2",
      "Phạm trù",
      "Biện chứng",
    ],
    readingPages: "203–234",
  },
  {
    title:
      "Các quy luật cơ bản của phép biện chứng duy vật — Basic laws of dialectical materialism",
    content: `## Ba quy luật cơ bản
1) **Quy luật chuyển hoá từ những thay đổi về lượng thành thay đổi về chất và ngược lại**: sự phát triển diễn ra qua **tích luỹ lượng** → đến **điểm nút** tạo **bước nhảy** về **chất**.  
2) **Quy luật thống nhất và đấu tranh của các mặt đối lập**: mâu thuẫn nội tại là **nguồn gốc** vận động, phát triển.  
3) **Quy luật phủ định của phủ định**: phát triển theo **đường xoáy ốc**; cái mới **kế thừa** cái cũ trên cơ sở vượt bỏ.

## Vận dụng
- Quản trị thay đổi, chính sách công, giáo dục, kỹ thuật… luôn cần xác định **lượng–chất**, **mâu thuẫn chủ yếu**, **tính kế thừa**.`,
    author: "MLN111 Study Guide",
    tags: [
      "Triết học",
      "Mác–Lênin",
      "MLN111",
      "Chương 2",
      "Quy luật",
      "Biện chứng",
    ],
    readingPages: "234–257",
  },
  {
    title:
      "Quan niệm về nhận thức trong lịch sử triết học — Views of cognition in history of philosophy",
    content: `## Dòng chảy các quan niệm về nhận thức
- **Cổ đại – Trung cổ**: trực giác/khải huyền; kinh nghiệm cảm tính.  
- **Cận đại**: **Duy lý** (Descartes, Spinoza) vs. **Kinh nghiệm** (Locke, Hume).  
- **Kant**: tổng hợp tiên nghiệm; giới hạn của lý tính.  
- **Hegel**: nhận thức như vận động của tinh thần tuyệt đối (duy tâm biện chứng).  
- **Chủ nghĩa duy vật trước Mác**: duy vật nhưng **siêu hình**; thiếu vai trò **thực tiễn**.

## Điểm rút ra
- Lịch sử cho thấy: cần một lý luận vừa khẳng định **khách quan** của thế giới, vừa đề cao **thực tiễn** như **cơ sở, mục tiêu, tiêu chuẩn** của nhận thức.`,
    author: "MLN111 Study Guide",
    tags: [
      "Triết học",
      "Mác–Lênin",
      "MLN111",
      "Chương 2",
      "Nhận thức",
      "Lịch sử",
    ],
    readingPages: "257–262",
  },
  {
    title:
      "Lý luận nhận thức duy vật biện chứng — Dialectical materialist theory of cognition",
    content: `## Nguyên lý nhận thức của chủ nghĩa duy vật biện chứng
1) **Thực tiễn** là cơ sở, động lực, mục tiêu và **tiêu chuẩn chân lý**.  
2) Nhận thức là **quá trình phản ánh năng động, sáng tạo**: từ **trực quan sinh động** → **tư duy trừu tượng** → **trở lại thực tiễn**.  
3) **Chân lý** mang tính **khách quan**, **cụ thể – lịch sử**, có thể **tương đối và tuyệt đối** (mức độ).

## Cấu trúc các mức độ
- **Cảm tính**: cảm giác, tri giác, biểu tượng.  
- **Lý tính**: khái niệm, phán đoán, suy luận; mô hình, lý thuyết khoa học.

## Phương pháp học tập – nghiên cứu
- Gắn bài học với **vấn đề thực tiễn**; kiểm nghiệm – hiệu chỉnh qua hành động; tránh kinh viện hoá.`,
    author: "MLN111 Study Guide",
    tags: [
      "Triết học",
      "Mác–Lênin",
      "MLN111",
      "Chương 2",
      "Nhận thức",
      "Duy vật biện chứng",
    ],
    readingPages: "sau 262",
  },
];

// Function để import blog posts
function importBlogPosts() {
  try {
    // Đọc file blogs.json hiện tại
    let existingBlogs = [];
    if (fs.existsSync(BLOGS_FILE)) {
      const data = fs.readFileSync(BLOGS_FILE, "utf8");
      existingBlogs = JSON.parse(data);
    }

    // Tạo thư mục data nếu chưa tồn tại
    const dataDir = path.dirname(BLOGS_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Thêm các blog posts mới
    const newBlogs = blogPosts.map((post, index) => ({
      id: `mln-${Date.now()}-${index}`,
      title: post.title,
      content: post.content,
      author: post.author,
      tags: post.tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      readingPages: post.readingPages,
    }));

    // Kết hợp với blogs hiện tại
    const allBlogs = [...existingBlogs, ...newBlogs];

    // Ghi vào file
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(allBlogs, null, 2));

    console.log(
      `✅ Đã import thành công ${newBlogs.length} bài viết triết học!`
    );
    console.log(`📚 Tổng số bài viết: ${allBlogs.length}`);

    return newBlogs.length;
  } catch (error) {
    console.error("❌ Lỗi khi import blog posts:", error);
    return 0;
  }
}

// Chạy import
if (require.main === module) {
  importBlogPosts();
}

module.exports = { importBlogPosts, blogPosts };
