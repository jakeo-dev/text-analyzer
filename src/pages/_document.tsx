import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased max-w-[65rem] mx-auto bg-gray-100 px-8">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
