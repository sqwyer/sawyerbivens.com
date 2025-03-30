import Head from "next/head";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Footer } from "~/components/Footer";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { Nav } from "~/components/Nav";
import { api } from "~/utils/api";

type StatusStateType = {
  status: "error" | "success" | "loading" | null;
  message: string | null;
};

function Inquires({
  password,
  setScreen,
  setStatusState,
}: {
  password: string;
  setScreen: Dispatch<SetStateAction<"password" | "list">>;
  setStatusState: Dispatch<SetStateAction<StatusStateType>>;
}) {
  const { data, status } = api.inqury.list.useQuery({ password });

  useEffect(() => {
    if (data?.status === "error") {
      setStatusState({
        status: "error",
        message: data.message,
      });
      setScreen("password");
    }
  }, [data, setScreen, setStatusState]);

  return (
    <>
      {status === "pending" && (
        <div className="mx-auto my-auto flex w-full max-w-2xl flex-col gap-6 p-6">
          <input
            className="rounded-none border p-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => e.preventDefault()}
          />
          <button
            className="col-span-2 cursor-pointer rounded-none bg-black p-2 text-white duration-100 disabled:cursor-not-allowed disabled:opacity-20"
            disabled={true}
          >
            <LoadingSpinner className="mx-auto h-[24px] w-[24px] fill-black" />
          </button>
        </div>
      )}
      {status === "success" && (
        <div className="mb-auto grid grid-cols-2 gap-6 p-6">
          {data.data?.map((inqury) => (
            <div className="flex flex-col gap-3 border p-6" key={inqury.id}>
              <div>
                <p className="text-xs text-gray-600 uppercase">
                  {inqury.createdAt.toLocaleString()}
                </p>
              </div>
              <div>
                <p>{inqury.name}</p>
                <p>{inqury.email}</p>
                <p>{inqury.phone}</p>
                <p>{inqury.message}</p>
              </div>
            </div>
          ))}
          {!data.data ||
            (data.data.length === 0 && (
              <p className="col-span-2 text-center text-gray-600">
                No inquries have been submitted...
              </p>
            ))}
        </div>
      )}
    </>
  );
}

export default function AdminHome() {
  const [statusState, setStatusState] = useState<StatusStateType>({
    status: null,
    message: null,
  });
  const [password, setPassword] = useState("");
  const [screen, setScreen] = useState<"password" | "list">("password");

  const canSubmit = () => {
    if (password.trim() === "") return false;
    return true;
  };

  const loadInquries = () => {
    setScreen("list");
  };

  return (
    <>
      <Head>
        <title>Sawyer Bivens Photo | Admin</title>
      </Head>
      <main className="flex min-h-screen flex-col font-serif">
        <Nav />
        {screen === "password" && (
          <div className="mx-auto my-auto flex w-full max-w-2xl flex-col gap-6 p-6">
            <input
              className="rounded-none border p-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="col-span-2 cursor-pointer rounded-none bg-black p-2 text-white duration-100 disabled:cursor-not-allowed disabled:opacity-20"
              disabled={!canSubmit() || statusState.status === "loading"}
              onClick={() => loadInquries()}
            >
              {statusState.status === "loading" ? (
                <LoadingSpinner className="mx-auto h-[24px] w-[24px] fill-black" />
              ) : (
                <span>LOGIN</span>
              )}
            </button>
            <p className="h-[24px]">
              {statusState.status === "error" && (
                <span className="text-red-600">{statusState.message}</span>
              )}
            </p>
          </div>
        )}
        {screen === "list" && (
          <Inquires
            password={password}
            setScreen={setScreen}
            setStatusState={setStatusState}
          />
        )}
        <Footer />
      </main>
    </>
  );
}
