import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased max-w-[75rem] mx-auto bg-gray-100 p-8 lg:py-0">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
