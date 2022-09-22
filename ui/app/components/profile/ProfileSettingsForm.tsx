import { AtSymbolIcon, FingerPrintIcon, IdentificationIcon, KeyIcon, LockClosedIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useUserContext } from "../../contexts/userContext";
import InputField from "../general/forms/InputField";
import SubHeading from "../general/typo/SubHeading";
import { User } from 'pocketbase';
import { parseUserAvatarUrl } from "../../lib/parser";
import StyledButtonSmall from "../general/buttons/StyledButtonSmall";
import { StyledButtonType } from "../general/buttons/StyledButton";
import Toggle from "../general/forms/Toggle";
import { useState } from "react";
import { classNames } from "../../lib/design";
import { Toast, ToastType } from "../alerts/Toast";
import { useRouter } from "next/router";

const ProfileSettingsForm = () => {

    const [requestPasswordReset, setRequestPasswordReset] = useState<boolean>(false);
    const [requestEmailChange, setRequestEmailChange] = useState<boolean>(false);

    const { user }: any = useUserContext();
    const userObj: User = user;
    const router = useRouter();

    const handleSave = () => {
        // get values from input fields
        const displayName = document.getElementById("displayName") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;
        const passwordConfirm = document.getElementById("passwordConfirm") as HTMLInputElement;

        // check if values are empty
        if (displayName.value === "") {
            Toast("Please fill in all fields", ToastType.warning);
            return;
        }

        // save
        console.log("save");
    }

    const handleCancel = () => {
        router.push("/dashboard");
    }

    return (
        <div
            className="max-w-2xl mx-auto mt-10"
        >
            <SubHeading>
                Settings
            </SubHeading>

            <div className="mt-4 flex flex-col gap-4">
                <InputField
                    label="ID"
                    name="id"
                    value={userObj?.profile?.id}
                    disabled
                    icon={KeyIcon}
                    type="text"
                    required={false}
                />
                <InputField
                    label="USERID"
                    name="id"
                    value={userObj?.id}
                    disabled
                    icon={FingerPrintIcon}
                    type="text"
                    required={false}
                />
                <InputField
                    label="Display name"
                    placeholder={userObj?.profile?.name}
                    disabled
                    name="displayName"
                    type="text"
                    required={false}
                    icon={IdentificationIcon}
                />
                <InputField
                    label="Email"
                    placeholder={userObj?.email}
                    disabled
                    name="email"
                    type="email"
                    required={false}
                    icon={AtSymbolIcon}
                />
                <div
                    className="flex flex-row gap-4 justify-center items-center"
                >
                    <img
                        src={parseUserAvatarUrl(userObj)}
                        className="w-24 h-24 rounded-sm"
                    />
                    <InputField
                        label="Avatar"
                        name="profilePicture"
                        type="file"
                        required={false}
                        icon={UserCircleIcon}
                    />
                </div>

                <Toggle
                    label="Request password reset"
                    value={requestPasswordReset}
                    onChange={() => setRequestPasswordReset(!requestPasswordReset)}
                    name="changePassword"
                />

                <Toggle
                    label="Request email change"
                    value={requestEmailChange}
                    onChange={() => setRequestEmailChange(!requestEmailChange)}
                    name="changePassword"
                />

                <div
                    className=""
                >
                    <StyledButtonSmall
                        name="Save"
                        type={StyledButtonType.Primary}
                        onClick={handleSave}
                    />
                    <StyledButtonSmall
                        name="Cancel"
                        type={StyledButtonType.Secondary}
                        onClick={handleCancel}
                        className="float-right"
                    />
                </div>
            </div>
        </div>
    )
}

export default ProfileSettingsForm;
