import './globals.css';

export const metadata = {
  title: 'HYPE Token Tracker',
  description: 'Track crypto trades and alerts',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
