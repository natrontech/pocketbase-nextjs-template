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
                user && !loading ? "pl-28 pt-10 pr-10" : "pt-0",
                "transition-all duration-150 ease-in-out overflow-y-scroll scrollbar-hide bg-gray-50",
                "h-screen"
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
