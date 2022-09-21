import { ArrowRightIcon, EnvelopeIcon, KeyIcon } from "@heroicons/react/24/solid";
import { GithubIcon, GoogleIcon } from "../../lib/Icons";
import StyledButton, { StyledButtonType } from "../general/buttons/StyledButton";
import InputField from "../general/forms/InputField";
import Heading from "../general/typo/Heading";
import SubHeading from "../general/typo/SubHeading";

const Login = () => {
    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-4">
                <div>
                    <img src="./images/logo/pocketbase-nextjs-template-logo.png" alt="Template Logo" className="mx-auto h-32 w-auto" />
                </div>
                <SubHeading>
                    App Sign In
                </SubHeading>
                <InputField
                    name="email"
                    label="Email"
                    placeholder="Email"
                    icon={EnvelopeIcon}
                    onChange={() => { }}
                    required={true}
                    type="email"
                />
                <InputField
                    name="password"
                    label="Password"
                    placeholder="Password"
                    icon={KeyIcon}
                    onChange={() => { }}
                    required={true}
                    type="password"
                />
                <StyledButton
                    name="Login"
                    type={StyledButtonType.Primary}
                    icon={ArrowRightIcon}
                    iconAnimation={true}
                    onClick={() => { console.log("Login") }}
                />
                <StyledButton
                    name="Continue with Google"
                    type={StyledButtonType.Secondary}
                    icon={GoogleIcon}
                    iconAnimation={false}
                    onClick={() => { console.log("Login") }}
                />
                <StyledButton
                    name="Continue with Github"
                    type={StyledButtonType.Secondary}
                    icon={GithubIcon}
                    iconAnimation={false}
                    onClick={() => { console.log("Login") }}
                />
            </div>
        </div>
    )
}

export default Login