import "@/styles/globals.css";
import { Inter, Quicksand } from "next/font/google";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
const quickSand = Quicksand({ subsets: ["latin"] });

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="851242117159-7qsf518qj22v3j87s2sjlbkjebrs3mou.apps.googleusercontent.com">
      <Component {...pageProps} />
      <Toaster/>
      <ReactQueryDevtools/>
      </GoogleOAuthProvider>
      </QueryClientProvider>
    </div>
  );
}
