// app/layout.tsx
import { Inter } from "next/font/google";
import Footer from "../molecules/footer";
import { StyledComponentsRegistry } from "../lib/registry";
import { AuthProvider } from "../context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <AuthProvider>
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
