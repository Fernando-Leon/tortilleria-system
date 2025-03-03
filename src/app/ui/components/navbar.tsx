'use client';
import React from "react";
import SwitchMode from "@/app/ui/components/SwitchMode";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@heroui/react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="w-full pl-20 pr-20 flex justify-start border-gray-200 border-b-1 dark:border-gray-600"
    >
      <div className="flex-none">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="m-0">
          <Image src="/Icon.svg" alt="Tortilleria" width={40} height={40} />
          <p className="font-bold text-inherit ml-1 text-2xl">Tortilleria</p>
        </NavbarBrand>
      </div>

      <div className="sm:flex gap-4 flex-1 flex items-center">
        <NavbarItem isActive>
          <Link aria-current="page" href="/dashboard">
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem className="opacity-75">
          <Link className="font-thin" color="foreground" href="/dashboard/users">
            Usuarios
          </Link>
        </NavbarItem>
        <NavbarItem className="opacity-75">
          <Link className="font-thin" color="foreground" href="/dashboard/users">
            Sucursales
          </Link>
        </NavbarItem>
        <NavbarItem className="opacity-75">
          <Link className="font-thin" color="foreground" href="/dashboard/users">
            Activos fijos
          </Link>
        </NavbarItem>
      </div>

      <div className="flex-none">
        <SwitchMode />
      </div>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
