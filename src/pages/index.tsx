"use client";

import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Footer } from "~/components/Footer";
import { Nav } from "~/components/Nav";
import { cn } from "~/lib/cn";

// import { api } from "~/utils/api";

function Photo({
  src,
  alt,
  width,
  height,
  children,
  className,
  setPopupState
}: {
  src: string,
  alt: string,
  width: number,
  height: number,
  children?: React.ReactNode,
  className?: string,
  setPopupState: Dispatch<SetStateAction<PopupStateType>>
}) {
  return <div className={cn("flex flex-col justify-center items-center group border p-6 cursor-pointer h-full", className)}>
    <Image src={src} alt={alt} width={width} height={height} className="w-full md:grayscale group-hover:grayscale-0 duration-100" onClick={() => setPopupState({
      active: true,
      image: {
        alt,
        height,
        src,
        width
      }
    })}/>
    {children}
  </div>
}

function PhotoPopup({
  image,
  setPopupState
}: {
  image: {
    src: string,
    alt: string,
    height: number,
    width: number
  },
  setPopupState: Dispatch<SetStateAction<PopupStateType>>
}) {
  return <>
    <div className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm" onClick={() => setPopupState({ active: false, image: null })}></div>
    {/* <div className="z-50 p-6 bg-white border border-black h-[90vh] fixed top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center"> */}
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} className="max-w-[calc(100vw-24px-24px)] z-50 fixed top-1/2 left-1/2 -translate-1/2  max-h-[calc(90vh-2px-24px-24px)] w-auto p-6 border border-black bg-white" />
    {/* </div> */}
  </>
}

type PopupStateType = {
  active: boolean,
  image: null|{
    src: string,
    alt: string,
    height: number,
    width: number
  }
}

export default function Home() {
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });

  const [ popupState, setPopupState ] = useState<PopupStateType>({
    active: false,
    image: null
  });

  useEffect(() => {
    if(popupState.active) document.body.classList.add("overflow-y-hidden");
    else document.body.classList.remove("overflow-y-hidden");
  }, [popupState.active])

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
      <main className="font-serif">
        <Nav />
        <div className="masonry gap-6 px-6 pb-6 space-y-6 md:space-y-0">
          <Photo setPopupState={setPopupState} src="/IMG_1.jpg" alt="IMAGE 1" width={1000} height={1500} />
          <Photo setPopupState={setPopupState} src="/IMG_2.jpg" alt="IMAGE 2" width={1500} height={1000} />
          <Photo setPopupState={setPopupState} src="/IMG_3.jpg" alt="IMAGE 3" width={1500} height={1000} />
          <Photo setPopupState={setPopupState} src="/IMG_4.jpg" alt="IMAGE 4" className="col-span-2 items-center"width={1500} height={1000} />
          <Photo setPopupState={setPopupState} src="/IMG_12.jpg" alt="IMAGE 12" width={1500} height={1000} />
          <Photo setPopupState={setPopupState} src="/IMG_6.jpg" alt="IMAGE 6" width={1500} height={1000} />
          <Photo setPopupState={setPopupState} src="/IMG_7.jpg" alt="IMAGE 7" className="col-span-2 items-center" width={1500} height={1000} />
          <Photo setPopupState={setPopupState} src="/IMG_5.jpg" alt="IMAGE 5" width={1500} height={1000} />
          <Photo setPopupState={setPopupState} src="/IMG_13.jpg" alt="IMAGE 13" width={1500} height={1000} />
          <Photo setPopupState={setPopupState} src="/IMG_14.jpg" alt="IMAGE 14" width={1500} height={1000} />
          <Photo setPopupState={setPopupState} src="/IMG_8.jpg" alt="IMAGE 8" width={1500} height={1000} />
          <Photo setPopupState={setPopupState} src="/IMG_9.jpg" alt="IMAGE 9" className="col-span-2 items-center" width={1500} height={1000} />
          <Photo setPopupState={setPopupState} src="/IMG_10.jpg" alt="IMAGE 10" className="col-span-2 items-center" width={1500} height={1000} />
          <Photo setPopupState={setPopupState} src="/IMG_11.jpg" alt="IMAGE 11" width={1500} height={1000} />
        </div>
        <Footer />
        {popupState.active && popupState.image && <PhotoPopup setPopupState={setPopupState} image={popupState.image} /> }
      </main>
    </>
  );
}
