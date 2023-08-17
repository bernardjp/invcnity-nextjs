'use client';
import './global.css';
import { StyleProviders } from '@/style/StyleProvider';
import Header from './components/Header';
import { RecoilRoot } from 'recoil';
import Footer from './components/Footer';

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
      <body>
        <RecoilRoot>
          <StyleProviders>
            <Header />
            {children}
            <Footer />
          </StyleProviders>
        </RecoilRoot>
      </body>
    </html>
  );
}
