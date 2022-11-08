import React from "react";
import { useUserContext } from "../contexts/userContext";
import { classNames } from "../lib/design";
import Footer from "./Footer";
import Loading from "./Loading";
import Navigation from "./Navigation";

export default function Layout(props: any) {

    const { user, loading }: any = useUserContext();

    return (
        <div className="h-screen scrollbar-hide">
            {
                user && !loading ? (
                    <Navigation />
                ) : null
            }

            <main className={classNames(
                user && !loading ? "sm:pl-28 py-10 sm:pr-10 px-5" : "pt-0",
                "transition-all duration-150 ease-in-out overflow-y-scroll scrollbar-hide bg-gray-50",
                "h-screen",
                "fixed w-full top-12 bottom-5",
                "sm:top-0 sm:bottom-0"
            )}>
                {React.cloneElement(props.children)}
            </main>

            {
                user && !loading ? (
                    <Footer />
                ) : null
            }

            {
                loading ? <Loading /> : null
            }
        </div>
    )
}
