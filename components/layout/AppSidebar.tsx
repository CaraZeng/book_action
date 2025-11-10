"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Flame, 
  User, 
  Settings, 
  BookOpen, 
  Award, 
  Medal, 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle 
} from "lucide-react";

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";

  const menuItems = [
    { icon: Home, label: "Learn", page: "/" },
    { icon: MessageCircle, label: "Chat", page: "/chat" },
    { icon: Medal, label: "Medals", page: "/medals" },
  ];

  const bottomItems = [
    { icon: User, label: "Profile", page: "/profile" },
    { icon: Settings, label: "Settings", page: "/settings" },
  ];

  return (
    <>
      <Sidebar collapsible="icon" className="relative transition-[width] duration-300 border-r border-gray-200">
        <SidebarHeader className="border-b border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            {!collapsed && <span className="text-green-600">BookAction</span>}
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton 
                      asChild
                      tooltip={item.label}
                      className={collapsed ? "justify-center" : ""}
                    >
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(item.page);
                        }}
                        className={pathname === item.page ? "bg-gray-100" : ""}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {!collapsed && (
            <SidebarGroup>
              <SidebarGroupLabel>Stats</SidebarGroupLabel>
              <SidebarGroupContent className="px-4 py-2">
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-500" />
                      <span className="text-sm">Streak</span>
                    </div>
                    <span className="text-orange-600">7 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm">Total XP</span>
                    </div>
                    <span className="text-yellow-600">1,250</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: "75%"}}></div>
                  </div>
                  <p className="text-xs text-gray-600 text-center">75% to next level</p>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>
        
        <SidebarFooter className="border-t border-gray-200">
          <SidebarMenu>
            {bottomItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton 
                  asChild
                  tooltip={item.label}
                  className={collapsed ? "justify-center" : ""}
                >
                  <a 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(item.page);
                    }}
                    className={pathname === item.page ? "bg-gray-100" : ""}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      
      {/* Fixed circular toggle button */}
      <button
        onClick={toggleSidebar}
        className={cn(
          "fixed top-1/2 -translate-y-1/2 z-50 h-8 w-8 rounded-full border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-center hidden md:flex",
          collapsed ? "left-[calc(3rem-1rem)]" : "left-[calc(16rem-1rem)]"
        )}
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>
    </>
  );
}