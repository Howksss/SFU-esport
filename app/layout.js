import { Roboto } from "next/font/google";
import "@/globals.css";
import Header from '@/components/Header';
import { AuthProvider } from "@/context/AuthContext";
import Head from 'next/head';


const roboto = Roboto({
  weight: '300', 
  subsets: ['latin', 'cyrillic'], 
  display: 'swap', 
});

export const metadata = {
  title: 'Главная',
  description: 'Главная страница',
  icons: {
    icon: '/images/Logo.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={roboto.className}>
        <Head>
          <link rel="shortcut icon" href="/images/Logo.svg" />
        </Head>
      <body className={roboto.className}>
        <AuthProvider>
          <Header/>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
