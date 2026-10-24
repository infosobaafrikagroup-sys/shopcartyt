import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "@/images/logo-elite.svg";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  showText?: boolean;
}

const Logo = ({ className, imageClassName, showText = true }: LogoProps) => {
  return (
    <Link
      href="/"
      aria-label="Elite Shisha Shop – accueil"
      className={cn(
        "group inline-flex shrink-0 items-center gap-3 focus:outline-none",
        className
      )}
    >
      <Image
        src={logo}
        alt=""
        priority
        className={cn(
          "h-14 w-auto transition-transform duration-300 group-hover:scale-105 sm:h-[4.5rem]",
          imageClassName
        )}
      />
      {showText && (
        <span className="hidden flex-col leading-none min-[420px]:flex">
          <span className="text-xl font-black uppercase tracking-wider text-shop_dark_green hoverEffect group-hover:text-shop_light_green sm:text-2xl">
            Elite
          </span>
          <span className="mt-1 hidden text-[11px] font-semibold uppercase tracking-[0.25em] text-lightColor sm:block">
            Shisha Shop
          </span>
        </span>
      )}
    </Link>
  );
};

export default Logo;