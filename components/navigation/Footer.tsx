import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-pink-100 bg-linear-to-b from-[#ffffff] to-[#fff5f7] py-14 text-[#6b5e62]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="grid size-8 place-items-center rounded-full bg-linear-to-tr from-[#ff3366] via-[#ff4d6d] to-[#ff758f] text-white text-xs font-serif font-bold shadow-xs">
                ♥
              </span>
              <span className="font-serif text-lg font-bold text-[#1f1a1c] group-hover:text-[#ff3366] transition-colors">
                Digital Moments
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-[#6b5e62]">
              Handcrafted digital love surprises &amp; wedding keepsakes. Personalized with romantic melodies, cherished photo storybooks, and heartfelt notes.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1f1a1c]">
              Explore Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#ff3366] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-[#ff3366] transition-colors">
                  Template Gallery
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-[#ff3366] transition-colors">
                  How It Works Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Experiences Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1f1a1c]">
              Digital Experiences
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/birthday" className="hover:text-[#ff3366] transition-colors">
                  Birthday Wishes
                </Link>
              </li>
              <li>
                <Link href="/birthday/create" className="hover:text-[#ff3366] transition-colors">
                  Create Birthday Surprise
                </Link>
              </li>
              <li>
                <Link href="/wedding" className="hover:text-[#ff3366] transition-colors">
                  Wedding Invitations
                </Link>
              </li>
              <li>
                <Link href="/wedding/create" className="hover:text-[#ff3366] transition-colors">
                  Create Wedding Invitation
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Guarantees Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1f1a1c]">
              Platform Guarantees
            </h4>
            <ul className="space-y-2 text-xs text-[#6b5e62]">
              <li className="flex items-center gap-2">
                <span>🔒</span> No Login or Account Needed
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span> 100% Mobile Responsive
              </li>
              <li className="flex items-center gap-2">
                <span>☁️</span> Cloudinary Image Storage
              </li>
              <li className="flex items-center gap-2">
                <span>⚡</span> Instant Public Link Sharing
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-pink-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8e7b7e]">
          <div>
            © {new Date().getFullYear()} Digital Moments. Made with love for moments that matter ♥
          </div>
          <div className="flex gap-4">
            <Link href="/templates" className="hover:underline hover:text-[#ff3366]">
              Templates
            </Link>
            <Link href="/#how-it-works" className="hover:underline hover:text-[#ff3366]">
              Guide
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
