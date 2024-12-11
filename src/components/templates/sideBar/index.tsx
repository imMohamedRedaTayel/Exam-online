 "use client";
import { Store } from "@/types";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { toggleSideBar } from "@/app/appSlice";
import { MdSpaceDashboard } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { showToast, ToastContainer } from "@/utils/swal";

type Props = {};

const Sidebar = (props: Props) => {
  const dispatch = useDispatch();
  const { showSideBar } = useSelector((store: Store) => store.appSlice);
  const pathName = usePathname();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleToggleSidebar = () => {
    dispatch(toggleSideBar(!showSideBar));
  };

  const handleLogout = () => {
    showToast.success("You have successfully logged out.")
    setTimeout(() => {
        signOut({ callbackUrl: "/login" });
    }, 1000);
  };

  const links = [
    
    {
      href: "/dashboard/analysis",
      label: "Dashboard",
      icon: <MdSpaceDashboard />,
    },

    {
      href: "/dashboard/exam",
      label: "Quiz History",
      icon: <FaHistory />,
    },

  ];

  return (
    <>
      <section
        className={`sidebar h-full md:flex flex-col items-center transition-all duration-300 relative ${
          showSideBar ? "md:w-2/12 " : "w-0 md:w-[80px]"
        }`}
      >
        <ToastContainer />

        <div
          className={`bg-[--mainColor] p-2 rounded-full cursor-pointer absolute top-1/2 transform translate-x-1/2 right-0 md:z-10 hidden md:block`}
          onClick={handleToggleSidebar}
        >
          {showSideBar ? (
            <IoMdClose size={20} className="text-white" />
          ) : (
            <IoMdMenu size={20} className="text-white" />
          )}
        </div>

        <aside className="w-full px-2 flex justify-center">
          <ul className="flex flex-col items-start gap-y-[20px] mt-10">
            {links.map((link, index) => (
              <li key={index} className="cursor-pointer">
                <Link
                  href={link.href}
                  className={`flex items-center gap-x-[10px] p-2 rounded-lg group justify-center ${
                    pathName === link.href ? "bg-[--mainColor] text-white " : ""
                  }`}
                >
                  <span
                    className={`text-[24px] text-[--mainColor] ${
                      !showSideBar ? "hidden md:block " : ""
                    } ${
                      pathName === link.href
                        ? "bg-[--mainColor] text-white "
                        : ""
                    }`}
                  >
                    {link.icon}
                  </span>
                  {showSideBar && (
                    <span
                      className={`text-[18px] font-[600] text-[--text-gray] ${
                        pathName === link.href
                          ? "bg-[--mainColor] text-white "
                          : ""
                      }`}
                    >
                      {link.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}

            <li className="cursor-pointer">
              <div
                className={`flex items-center gap-x-[10px] p-2 rounded-lg group justify-center text-[--text-gray]`}
                onClick={() => setIsLogoutModalOpen(true)}
              >
                <span
                  className={`text-[24px] text-[--mainColor] ${
                    !showSideBar ? "hidden md:block" : ""
                  }`}
                >
                  <RiLogoutBoxFill />
                </span>
                {showSideBar && (
                  <span className="text-[18px] font-[600] text-[--text-gray]">
                    Logout
                  </span>
                )}
              </div>
            </li>
          </ul>
        </aside>
      </section>

      <Modal
        show={isLogoutModalOpen}
        size="lg"
        onClose={() => setIsLogoutModalOpen(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to log out?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setIsLogoutModalOpen(false);
                  handleLogout();
                }}
              >
                Yes, log out
              </Button>
              <Button
                color="gray"
                onClick={() => setIsLogoutModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Sidebar;
