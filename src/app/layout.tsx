'use client';
import './global.css';
import { RecoilRoot } from 'recoil';
import { StyleProviders } from '@/style/StyleProvider';
import Header from './components/Header';
import Footer from './components/Footer';

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
            <div id="main-page">{children}</div>
            <Footer />
          </StyleProviders>
        </RecoilRoot>
      </body>
    </html>
  );
}
