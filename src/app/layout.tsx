"use client";

import { Inter } from "next/font/google";
import { AuthProvider } from 'oidc-react';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const oidcConfig = {
  onSignIn: async (user: any) => {
    alert('You just signed in, congratz! Check out the console!');
    console.log(user);
    window.location.hash = '';
  },
  authority: "http://localhost:8080/auth/realms/lyyang/",
  clientId: 'test-next-public',
  redirectUri: window.location.href,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider {...oidcConfig}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
