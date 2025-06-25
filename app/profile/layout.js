import "./style.css";
import { Roboto } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import Head from 'next/head';

const roboto = Roboto({
  weight: '300', 
  subsets: ['latin', 'cyrillic'], 
  display: 'swap', 
});

export const metadata = {
  title: 'Личный кабинет',
  description: 'Ваш личный кабинет',
};

export default function ProfileLayout({ children }) {
  return (
      <div className={roboto.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </div>
  );
}
