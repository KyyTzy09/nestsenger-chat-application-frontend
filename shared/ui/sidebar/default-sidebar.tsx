import { CircleDotDashedIcon, Menu } from "lucide-react";
import React from "react";
import { FaComment } from "react-icons/fa";
import { Link, useLocation, useNavigation } from "react-router";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel } from "shared/shadcn/sidebar";

export default function DefaultSideBar() {
  const location = useLocation();
  const sidebarItem = [
    {
      Icon: FaComment,
      name: "Pesan",
      route: "/chat",
    },
    {
      Icon: CircleDotDashedIcon,
      name: "Status",
      route: "/status",
    },
  ];

  return (
    <Sidebar>
      <SidebarContent className="w-16 flex flex-col bg-[#202020] h-screen py-10 px-2 z-20 items-center justify-between">
        <SidebarGroupLabel className="w-full flex items-center justify-center">
          <Menu className="text-white" />
        </SidebarGroupLabel>
        <SidebarGroup className="flex flex-col items-center justify-start w-full h-full mt-5 gap-3 p-0">
          {sidebarItem.map(({ Icon, name, route }, i) => {
            return (
              <Link
                to={route}
                key={i}
                className={`${location.pathname === route ? "bg-[#45494f]" : "bg-tra"} flex items-center justify-center w-full hover:bg-[#45494f] rounded-sm p-2`}
              >
                <Icon className={`text-white w-5 h-5`} />
              </Link>
            );
          })}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
