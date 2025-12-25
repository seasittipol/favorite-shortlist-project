import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
}

export default function NavLink({
  href,
  icon: Icon,
  label,
  isActive,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 flex items-center gap-2 ${
        isActive
          ? "text-blue-600 dark:text-blue-400 font-medium border-b-2 border-blue-600"
          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );
}
