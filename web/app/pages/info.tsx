import { NextPage } from "next";
import Link from "next/link";

const Info: NextPage = () => {
    return (
        <div>
            <h1>Info</h1>
            <ul className="list-disc">
                <li
                    className="text-primary hover:text-primary-dark cursor-pointer"
                >
                    <Link href="/">Home</Link>
                </li>
            </ul>
        </div>
    )
}

export default Info;