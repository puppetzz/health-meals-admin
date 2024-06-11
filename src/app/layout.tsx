import '../styles/globals.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import 'mantine-react-table/styles.css';
import '@mantine/dropzone/styles.css';

import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/context/AuthContext';
import QueryProvider from '@/context/QueryClient';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Healthy Meals',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>

        <ColorSchemeScript />
      </head>
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          fontSans.variable
        )}
      >
        <QueryProvider>
          <MantineProvider>
            <AuthProvider>
              <Notifications position="top-right" zIndex={1000} />
              <div className="relative flex min-h-svh">
                <div className="relative min-h-svh">
                  <Sidebar />
                </div>
                <div className="grow bg-gray-100">
                  <Navbar />
                  {children}
                </div>
              </div>
            </AuthProvider>
          </MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
