"use client";

import { User } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getFirstTwoCharacters } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Client } from "@/models/Client.model";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState<Client>();

  const getCurrentUser = async () => {
    const res = await axios.get(
      "http://192.168.13.1:8888/CLIENT-SERVICE/api/client/1"
    );
    setUser(res.data);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="flex items-center gap-x-2">
      <div className="text-xs font-light">{user?.email}</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <User className="h-4 w-4 p-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div className="flex items-center gap-x-1">
              <Avatar>
                <AvatarImage className="object-cover" />
                <AvatarFallback>
                  {getFirstTwoCharacters(
                    //@ts-ignore
                    user?.fullName
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col ml-auto">
                <p className="text-xs">{user?.fullName}</p>
                <p className="text-xs font-light">{user?.email}</p>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;
