import type { ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
};

export function PageWrapper({ children }: PageWrapperProps) {
  return <div className="min-h-screen bg-background text-text">{children}</div>;
}
