"use client";

import * as React from "react";

import { NavMain } from "@/components/ui/nav-main";
import { NavSecondary } from "@/components/ui/nav-secondary";
import { NavUser } from "@/components/ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Code,
  LayoutDashboard,
  FolderKanban,
  Plug,
  Terminal,
  FileText,
  Settings2Icon,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: <LayoutDashboard />,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: <FolderKanban />,
    },
    {
      title: "Endpoints",
      url: "/dashboard/endpoints",
      icon: <Plug />,
    },
    {
      title: "Playground",
      url: "/dashboard/playground",
      icon: <Terminal />,
    },
    {
      title: "Request Logs",
      url: "/dashboard/logs",
      icon: <FileText />,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore((state) => state.user);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <Code className="size-6!" />
                <span className="text-base font-semibold">Free API</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
