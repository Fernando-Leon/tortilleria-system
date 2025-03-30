"use client"

import React, { useEffect, useState } from "react"
import SwitchMode from "@/app/ui/components/SwitchMode"
import Image from "next/image"
import { getSession } from "@/app/lib/actions/auth/sessions"
import { logout, getPermissionsByUserId } from "@/app/lib/actions/auth/auth"
import Model from "@/app/ui/components/modal"
import { toast } from "sonner"
import { ChevronDown } from "lucide-react"
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  useDisclosure,
  NavbarContent,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react"

interface Permission {
  id: number
  canCreate: boolean
  canRead: boolean
  canUpdate: boolean
  canDelete: boolean
  name: string
  route: string
}

interface MenuGroup {
  title: string
  items: MenuItem[]
}

interface MenuItem {
  name: string
  route: string
  children?: MenuGroup[]
}

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [menuStructure, setMenuStructure] = useState<MenuGroup[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession()
      const userId = session?.userId ? Number.parseInt(session.userId, 10) : undefined
      const permissions = userId ? await getPermissionsByUserId(userId) : []
      if (session) {
        setUserName(session.name)
        setPermissions(permissions)
      }
    }
    fetchSession()
  }, [])

  useEffect(() => {
    // Process permissions to create menu structure
    if (permissions.length > 0) {
      const accessiblePermissions = permissions.filter((p) => p.canRead)
      const menuStructure = buildMenuStructure(accessiblePermissions)
      setMenuStructure(menuStructure)
    }
  }, [permissions])

  const buildMenuStructure = (permissions: Permission[]): MenuGroup[] => {
    const structure: Record<string, MenuGroup> = {}

    // First pass: identify all top-level sections
    permissions.forEach((permission) => {
      const routeParts = permission.route.split("/").filter(Boolean)
      if (routeParts.length > 0) {
        const topLevel = routeParts[0]
        if (!structure[topLevel]) {
          structure[topLevel] = {
            title: capitalizeFirstLetter(topLevel),
            items: [],
          }
        }
      }
    })

    // Second pass: organize items into their respective sections and subsections
    permissions.forEach((permission) => {
      const routeParts = permission.route.split("/").filter(Boolean)

      if (routeParts.length > 0) {
        const topLevel = routeParts[0]

        if (routeParts.length === 1) {
          // This is a direct item under the top level
          structure[topLevel].items.push({
            name: permission.name,
            route: permission.route,
          })
        } else if (routeParts.length >= 2) {
          // This is a nested item (second level or deeper)
          let currentItems = structure[topLevel].items
          let currentPath = `/${topLevel}`

          // Process each level of nesting except the last one (which is the actual item)
          for (let i = 1; i < routeParts.length - 1; i++) {
            const currentPart = routeParts[i]
            currentPath += `/${currentPart}`

            // Find or create the item at this level
            let currentItem = currentItems.find((item) => item.name.toLowerCase() === currentPart.toLowerCase())

            if (!currentItem) {
              currentItem = {
                name: capitalizeFirstLetter(currentPart),
                route: currentPath,
                children: [
                  {
                    title: "Items",
                    items: [],
                  },
                ],
              }
              currentItems.push(currentItem)
            }

            // Ensure children array exists
            if (!currentItem.children) {
              currentItem.children = [
                {
                  title: "Items",
                  items: [],
                },
              ]
            }

            // Move to the next level
            currentItems = currentItem.children[0].items
          }

          // Add the final item
          currentItems.push({
            name: permission.name,
            route: permission.route,
          })
        }
      }
    })

    return Object.values(structure)
  }

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const handleCloseSession = async () => {
    onClose()
    toast.success("Sesión cerrada correctamente")
    await logout()
  }

  const handleMenuItemClick = (item: string) => {
    if (item === "Log Out") {
      onOpen()
    }
  }

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
  ]

  // Render a top-level dropdown
  const renderTopLevelDropdown = (group: MenuGroup) => {
    return (
      <Dropdown key={group.title} closeOnSelect={false}>
        <NavbarItem>
          <DropdownTrigger>
            <Button
              disableRipple
              className="p-0 bg-transparent data-[hover=true]:bg-transparent"
              endContent={<ChevronDown className="text-small h-4 w-4" />}
              radius="sm"
              variant="light"
            >
              {group.title}
            </Button>
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu aria-label={group.title}>{group.items.map((item) => renderNestedMenuItem(item))}</DropdownMenu>
      </Dropdown>
    )
  }

  // Helper function to render nested menu items recursively
  const renderNestedMenuItem = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      return (
        <DropdownItem key={item.route} className="p-0" textValue={item.name}>
          <Dropdown placement="right-start">
            <DropdownTrigger>
              <div
                className="flex items-center justify-between w-full px-3 py-2 cursor-pointer hover:bg-default-100 rounded-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <span>{item.name}</span>
                <ChevronDown className="text-small w-4 h-4 -rotate-90" />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label={item.name} onClose={(e) => e.stopPropagation()} closeOnSelect={false}>
              {item.children.map((childGroup) => (
                <React.Fragment key={childGroup.title}>
                  {childGroup.items.map((childItem) => renderNestedMenuItem(childItem))}
                </React.Fragment>
              ))}
            </DropdownMenu>
          </Dropdown>
        </DropdownItem>
      )
    } else {
      return (
        <DropdownItem key={item.route} textValue={item.name} onClick={(e) => e.stopPropagation()} className="p-0 rounded-sm">
          <Link href={`/dashboard${item.route}`} className="w-full m-0 px-3 py-2 block hover:bg-default-100 text-sm rounded-sm">
            {item.name}
          </Link>
        </DropdownItem>
      )
    }
  }

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} className="border-gray-200 border-b-1 dark:border-gray-600">
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        </NavbarContent>

        <NavbarContent className="" justify="center">
          <NavbarBrand>
            <Image src="/Icon.svg" alt="Tortilleria" width={40} height={40} />
            <p className="font-bold text-inherit ml-2">Tortilleria</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuStructure.map((group) => renderTopLevelDropdown(group))}
        </NavbarContent>

        <NavbarContent justify="end" className="flex gap-4">
          <NavbarItem className="hidden sm:flex justify-between items-center gap-4">
            {userName ? (
              <>
                <Button
                  color="primary"
                  variant="light"
                  onPress={() => {
                    onOpen()
                  }}
                  className="btn btn-danger"
                >
                  Cerrar sesión
                </Button>
                <span>Bienveni@ {userName}</span>
                <Image src="/icon-profile.png" alt="user" width={35} height={35} className="rounded-full" />
              </>
            ) : (
              <span>No has iniciado sesión</span>
            )}
          </NavbarItem>
          <NavbarItem>
            <SwitchMode />
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {/* Mobile menu structure */}
          {menuStructure.map((group) => (
            <div key={group.title} className="">
              <h3 className="font-bold text-lg">{group.title}</h3>
              {group.items.map((item) => renderMobileMenuItem(item, 0))}
            </div>
          ))}

          {/* Original menu items */}
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"}
                href="#"
                size="sm"
                onClick={() => handleMenuItemClick(item)}
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <Model
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleCloseSession}
        title="Cierre de sesión"
        body="¿Estás seguro de que deseas cerrar sesión?"
      />
    </>
  )
}

// Helper function to render mobile menu items with proper indentation
const renderMobileMenuItem = (item: MenuItem, level: number) => {
  return (
    <div key={item.route} className={``}>
      {item.children && item.children.length > 0 ? (
        <>
          <h4 className="font-semibold">{item.name}</h4>
          {item.children.map((childGroup) => (
            <div key={childGroup.title} className="">
              {childGroup.items.map((childItem) => renderMobileMenuItem(childItem, level + 1))}
            </div>
          ))}
        </>
      ) : (
        <NavbarMenuItem>
          <Link href={`/dashboard${item.route}`} size="sm" className="w-full h-full">
            {item.name}
          </Link>
        </NavbarMenuItem>
      )}
    </div>
  )
}