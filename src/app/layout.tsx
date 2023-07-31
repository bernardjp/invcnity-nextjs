import './global.css';
import { StyleProviders } from '@/style/StyleProvider';
import Header from './components/Header';

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
        <StyleProviders>
          <Header />
          {children}
        </StyleProviders>
      </body>
    </html>
  );
}
