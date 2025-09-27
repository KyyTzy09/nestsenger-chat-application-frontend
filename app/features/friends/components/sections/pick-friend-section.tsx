import { PlugIcon, PlusIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "shared/shadcn/button";
import { Input } from "shared/shadcn/input";
import type { UserType } from "shared/types/user-type";
import SelectUserCard from "~/features/user/components/cards/user-card";

interface pickFriendSectionProps {
  data: UserType[];
  setSelectedUserId: React.Dispatch<React.SetStateAction<string>>;
}

export default function PickFriendSection({
  data,
  setSelectedUserId,
}: pickFriendSectionProps) {
  const [search, setSearch] = React.useState<string>("");
  const [filteredUser, setFilteredUser] = React.useState<UserType[]>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  // Search User
  React.useEffect(() => {
    const keyword = search.toLowerCase();
    const filtered = data?.filter(({ email }) => {
      return email.toLowerCase().includes(keyword);
    });
    setFilteredUser(filtered);
  }, [search, data]);

  React.useEffect(() => {
    setFilteredUser(data);
  }, [data, setSearch, setFilteredUser]);

  return (
    <section className="flex flex-col justify-between w-full gap-5">
      <div className="flex flex-col w-full h-full gap-5">
        <div className="relative flex w-full h-8">
          <Input
            value={search}
            onChange={handleChange}
            className="flex w-full bg-[#404040] border-blue-600 border-b-2 border-t-0 border-x-0 pl-8"
            placeholder="Cari chat atau mulai chat baru"
          />
          <div className="absolute top-0 left-0 flex items-center justify-center w-6 h-full pl-2">
            <SearchIcon className="w-4 h-full" />
          </div>
        </div>
        <div className="flex w-full overflow-y-auto custom-scrollbar">
          <SelectUserCard
            data={filteredUser!}
            setConfirmedUser={setSelectedUserId}
          />
        </div>
      </div>
    </section>
  );
}
