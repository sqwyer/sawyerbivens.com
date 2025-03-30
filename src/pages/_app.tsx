import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Analytics } from "@vercel/analytics/react";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Analytics />
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
