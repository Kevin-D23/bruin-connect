"use client";
import "./globals.scss";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import nprogress from "nprogress";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const location = usePathname()

  nprogress.configure({ showSpinner: false });

  useEffect(() => {
    nprogress.start();
    nprogress.done();
  }, [location]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
