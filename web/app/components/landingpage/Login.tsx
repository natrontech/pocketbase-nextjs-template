import { ArrowLeftOnRectangleIcon, ArrowRightIcon, CodeBracketIcon, EnvelopeIcon, KeyIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import { GithubIcon, GoogleIcon } from "../../lib/Icons";
import { Toast, ToastType } from "../alerts/Toast";
import StyledButton, { StyledButtonType } from "../general/buttons/StyledButton";
import InputField from "../general/forms/InputField";
import Heading from "../general/typo/Heading";
import SubHeading from "../general/typo/SubHeading";
import ExportedImage from "next-image-export-optimizer";

const Login = () => {
    const [provider, setProvider] = useState<any>();

    const { signInWithEmail, client }: any = useUserContext()

    const handleLogin = () => {
        // get values from input fields
        const email = document.getElementById("email") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;

        // check if values are empty
        if (email.value === "" || password.value === "") {
            Toast("Please fill in all fields", ToastType.warning);
            return;
        }

        // login
        signInWithEmail(email.value, password.value, false);
    }

    useEffect(() => {
        const getAuthProviders = async () => {
            const result = await client.users.listAuthMethods();
            setProvider(result);
        }

        getAuthProviders()
            .catch((error) => {
                console.log(error);
            })
    }, [client.users])

    // if enter is pressed, login
    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false);

        return () => {
            document.removeEventListener("keydown", handleKeyDown, false);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const providerNames = provider?.authProviders?.map((provider: any) => provider.name);

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-4">
                <div
                    className="w-46 h-46 mx-auto items-center flex justify-center"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <ExportedImage
                        className="rounded-full"
                        src="/images/logo/pocketbase-nextjs-template-logo.png"
                        alt="User"
                        width={80}
                        height={80}
                    // unoptimized={true}
                    />
                </div>
                <Heading>
                    Pocketbase Next.js Template
                </Heading>
                <SubHeading>
                    App Sign In
                </SubHeading>
                <InputField
                    name="email"
                    label="Email"
                    placeholder="Email"
                    icon={EnvelopeIcon}
                    required={true}
                    type="email"
                />
                <InputField
                    name="password"
                    label="Password"
                    placeholder="Password"
                    icon={KeyIcon}
                    required={true}
                    type="password"
                />
                <StyledButton
                    name="Login"
                    type={StyledButtonType.Primary}
                    icon={ArrowRightIcon}
                    iconAnimation={true}
                    onClick={handleLogin}
                />
                {
                    providerNames?.includes("google") &&
                    <StyledButton
                        name="Login with Google"
                        type={StyledButtonType.Secondary}
                        icon={GoogleIcon}
                        iconAnimation={false}
                        onClick={() => signInWithEmail()}
                    />
                }
                {
                    providerNames?.includes("github") &&
                    <StyledButton
                        name="Login with Github"
                        type={StyledButtonType.Secondary}
                        icon={GithubIcon}
                        iconAnimation={false}
                        onClick={() => signInWithEmail()}
                    />
                }
            </div>
        </div>
    )
}

export default Login
