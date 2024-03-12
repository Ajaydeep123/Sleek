import "@/styles/globals.css";
import { Inter, Quicksand } from "next/font/google";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from '@react-oauth/google';

const inter = Inter({ subsets: ["latin"] });
const quickSand = Quicksand({ subsets: ["latin"] });
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <GoogleOAuthProvider clientId="851242117159-7qsf518qj22v3j87s2sjlbkjebrs3mou.apps.googleusercontent.com">
      <Component {...pageProps} />
      </GoogleOAuthProvider>
    </div>
  );
}
