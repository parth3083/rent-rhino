"use client";
import { buttonVariants } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import {
  Bell,
  History,
  Home,
  Inbox,
  List,
  LucideIcon,
  Menu,
  Plus,
  Settings,
  Ticket,
  UserCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { ReactNode, useState } from "react";

interface SidebarItem {
  href: string;
  icon: LucideIcon;
  text: string;
}

interface SidebarCategory {
  category: string;
  items: SidebarItem[];
}
const SIDEBAR_ITEMS: SidebarCategory[] = [
  {
    category: "Overview",
    items: [
      {
        href: "/owner-dashboard",
        icon: Home,
        text: "Owner Dashboard",
      },
      {
        href: "/owner-dashboard/maintainence-requests",
        icon: Ticket,
        text: "Maintainence Requests",
      },
    ],
  },
  {
    category: "Property ",
    items: [
      {
        href: "/owner-dashboard/all-properties",
        icon: List,
        text: "All Properties",
      },
      {
        href: "/owner-dashboard/add-property",
        icon: Plus,
        text: "Add Property",
      },
      {
        href: "/owner-dashboard/property-request",
        icon: Inbox,
        text: "Property Requests",
      },
    ],
  },
  {
    category: "Tenants ",
    items: [
      {
        href: "/owner-dashboard/active-tenant",
        icon: UserCheck,
        text: "Active Tenant",
      },
    ],
  },
  {
    category: "Payment ",
    items: [
      {
        href: "/owner-dashboard/payment-history",
        icon: History,
        text: "Payment History",
      },
    ],
  },

  {
    category: "Settings",
    items: [
      {
        href: "/owner-dashboard/notifications",
        icon: Bell,
        text: "Notifications",
      },
      {
        href: "/owner-dashboard/account-settings",
        icon: Settings,
        text: "Account Settings",
      },
    ],
  },
];

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  return (
    <div className="space-y-4 pb-36  md:space-y-6 relative z-20 flex flex-col h-full">
      {/* logo  */}
      <p className="hidden sm:block text-lg/7 font-semibold text-deepBlue-700">
        Rent <span className="text-deepBlue-600">Rhino</span>
      </p>

      {/* Navigation Items  */}
      <div className="flex-grow">
        <ul>
          {SIDEBAR_ITEMS.map(({ category, items }) => (
            <li key={category} className=" md:mb-3">
              <p className="text-xs font-medium leading-6 text-zinc-500">
                {category}
              </p>
              <div className="-mx-2 flex flex-1 flex-col">
                {items.map((item, i) => (
                  <Link
                    href={item.href}
                    key={i}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full justify-start group flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium leading-6 text-zinc-700 hover:bg-gray-50 transition"
                    )}
                    onClick={onClose}
                  >
                    <item.icon className="size-4 text-zinc-500 group-hover:text-zinc-700" />
                    {item.text}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col">
        <hr className="my-4 md:my-6 w-full h-px bg-gray-600" />
        <UserButton
          showName
          appearance={{
            elements: {
              userButtonBox: "flex-row-reverse flex",
            },
          }}
        />
      </div>
    </div>
  );
};

function Layout({ children }: { children: ReactNode }) {
  const [isDrawerOpen, setIsDrawerOPen] = useState(false);

  return (
    <div className="relative h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* side for desktop  */}
      <div className="hidden md:block w-64 lg:w-80 border-r border-gray-100 p-6 h-full text-deepBlue-700 relative z-10">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* mobile header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <p className="text-lg/7 font-semibold text-brand-900">
            Rent<span className="text-deepBlue-600">Rhino</span>
          </p>
          <button
            onClick={() => setIsDrawerOPen(true)}
            className="text-gray-500 hover:text-gray-600"
          >
            <Menu className="size-6" />
          </button>
        </div>

        {/* main content area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 shadow-md p-4 md:p-6 relative z-10">
          <div className="relative min-h-full flex flex-col">
            <div className="h-full flex flex-col flex-1 space-y-4">
              {children}
            </div>
          </div>
        </div>

        <Modal
          className="p-4"
          showModal={isDrawerOpen}
          setShowModal={setIsDrawerOPen}
        >
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg/7 font-semibold text-brand-900">
              Rent<span className="text-deepBlue-600">Rhino</span>
            </p>
            <button
              aria-label="Close modal"
              onClick={() => setIsDrawerOPen(false)}
            >
              <X className="size-6" />
            </button>
          </div>

          <Sidebar />
        </Modal>
      </div>
    </div>
  );
}

export default Layout;
