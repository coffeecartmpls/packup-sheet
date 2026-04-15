export const metadata = {
  title: "Coffee Cart MPLS — Pack-Up Sheet",
  description: "Weekly events pack-up sheet for Coffee Cart Minneapolis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
