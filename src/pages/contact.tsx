import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Footer } from "~/components/Footer";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { Nav } from "~/components/Nav";
import { api } from "~/utils/api";

export default function ContactPage() {

  const createInquryMutation = api.inqury.create.useMutation();
  const [ statusState, setStatusState ] = useState<{
    status: "error"|"success"|"loading"|null,
    message:string|null
  }>({
    status: null,
    message: null
  })

  const [ inqury, setInqury ] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const canSubmit = () => {
    if(inqury.name.trim().length === 0) return false;
    if(inqury.email.trim().length === 0) return false;
    if(inqury.phone.trim().length === 0) return false;
    if(inqury.message.trim().length === 0) return false;
    return true;
  }

  const submitInqury = () => {
    if(statusState.status !== "loading" && canSubmit())
      setStatusState({
        status: "loading",
        message: null
      })
      createInquryMutation.mutate({
        name: inqury.name,
        email: inqury.email,
        phone: inqury.phone,
        message: inqury.message
      }, {
        onError: (err) => {
          console.error(err);
          setStatusState({
            status: "error",
            message: "Error: " + err.message
          })
        },
        onSuccess: () => {
          setInqury({
            email: "",
            message: "",
            name: "",
            phone: ""
          })
          setStatusState({
            status: "success",
            message: "Your message has been submitted. Thank you!"
          });
        }
    });
  }

  return (
    <>
      <Head>
        <title>Sawyer Bivens Photo</title>
        <meta name="description" content="I&apos;m Sawyer, a photographer based out of Sherwood, Arkansas." />
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
        <div className="text-center flex flex-col gap-6 my-auto">
          <h1 className="text-6xl sm:text-6xl md:text-6xl lg:text-8xl xl:text-9xl italic">Let&apos;s get in touch.</h1>
          <div className="max-w-5xl w-full mx-auto grid grid-cols-2 gap-6 p-6">
            <input className="border p-2 rounded-none col-span-2" placeholder="Full Name" value={inqury.name} onChange={e => setInqury(prev => ({
              ...prev,
              name: e.target.value
            }))} required />
            <input className="border p-2 rounded-none col-span-2 md:col-span-1" value={inqury.email} onChange={e => setInqury(prev => ({
              ...prev,
              email: e.target.value
            }))} placeholder="Email" required />
            <input className="border p-2 rounded-none col-span-2 md:col-span-1" value={inqury.phone} onChange={e => setInqury(prev => ({
              ...prev,
              phone: e.target.value
            }))} placeholder="Phone Number" required />
            <textarea className="border p-2 rounded-none col-span-2" value={inqury.message} onChange={e => setInqury(prev => ({
              ...prev,
              message: e.target.value
            }))} placeholder="Your Message" required />
            <button className="col-span-2 bg-black rounded-none text-white p-2 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed duration-100" disabled={!canSubmit() || statusState.status === "loading"} onClick={() => submitInqury()}>
              {statusState.status === "loading" ?  <LoadingSpinner className="mx-auto h-[24px] w-[24px] fill-black" /> : <span>SUBMIT</span>}
            </button>
            <p className="col-span-2">
              Or email me at <Link href="mailto:sawyerbivens06@gmail.com" className="underline">sawyerbivens06@gmail.com</Link>
            </p>
            <p className="col-span-2 h-[24px]">
              {statusState.status === "error" && <span className="text-red-600">{statusState.message}</span>}
              {statusState.status === "success" && <span className="text-lime-600">{statusState.message}</span>}
            </p>
          </div>
        </div>
        <Footer className="mt-auto" />
      </main>
    </>
  )
}