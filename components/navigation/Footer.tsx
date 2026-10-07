import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#e8d5cf] bg-white py-12 text-[#6e5d60]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-full bg-[#b05765] text-white text-xs font-serif font-bold">
                ✨
              </span>
              <span className="font-serif text-lg font-bold text-[#2c2224]">
                Digital Moments
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-[#8e7b7e]">
              Create unforgettable digital birthday surprises & elegant wedding invitations with personalized music, galleries, and countdowns.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c2224]">
              Explore Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#b05765] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-[#b05765] transition-colors">
                  Template Gallery
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-[#b05765] transition-colors">
                  How It Works Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Experiences Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c2224]">
              Digital Experiences
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/birthday" className="hover:text-[#b05765] transition-colors">
                  Birthday Wishes
                </Link>
              </li>
              <li>
                <Link href="/birthday/create" className="hover:text-[#b05765] transition-colors">
                  Create Birthday Surprise
                </Link>
              </li>
              <li>
                <Link href="/wedding" className="hover:text-[#b05765] transition-colors">
                  Wedding Invitations
                </Link>
              </li>
              <li>
                <Link href="/wedding/create" className="hover:text-[#b05765] transition-colors">
                  Create Wedding Invitation
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Guarantees Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c2224]">
              Platform Guarantees
            </h4>
            <ul className="space-y-2 text-xs text-[#8e7b7e]">
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
        <div className="border-t border-[#f3e6e3] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8e7b7e]">
          <div>
            © {new Date().getFullYear()} Digital Moments Platform. Built with Love ❤️
          </div>
          <div className="flex gap-4">
            <Link href="/templates" className="hover:underline">
              Templates
            </Link>
            <Link href="/#how-it-works" className="hover:underline">
              Guide
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
