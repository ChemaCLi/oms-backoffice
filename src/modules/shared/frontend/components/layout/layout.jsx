import { useState } from "react";
import {
  FaChevronLeft,
  FaSitemap,
  FaCodeBranch,
  FaCoins,
  FaTasks,
} from "react-icons/fa";
import { SidebarOptions } from "./sidebar-options";
import { Avatar, BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

/**
 * @param {Object} props
 * @param {React.Element} props.children
 * @param {string} props.title
 * @param {Array<{ label: string, href: string }>} props.breadcrumbs
 */
export const Layout = ({ children, title, breadcrumbs = [] }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white overflow-hidden ${
          isOpen ? "w-64" : "w-0"
        }  transition-all`}
      >
        <div className="w-64">
          <div className="p-4">
            <SidebarOptions
              options={[
                {
                  label: "Microservicios",
                  icon: <FaSitemap />,
                  href: "/microservices-monitor",
                },
                { label: "Logs", icon: <FaTasks />, href: "/logs-monitor" },
                {
                  label: "Ordenes",
                  icon: <FaCoins />,
                  href: "/orders-lifecycle",
                },
                {
                  label: "Subscripciones",
                  icon: <FaCodeBranch />,
                  href: "/subscriptions",
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col bg-gray-200`}>
        {/* Top Bar */}
        <header className="bg-white p-4 shadow flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <button
              onClick={toggleSidebar}
              className={`${isOpen ? "rotate-0" : "rotate-180"} transition-all mr-6`}
            >
              <FaChevronLeft />
            </button>
            {/* A title for the page here and the breacrumbs */}
            <Breadcrumbs>
              {breadcrumbs.map((breadcrumb, index) => (
                <BreadcrumbItem key={index} href={breadcrumb.href}>
                  {breadcrumb.label}
                </BreadcrumbItem>
              ))}
            </Breadcrumbs>
          </div>
          {/* User Menu */}
          <div className="flex items-center">
            <span className="mr-2">HEB Node Team</span>
            <Avatar isBordered color="default" name="HEB" />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};
