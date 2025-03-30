"use client";

import Link from "next/link";

export function Footer() {
  return <footer className="p-6">
  <div className="border-t border-black pt-6 grid grid-cols-2 flex-col sm:flex sm:flex-row items-center justify-center gap-6">
  <p className="col-span-2">&copy; {new Date().getFullYear()} Sawyer Bivens</p>
  <Link href="https://www.instagram.com/sawyerbiv.photo/" target="_blank" className="text-gray-600 font-serif hover:text-black hover:underline">Instagram</Link>
  <Link href="https://www.facebook.com/people/Sawyer-Bivens/pfbid02n6a6QHTRr8h86kcoQKzDD2D1AaZcxjaqpxSjnn9v1zFxEpQA68WKAaazS6cniFetl/" target="_blank" className="text-gray-600 font-serif hover:text-black hover:underline">Facebook</Link>
  {/* <Link href="/newsletter" className="text-gray-600 font-serif hover:text-black hover:underline">Newsletter</Link> */}
  <Link href="/" className="text-gray-600 font-serif hover:text-black hover:underline">Home</Link>
  <Link href="mailto:sawyerbivens06@gmail.com" className="text-gray-600 font-serif hover:text-black hover:underline">Contact Me</Link>
</div>
</footer>
}