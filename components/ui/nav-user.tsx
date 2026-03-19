"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { getInitials, formatUsername } from "@/utils/format";
import { useAuthStore } from "@/store/auth-store";

import {
  EllipsisVerticalIcon,
  CircleUserRoundIcon,
  LogOutIcon,
} from "lucide-react";

type UserType = {
  username?: string | null;
  email?: string | null;
  avatar?: string | null;
} | null;

export function NavUser({ user }: { user: UserType }) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { logout } = useAuthStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-full animate-pulse rounded-md bg-muted" />;
  }

  const name = formatUsername(user?.username);
  const email = user?.email || "guest@example.com";
  const avatar = user?.avatar || "";

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              aria-label="User menu"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={avatar || undefined} alt={name} />
                <AvatarFallback className="rounded-lg">
                  {getInitials(name)}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {email}
                </span>
              </div>

              <EllipsisVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={6}
          >
            <DropdownMenuLabel className="p-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 rounded-lg">
                  <AvatarImage src={avatar || undefined} alt={name} />
                  <AvatarFallback className="rounded-lg">
                    {getInitials(name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <span className="text-sm font-medium">{name}</span>
                  <span className="text-xs text-muted-foreground">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* MENU */}
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/account")}>
                <CircleUserRoundIcon className="mr-2 size-4" />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon className="mr-2 size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
