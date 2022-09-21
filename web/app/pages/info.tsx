import { NextPage } from "next";
import Link from "next/link";
import getConfig from 'next/config';

const { publicRuntimeConfig: config } = getConfig();

const Info: NextPage = () => {
    const pb_admin_url = config.ENV_API_URL + '/_/';
    return (
        <div>
            <h1>Info</h1>
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

export default Info;
