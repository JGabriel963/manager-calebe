import React from "react";
import { Header } from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-dvh">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-8">{children}</main>
    </div>
  );
}
