"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function MainNav() {
  const pathName = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href={"/"} className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="font-bold">{siteConfig.name}</span>
      </Link>
      <Link
        href={"/blog"}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathName === "/blog" ? "text-foreground" : "text-foreground/60"
        )}
      >
        文章
      </Link>
      <Link
        href={"/document"}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathName === "/document" ? "text-foreground" : "text-foreground/60"
        )}
      >
        文档
      </Link>
      <Link
        href={"/about"}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathName === "/about" ? "text-foreground" : "text-foreground/60"
        )}
      >
        关于
      </Link>
    </nav>
  );
}
