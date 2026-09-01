import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Business Funding Analytics`,
    template: `%s | ${site.name}`
  },
  description: site.description,
  openGraph: {
    title: `${site.name} | Business Funding Analytics`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website"
  },
  icons: {
    icon: "/logo.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
