import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
)

export default function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <p className="text-lg font-bold">
            <span className="text-primary">T</span>ekitto
          </p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Tekitto. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-4">
          <Link
            href="https://facebook.com/tekitto.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <Facebook className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link
            href="https://instagram.com/tekitto.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <Instagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            href="https://wa.me/918345805877"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <WhatsAppIcon />
            <span className="sr-only">WhatsApp</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
