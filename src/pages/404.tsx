"use client";

import Head from "next/head";
import Link from "next/link";
import { Footer } from "~/components/Footer";
import { Nav } from "~/components/Nav";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Sawyer Bivens Photography</title>
        <meta name="description" content="Page not found..." />
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta property="og:image" content="/og.jpg" />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="360" />
        <meta property="og:image:height" content="360" />
        <meta property="og:title" content="Sawyer Bivens Photography" />
      </Head>
      <main className="font-serif flex flex-col min-h-screen">
        <Nav />
        <div className="text-center flex flex-col gap-6 my-auto pb-24">
          <h1 className="text-9xl italic">404</h1>
          <p>Page not found... <Link href="/" className="underline cursor-pointer">back home?</Link></p>
        </div>
        <Footer />
      </main>
    </>
  )
}
