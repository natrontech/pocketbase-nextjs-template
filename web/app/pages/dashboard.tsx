import { NextPage } from "next";
import Link from "next/link";
import getConfig from 'next/config';
import Heading from "../components/general/typo/Heading";

const { publicRuntimeConfig: config } = getConfig();

const Dashboard: NextPage = () => {
    const pb_admin_url = config.ENV_API_URL + '/_/';
    return (
        <div>
            <Heading>
                Dashboard
            </Heading>
            <ul className="list-disc">
                <li
                    className="text-primary hover:text-primary-dark cursor-pointer"
                >
                    <a href={pb_admin_url}>PocketBase Login</a>
                </li>
                <li
                    className="text-primary hover:text-primary-dark cursor-pointer"
                >
                    <Link href="/info">Info</Link>
                </li>
            </ul>
        </div>
    )
}

export default Dashboard;
