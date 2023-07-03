import './global.css';
import { StyleProviders } from '@/style/StyleProvider';
import { Inter } from 'next/font/google';
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'IN/VCNITY',
  description: 'Real Estate CRUD',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyleProviders>
          <Header />
          {children}
        </StyleProviders>
      </body>
    </html>
  );
}
