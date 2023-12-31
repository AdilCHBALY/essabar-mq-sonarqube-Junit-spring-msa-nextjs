"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, Zap } from "lucide-react";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const size = 20;

  const routes = [
    {
      icon: <Zap size={size} />,
      href: `/`,
      label: "Dashboard",
      active: pathname === `/`,
    },
    {
      icon: <Car size={size} />,
      href: `/cars`,
      label: "Vehicule",
      active: /\/cars\w*/.test(pathname),
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm group flex items-center justify-center gap-x-1 font-medium transition-colors hover:text-primary",
            route.active ? "text-primary" : "text-muted-foreground"
          )}
        >
          <div
            className={cn(
              ``,
              route.active && "translate-y-[-10%] animate-bounce"
            )}
          >
            {route.icon}
          </div>
          <div>{route.label}</div>
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
