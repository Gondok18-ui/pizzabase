import "./globals.css";

export const metadata = {
  title: "PizzaBase",
  description: "Bitcoin Pizza Day on Farcaster",

  openGraph: {
    title: "PizzaBase 🍕",
    description:
      "Claim your early slice on Base",
    images: [
      "https://pizzabase.vercel.app/og.png",
    ],
  },

  other: {
    "fc:miniapp": JSON.stringify({
      version: "1",
      imageUrl:
        "https://pizzabase.vercel.app/og.png",
      button: {
        title: "🍕 Open PizzaBase",
        action: {
          type: "launch_frame",
          name: "PizzaBase",
          url: "https://pizzabase.vercel.app",
          splashImageUrl:
            "https://pizzabase.vercel.app/og.png",
          splashBackgroundColor: "#0052ff",
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
