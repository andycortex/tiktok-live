import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "TapTap - Tu asistente de Ventas 24/7",
  description: "TapTap escucha tus transmisiones en vivo en tiktok y responde automáticamente por WhatsApp. Cierra ventas mientras sigues haciendo lo que amas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body suppressHydrationWarning className={`${inter.className} antialiased bg-gray-50`}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
