import React from "react";
import { useUserContext } from "../contexts/userContext";
import { classNames } from "../lib/design";
import Loading from "./Loading";

export default function Layout(props: any) {

    const { user, loading }: any = useUserContext();

    return (
        <div className="h-screen scrollbar-hide">
            {
                user && !loading ? (
                    <div>
                        Navbar
                    </div>
                ) : null
            }


            <main className={classNames(
                user && !loading ? "pt-20" : "pt-0",
                "transition-all duration-150 ease-in-out",
                ""
            )}>
                {React.cloneElement(props.children)}
            </main>
            {
                user && !loading ? (
                    <div>
                        Footer
                    </div>
                ) : null
            }

            {
                loading ? <Loading /> : null
            }
        </div>
    )
}
