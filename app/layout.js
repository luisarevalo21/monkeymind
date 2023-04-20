import "./globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

export const metadata = {
  title: "Monkey Mind",
  description: "Get your attention back",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
