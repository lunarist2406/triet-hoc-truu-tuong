import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold text-primary mb-4">TRIẾT HỌC TRỪU TƯỢNG</h4>
            <p className="text-sm text-muted-foreground">Khám phá thế giới triết học và tư tưởng nhân văn</p>
          </div>

          <div>
            <h5 className="font-semibold text-foreground mb-4">Danh mục</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/quan-diem" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Quan điểm
                </Link>
              </li>
              <li>
                <Link href="/ngon-ngu" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Ngôn ngữ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-foreground mb-4">Tài nguyên</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tai-lieu" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Tài liệu
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-foreground mb-4">Theo dõi</h5>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Facebook
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Twitter
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">© 2025 Triết Học Trừu Tượng. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
