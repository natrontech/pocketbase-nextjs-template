import { ArrowRightIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import { GithubIcon, GoogleIcon } from "../../lib/Icons";
import { Toast, ToastType } from "../alerts/Toast";
import StyledButton, { StyledButtonType } from "../general/buttons/StyledButton";
import InputField from "../general/forms/InputField";
import Heading from "../general/typo/Heading";
import SubHeading from "../general/typo/SubHeading";
import { classNames } from "../../lib/design";
import { EnvelopeOpenIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { ClientResponseError } from 'pocketbase';
import { validateEmail } from "../../lib/validate";
import Image from "next/image";

const Login = () => {
    const [provider, setProvider] = useState<any>();

    const { signInWithEmail, client }: any = useUserContext()
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const handleLogin = () => {
        // get values from input fields
        const email = document.getElementById("email") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;

        // check if values are empty
        if (email.value === "" || password.value === "") {
            Toast("Please fill in all fields", ToastType.warning);
            document.getElementById("email")?.focus();
            return;
        }

        if (!validateEmail(email.value)) {
            Toast("Please enter a valid email address", ToastType.warning);
            return;
        }

        // login
        signInWithEmail(email.value, password.value, false);
    }

    const handleForgotPassword = async () => {
        // get values from input fields
        const email = document.getElementById("recoverEmail") as HTMLInputElement;

        // check if values are empty
        if (email.value === "") {
            Toast("Please fill in all fields", ToastType.warning);
            document.getElementById("recoverEmail")?.focus();
            return;
        }

        if (!validateEmail(email.value)) {
            Toast("Please enter a valid email address", ToastType.warning);
            return;
        }

        // Request password reset
        await client.users.requestPasswordReset('test@example.com')
            .then(() => {
                Toast("Email sent", ToastType.success);
                // value to ""
                email.value = "";
                setShowForgotPassword(false);
            })
            .catch((error: ClientResponseError) => {
                Toast(error.message, ToastType.error);
            })
    }

    useEffect(() => {
        const getAuthProviders = async () => {
            const result = await client.users.listAuthMethods();
            setProvider(result);
        }

        getAuthProviders()
            .catch((error: ClientResponseError) => {
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
        <div className="flex flex-col min-h-screen justify-center items-center">
            <div className="max-w-md w-full space-y-4 px-4 sm:px-0 overflow-hidden">
                <div
                    className="w-46 h-46 mx-auto items-center flex justify-center"
                >
                    <Image
                        className="rounded-full"
                        src="/images/logo/pocketbase-nextjs-template-logo.png"
                        alt="Logo"
                        width={80}
                        height={80}
                        loader={({ src }) => src}
                    />
                </div>
                <Heading>
                    Pocketbase Next.js Template
                </Heading>
                <div
                    className="relative h-96"
                >
                    <div
                        className={classNames(
                            showForgotPassword ? 'opacity-0 translate-y-3 -z-10 h-0' : 'opacity-100 translate-y-0',
                            "flex flex-col space-y-4 items-center transition-all duration-150 ease-in-out w-full"
                        )}
                    >
                        <SubHeading>
                            App Sign In
                        </SubHeading>
                        <InputField
                            name="email"
                            label="Email"
                            icon={EnvelopeIcon}
                            required={true}
                            type="email"
                        />
                        <InputField
                            name="password"
                            label="Password"
                            icon={LockClosedIcon}
                            required={true}
                            type="password"
                        />

                        <span
                            className="text-sm text-gray-600 text-center cursor-pointer"
                            onClick={() => {
                                setShowForgotPassword(!showForgotPassword);
                            }}
                        >
                            Forgotten Password?
                        </span>

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
                    <div
                        className={classNames(
                            !showForgotPassword ? 'opacity-0 translate-y-3 -z-10 h-0' : 'opacity-100 translate-y-0',
                            "flex flex-col space-y-4 items-center transition-all w-full"
                        )}
                    >
                        <SubHeading>
                            Recover you Password
                        </SubHeading>
                        <InputField
                            name="recoverEmail"
                            label="Email"
                            icon={EnvelopeIcon}
                            required={true}
                            type="email"
                        />

                        <StyledButton
                            name="Send Recovery Link"
                            type={StyledButtonType.Primary}
                            icon={EnvelopeOpenIcon}
                            iconAnimation={false}
                            onClick={handleForgotPassword}
                        />

                        <StyledButton
                            name="Back to Login"
                            type={StyledButtonType.Secondary}
                            onClick={() => {
                                setShowForgotPassword(!showForgotPassword);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
