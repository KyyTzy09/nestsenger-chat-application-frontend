import { CircleDotDashedIcon, Menu } from "lucide-react";
import React from "react";
import { FaComment } from "react-icons/fa";
import { Link, useLocation, useNavigation } from "react-router";

export default function SideBarHome() {
    const location = useLocation()
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

  const navigation = useNavigation()
  return (
    <aside className="fixed flex flex-col w-14 bg-[#202020] h-screen py-10 px-2">
      <div className="w-full flex items-center justify-center">
        <Menu className="text-white" />
      </div>
      <div className="flex flex-col items-center justify-start w-full mt-10 gap-3">
        {sidebarItem.map(({ Icon, name, route }, i) => {
          return (
            <Link to={route} key={i} className={`${location.pathname === route ? "bg-[#45494f]" : "bg-tra"} flex items-center justify-center w-full hover:bg-[#45494f] rounded-sm p-2`}>
              <Icon className={`text-white w-5 h-5`} />
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
