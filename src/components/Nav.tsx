import Link from "next/link";

export function Nav() {
  return (
    <nav className="flex flex-row items-center justify-between gap-6 p-6">
      <p>📸 Sawyer Bivens</p>
      <div className="flex flex-row items-center gap-6">
        <Link
          href="/"
          className="font-serif text-gray-600 hover:text-black hover:underline"
        >
          Home
        </Link>
        {/* <Link href="/newsletter" className="text-gray-600 font-serif hover:text-black hover:underline">Newsletter</Link> */}
        <Link
          href="/contact"
          className="font-serif text-gray-600 hover:text-black hover:underline"
        >
          Contact Me
        </Link>
      </div>
    </nav>
  );
}
