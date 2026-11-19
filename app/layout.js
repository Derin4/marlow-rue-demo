import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/400-italic.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./_styles/globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import CartDrawer from "./_components/CartDrawer";
import { CartProvider } from "./_context/CartContext";

export const metadata = {
  title: { default: "Marlow & Rue — Small-batch home goods", template: "%s" },
  description:
    "Ceramics, textiles, and candles made in small batches. A demo storefront built for the MyClickAid gallery.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      style={{ "--font-fraunces": "'Fraunces'", "--font-inter": "'Inter'" }}
    >
      <body className='font-body text-ink bg-plaster min-h-screen flex flex-col'>
        <CartProvider>
          <Header />
          <main className='relative z-10 flex-1'>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
