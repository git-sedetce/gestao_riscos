import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import Footer from "src/components/common/footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
