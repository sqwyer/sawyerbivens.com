import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Footer } from "~/components/Footer";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { Nav } from "~/components/Nav";
import { api } from "~/utils/api";

export default function ContactPage() {
  const createInquryMutation = api.inqury.create.useMutation();
  const [statusState, setStatusState] = useState<{
    status: "error" | "success" | "loading" | null;
    message: string | null;
  }>({
    status: null,
    message: null,
  });

  const [inqury, setInqury] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const canSubmit = () => {
    if (inqury.name.trim().length === 0) return false;
    if (inqury.email.trim().length === 0) return false;
    if (inqury.phone.trim().length === 0) return false;
    if (inqury.message.trim().length === 0) return false;
    return true;
  };

  const submitInqury = () => {
    if (statusState.status !== "loading" && canSubmit())
      setStatusState({
        status: "loading",
        message: null,
      });
    createInquryMutation.mutate(
      {
        name: inqury.name,
        email: inqury.email,
        phone: inqury.phone,
        message: inqury.message,
      },
      {
        onError: (err) => {
          console.error(err);
          setStatusState({
            status: "error",
            message: "Error: " + err.message,
          });
        },
        onSuccess: () => {
          setInqury({
            email: "",
            message: "",
            name: "",
            phone: "",
          });
          setStatusState({
            status: "success",
            message: "Your message has been submitted. Thank you!",
          });
        },
      },
    );
  };

  return (
    <>
      <Head>
        <title>Sawyer Bivens Photo</title>
        <meta
          name="description"
          content="I'm Sawyer, a photographer based out of Sherwood, Arkansas."
        />
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
      <main className="flex min-h-screen flex-col font-serif">
        <Nav />
        <div className="my-auto flex flex-col gap-6 pt-16 text-center sm:pt-8 md:pt-4 lg:pt-0">
          <h1 className="text-6xl italic sm:text-6xl md:text-6xl lg:text-8xl xl:text-9xl">
            Let&apos;s get in touch.
          </h1>
          <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-6 p-6">
            <input
              className="col-span-2 rounded-none border p-2"
              placeholder="Full Name"
              value={inqury.name}
              onChange={(e) =>
                setInqury((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              required
            />
            <input
              className="col-span-2 rounded-none border p-2 md:col-span-1"
              value={inqury.email}
              onChange={(e) =>
                setInqury((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder="Email"
              required
            />
            <input
              className="col-span-2 rounded-none border p-2 md:col-span-1"
              value={inqury.phone}
              onChange={(e) =>
                setInqury((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              placeholder="Phone Number"
              required
            />
            <textarea
              className="col-span-2 rounded-none border p-2"
              value={inqury.message}
              onChange={(e) =>
                setInqury((prev) => ({
                  ...prev,
                  message: e.target.value,
                }))
              }
              placeholder="Your Message"
              required
            />
            <button
              className="col-span-2 cursor-pointer rounded-none bg-black p-2 text-white duration-100 disabled:cursor-not-allowed disabled:opacity-20"
              disabled={!canSubmit() || statusState.status === "loading"}
              onClick={() => submitInqury()}
            >
              {statusState.status === "loading" ? (
                <LoadingSpinner className="mx-auto h-[24px] w-[24px] fill-black" />
              ) : (
                <span>SUBMIT</span>
              )}
            </button>
            <p className="col-span-2">
              Or email me at{" "}
              <Link
                href="mailto:sawyerbivens06@gmail.com"
                className="underline"
              >
                sawyerbivens06@gmail.com
              </Link>
            </p>
            <p className="col-span-2 h-[24px]">
              {statusState.status === "error" && (
                <span className="text-red-600">{statusState.message}</span>
              )}
              {statusState.status === "success" && (
                <span className="text-lime-600">{statusState.message}</span>
              )}
            </p>
          </div>
        </div>
        <Footer className="mt-auto" />
      </main>
    </>
  );
}
