import { Outlet, Scripts, ScrollRestoration } from "react-router";

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>NutriQuest</title>
        <link rel="manifest" href="manifest.json" />
        <link rel="icon" type="image/png" href="/icons/192.png" />
        {/* You can't use <script> tags in head directly, use <Scripts /> below */}
      </head>
      <body style={{ height: "100%", margin: "0", padding: "0" }}>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {/* If you have global 3rd party scripts, see their integrations for React file-based routing.
            You may include them in components or with <script dangerouslySetInnerHTML={...} /> if needed. */}
      </body>
    </html>
  );
}