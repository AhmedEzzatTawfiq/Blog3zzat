"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface ClickableTableRowProps {
  href: string;
  children: ReactNode;
}

export function ClickableTableRow({ href, children }: ClickableTableRowProps) {
  return (
    <Link href={href} className="contents">
      <tr className="cursor-pointer hover:bg-muted/50 transition-colors">
        {children}
      </tr>
    </Link>
  );
}
