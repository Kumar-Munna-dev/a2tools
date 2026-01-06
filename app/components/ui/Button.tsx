"use client";

import Link from "next/link";
import React, { ReactNode } from "react";

interface ButtonProps {
  href?: string; // optional if using as a normal button
  onClick?: () => void;
  variant?: "default" | "destructive";
  className?: string;
  children: ReactNode; // allow JSX/strings inside
}

const Button: React.FC<ButtonProps> = ({
  href,
  onClick,
  variant = "default",
  className = "",
  children,
}) => {
  const baseStyles =
    "px-4 py-2 rounded transition duration-200 ease-in-out block md:inline-block";
  const variantStyles =
    variant === "destructive"
      ? "bg-red-600 text-white hover:bg-red-700"
      : "bg-blue-600 text-white hover:bg-blue-700";

  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${variantStyles} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
