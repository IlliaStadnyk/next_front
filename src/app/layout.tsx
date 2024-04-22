import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import Logout from "./logout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <strong>Illia Stadnyk</strong>
          <nav style={{color: 'white', fontFamily: 'cursive'}}>
            <Link href='/'>Home</Link>
            <Link href='/lista'>Lista</Link>
            {!!session &&
                <div>
                  {/*<Link  href='/profile'>Profile</Link>*/}
                  <Logout />
                </div>

            }
            {!session &&
              <div>
                <Link href='/login'>Login</Link>
                {/*<Link href='/register'>Register</Link>*/}
              </div>
            }
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
