import { Navbar, Dropdown, Avatar, Tooltip } from "flowbite-react";
import { BuildingStorefrontIcon, CalendarDaysIcon, ChartPieIcon, TableCellsIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { useRouter } from "next/router";
import { useUserContext } from "../contexts/userContext";
import { User } from 'pocketbase';
import Api from "../config/Api";
import { parseUserAvatarUrl } from "../lib/parser";
import { classNames } from "../lib/design";

const Navigation = () => {

    const router = useRouter();

    const { logout }: any = useUserContext()
    const { user }: any = useUserContext()

    // convert user to User type
    const userObj: User = user;

    const navigation = [
        {
            name: 'dashboard',
            href: '/dashboard',
            current: router.pathname === '/dashboard',
            icon: ChartPieIcon,
        },
        {
            name: 'plans',
            href: '/plans',
            current: router.pathname === '/plans',
            icon: TableCellsIcon,
        },
        {
            name: 'settings',
            href: '/settings',
            current: router.pathname === '/settings',
            icon: WrenchScrewdriverIcon,
        },
    ]

    return (
        <nav className="h-full space-y-8 bg-white shadow-xl w-20 fixed z-20 top-0 left-0 overflow transition-all duration-150 ease-in-out">
            <div
                className="w-46 h-46 mx-auto items-center flex justify-center mt-4 mb-4 cursor-pointer"
                onClick={() => router.push('/dashboard')}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    className="rounded-full"
                    src="/images/logo/pocketbase-nextjs-template-logo.png"
                    alt="User"
                    width={46}
                    height={46}
                // unoptimized={true}
                />
            </div>
            <div className="flex flex-col space-y-8 items-center">
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

                <div className="bottom-4 absolute">
                    <Dropdown
                        arrowIcon={false}
                        inline={true}
                        label={<Avatar alt="User settings" img={parseUserAvatarUrl(userObj)} rounded={false} />}
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">
                                {
                                    userObj?.profile?.name
                                }
                            </span>
                            <span className="block truncate text-sm font-medium">
                                {
                                    userObj?.email
                                }
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Item
                            onClick={() => {
                                router.push('/profile')
                            }}
                        >
                            Settings
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                            onClick={() => logout(false)}
                        >
                            Sign out
                        </Dropdown.Item>
                    </Dropdown>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
