import type { Metadata } from "next";
import { Inter, Chakra_Petch } from "next/font/google";
import "./globals.css";
import { AdminProvider } from "./context/AdminContext";
import { LaunchProvider } from "./context/LaunchContext";
import { ToastProvider } from "./context/ToastContext";
import AdminSidebar from "@/components/AdminSidebar";
import AdminStatusIndicator from "@/components/AdminStatusIndicator";
import AdminPasswordDialog from '@/components/AdminPasswordDialog';
import ToastContainerWrapper from "@/components/ToastContainerWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const chakraPetch = Chakra_Petch({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-chakra",
});

export const metadata: Metadata = {
  title: "Modern Tactical FPS",
  description: "Next-gen military tactical shooter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${chakraPetch.variable} font-sans`}>
        <ToastProvider>
          <AdminProvider>
            <LaunchProvider>
              {children}
              <AdminSidebar />
              <AdminStatusIndicator />
              <AdminPasswordDialog />
            </LaunchProvider>
          </AdminProvider>
          <ToastContainerWrapper />
        </ToastProvider>
      </body>
    </html>
  );
}
