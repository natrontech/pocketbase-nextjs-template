import { Navbar, Dropdown, Avatar, Tooltip } from "flowbite-react";
import { Bars3Icon, BellIcon, BuildingStorefrontIcon, CalendarDaysIcon, ChartPieIcon, TableCellsIcon, WrenchScrewdriverIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from "next/router";
import { useUserContext } from "../contexts/userContext";
import { User } from 'pocketbase';
import Api from "../config/Api";
import { parseUserAvatarUrl } from "../lib/parser";
import { classNames } from "../lib/design";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

const Navigation = () => {

    const router = useRouter();

    const { logout }: any = useUserContext()
    const { user }: any = useUserContext()

    // convert user to User type
    const userObj: User = user;

    const navigation = [
        {
            name: 'Dashboard',
            href: '/dashboard',
            current: router.pathname === '/dashboard',
            icon: ChartPieIcon,
        },
        {
            name: 'Plans',
            href: '/plans',
            current: router.pathname === '/plans',
            icon: TableCellsIcon,
        },
        {
            name: 'Settings',
            href: '/settings',
            current: router.pathname === '/settings',
            icon: WrenchScrewdriverIcon,
        },
    ]

    return (
        <nav className="sm:h-full w-full sm:space-y-8 bg-white shadow-xl sm:w-20 fixed z-20 top-0 left-0 overflow transition-all duration-150 ease-in-out">
            <div
                className="w-46 h-46 hidden items-center sm:flex justify-center mt-4 mb-4 cursor-pointer"
                onClick={() => router.push('/dashboard')}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                    className="rounded-full"
                    src="/images/logo/pocketbase-nextjs-template-logo.png"
                    alt="Logo"
                    width={46}
                    height={46}
                    loader={({ src }) => src}
                // unoptimized={true}
                />
            </div>



            {/* MOBILE NAV */}
            <Disclosure as="nav" className="bg-white shadow sm:hidden">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-sm p-2 text-black focus:none border-2 border-black">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>

                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                                                <span className="sr-only">Open user menu</span>
                                                <Image
                                                    className="h-8 w-8 rounded-full"
                                                    src={parseUserAvatarUrl(userObj)}
                                                    alt=""
                                                    width={32}
                                                    height={32}
                                                    loader={({ src }) => src}
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => router.push('/profile')}
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Your Profile
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => logout(false)}
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Sign out
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 pt-2 pb-4">
                                {navigation.map((item, idx) => (
                                    <Disclosure.Button
                                        key={idx}
                                        as="button"
                                        onClick={() => router.push(item.href)}
                                        className={classNames(
                                            item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                            'group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full'
                                        )}
                                    >
                                        <item.icon className="w-8 h-8 text-black inline mr-5" />
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>


            {/* DESKTOP NAV */}
            <div className="sm:flex hidden sm:flex-col sm:space-y-8 sm:items-center">
                {navigation.map((item) => (
                    <div
                        key={item.name}
                        onClick={() => router.push(item.href)}
                    >
                        <Tooltip
                            content={item.name}
                            placement="right"
                            arrow={false}
                        >
                            <div
                                className={classNames(
                                    item.current ? 'border-2 border-black' : '',
                                    "hover:bg-gray-200 group rounded-lg h-12 w-12 flex items-center justify-center cursor-pointer transition-all duration-150 ease-in-out"
                                )}
                            >
                                <item.icon className="w-8 h-8 text-black" />
                            </div>
                        </Tooltip>
                    </div>
                ))}

                <Menu as="div" className="bottom-4 absolute hidden sm:block">
                    <div>
                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-none hover:active:scale-105 transition-all duration-150 ease-in-out">
                            <span className="sr-only">Open user menu</span>
                            <Image
                                className="h-8 w-8 rounded-full"
                                src={parseUserAvatarUrl(userObj)}
                                alt=""
                                width={32}
                                height={32}
                                loader={({ src }) => src}
                            />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute bottom-0 z-50 mb-10 w-48 origin-bottom-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        className="px-4 py-2 text-sm border-b-2 shadow-sm"
                                    >
                                        <div className="">
                                            {
                                                userObj?.profile?.name
                                            }
                                        </div>
                                        <div className="truncatefont-GilroyMedium">
                                            {
                                                userObj?.email
                                            }
                                        </div>
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        onClick={() => router.push('/profile')}
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                    >
                                        Your Profile
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        onClick={() => logout(false)}
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                    >
                                        Sign out
                                    </div>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </nav>
    )
}

export default Navigation
