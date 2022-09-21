import { ArrowLeftOnRectangleIcon, ArrowRightIcon, CodeBracketIcon, EnvelopeIcon, KeyIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import { GithubIcon, GoogleIcon } from "../../lib/Icons";
import { Toast, ToastType } from "../alerts/Toast";
import StyledButton, { StyledButtonType } from "../general/buttons/StyledButton";
import InputField from "../general/forms/InputField";
import Heading from "../general/typo/Heading";
import SubHeading from "../general/typo/SubHeading";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [provider, setProvider] = useState<any>();

    const { signInWithEmail, client }: any = useUserContext()

    const handleLogin = () => {
        signInWithEmail(email, password, false)
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

    const providerNames = provider?.authProviders?.map((provider: any) => provider.name);

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-4">
                <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="./images/logo/pocketbase-nextjs-template-logo.png" alt="Template Logo" className="mx-auto h-32 w-auto" />
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
                    onChange={(e: any) => setEmail(e.target.value)}
                    required={true}
                    type="email"
                />
                <InputField
                    name="password"
                    label="Password"
                    placeholder="Password"
                    icon={KeyIcon}
                    onChange={(e: any) => setPassword(e.target.value)}
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
                        onClick={() => signInWithEmail(email, password, true)}
                    />
                }
                {
                    providerNames?.includes("github") &&
                    <StyledButton
                        name="Login with Github"
                        type={StyledButtonType.Secondary}
                        icon={GithubIcon}
                        iconAnimation={false}
                        onClick={() => signInWithEmail(email, password, true)}
                    />
                }
            </div>
        </div>
    )
}

export default Login
