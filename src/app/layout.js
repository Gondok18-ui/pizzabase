"use client";

import "./globals.css";

import { AuthKitProvider } from "@farcaster/auth-kit";

const config = {
  rpcUrl: "https://mainnet.optimism.io",
  domain: "pizzabase.vercel.app",
  siweUri: "https://pizzabase.vercel.app/login",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthKitProvider config={config}>
          {children}
        </AuthKitProvider>
      </body>
    </html>
  );
}
