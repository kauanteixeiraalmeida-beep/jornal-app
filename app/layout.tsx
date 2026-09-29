export const metadata = {
  title: 'Jornal App',
  description: 'App de jornal com notícias, vídeos, PDFs e personalização por usuário.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
