import React from 'react';
import type { Metadata } from 'next';
import { Inter, Chakra_Petch } from 'next/font/google';
import { AdminProvider } from '../context/AdminContext';
import AdminStatusIndicator from '@/components/AdminStatusIndicator';
import AdminPasswordDialog from '@/components/AdminPasswordDialog';
import AdminSidebar from '@/components/AdminSidebar';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const chakraPetch = Chakra_Petch({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-chakra",
});

export const metadata: Metadata = {
  title: 'Game Launch - Coming Soon',
  description: 'Get ready for the ultimate tactical experience',
};

export default function LaunchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${chakraPetch.variable} font-sans`}>
        <AdminProvider>
          {children}
          <AdminSidebar />
          <AdminStatusIndicator />
          <AdminPasswordDialog />
        </AdminProvider>
      </body>
    </html>
  );
} 