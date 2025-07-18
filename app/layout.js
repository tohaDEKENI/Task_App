import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
