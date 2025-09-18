import {
  CircleDotDashedIcon,
  Menu,
  Settings2Icon,
  SettingsIcon,
} from "lucide-react";
import React from "react";
import { FaComment } from "react-icons/fa";
import { Link, useLocation, useNavigation } from "react-router";
import { defaultImage } from "shared/constants/image-default";
import { Button } from "shared/shadcn/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "shared/shadcn/sidebar";
import type { UserType } from "shared/types/user-type";
import ProfileDropDown from "~/features/profile/components/interaction/profile-dropdown";
import { useGetProfile } from "~/features/profile/hooks/profile-hook";

export default function DefaultSideBar() {
  const { data: user } = useGetProfile();
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
    <Sidebar className=" border-none">
      <SidebarContent className="w-16 flex flex-col bg-[#202020] h-screen pt-10 pb-5 px-2 z-20 items-center justify-between">
        <SidebarGroupLabel className="w-full flex items-center justify-center">
          <Menu className="text-white" />
        </SidebarGroupLabel>
        <SidebarGroup className="flex flex-col items-center justify-start w-full h-[70%] mt-5 gap-3 p-0">
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
        <SidebarGroup className="flex flex-col items-center justify-end w-full h-[30%] gap-3 p-0">
          <div
            className={`flex items-center justify-center w-full hover:bg-[#45494f] rounded-sm p-2`}
          >
            <SettingsIcon className={`text-white w-5 h-5`} />
          </div>
          <ProfileDropDown user={user?.data as UserType} />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
