import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { CalendarDaysIcon, ChartPieIcon } from '@heroicons/react/24/solid';
import { useRouter } from "next/router";
import { useUserContext } from "../contexts/userContext";
import { User } from 'pocketbase';
import Api from "../config/Api";
import { parseUserAvatarUrl } from "../lib/parser";

const Navigation = () => {

    const router = useRouter();

    const { logout }: any = useUserContext()
    const { user }: any = useUserContext()

    // convert user to User type
    const userObj: User = user;

    const navigation = [
        {
            name: 'navpoint1',
            href: '#',
            current: router.pathname === '/',
            icon: ChartPieIcon,
        },
        {
            name: 'navpoint2',
            href: '#',
            current: router.pathname === '/navpoint2',
            icon: CalendarDaysIcon,
        },
    ]

    return (
        <Navbar
            fluid={true}
            rounded={true}
        >
            <Navbar.Brand href="https://flowbite.com/">

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Flowbite
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label={<Avatar alt="User settings" img={parseUserAvatarUrl(userObj)} rounded={true} />}
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
                    <Dropdown.Item>
                        Settings
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                        onClick={() => logout(false)}
                    >
                        Sign out
                    </Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                {navigation.map((item) => (
                    <Navbar.Link
                        href={item.href}
                        key={item.name}
                        active={item.current}
                    >
                        <item.icon className="w-5 h-5 mr-2 inline" />
                        {item.name}
                    </Navbar.Link>
                ))}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation
