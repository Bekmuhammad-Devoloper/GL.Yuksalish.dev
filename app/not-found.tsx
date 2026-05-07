import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="uz">
      <body className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <p className="font-mono text-sm text-muted-foreground">404</p>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">
            Page not found
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The page you're looking for doesn't exist.
          </p>
          <Link
            href="/uz"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground"
          >
            Go home
          </Link>
        </div>
      </body>
    </html>
  );
}
