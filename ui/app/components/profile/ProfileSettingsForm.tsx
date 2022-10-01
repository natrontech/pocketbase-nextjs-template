import { AtSymbolIcon, CheckBadgeIcon, ExclamationTriangleIcon, FingerPrintIcon, IdentificationIcon, KeyIcon, TrashIcon, UserCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useUserContext } from "../../contexts/userContext";
import InputField from "../general/forms/InputField";
import SubHeading from "../general/typo/SubHeading";
import { User, ClientResponseError } from 'pocketbase';
import { parseUserAvatarUrl } from "../../lib/parser";
import StyledButton, { StyledButtonType } from "../general/buttons/StyledButton";
import Toggle from "../general/forms/Toggle";
import { Fragment, useEffect, useRef, useState } from "react";
import { classNames } from "../../lib/design";
import { Toast, ToastType } from "../alerts/Toast";
import { useRouter } from "next/router";
import Image from "next/image";
import { Dialog, Transition } from '@headlessui/react'

const ProfileSettingsForm = () => {
    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)

    const { user, client, logout }: any = useUserContext();
    const userObj: User = user;
    const router = useRouter();

    const handleSave = () => {
        // get values from input fields
        const displayName = document.getElementById("displayName") as HTMLInputElement;

        // check if values are empty
        if (displayName.value === "") {
            Toast("Please fill in all fields", ToastType.warning);
            return;
        }
    }

    const handleVerifyEmail = async () => {
        await client.users.requestVerification(userObj.email)
            .then(() => {
                Toast("Email sent", ToastType.success);
            })
            .catch((err: ClientResponseError) => {
                Toast(err.message, ToastType.error);
            });
    }

    const handleRequestPasswordReset = async () => {
        await client.users.requestPasswordReset(userObj.email)
            .then(() => {
                Toast("Email sent", ToastType.success);
            })
            .catch((err: ClientResponseError) => {
                Toast(err.message, ToastType.error);
            });
    }

    const handleDeleteAccount = async () => {

        await client.users.delete(userObj.id)
            .then(() => {
                Toast("Account deleted", ToastType.success);
                logout(false);
            })
            .catch((err: ClientResponseError) => {
                Toast(err.message, ToastType.error);
            });
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

            <div
                className="grid sm:grid-cols-2 gap-4 justify-center items-center"
            >
                <div>
                    {
                        userObj?.profile?.avatar && (
                            <Image
                                src={parseUserAvatarUrl(userObj)}
                                className="rounded-full"
                                width={90}
                                height={90}
                                alt="User avatar"
                                loader={({ src }) => src}
                            />
                        )
                    }
                </div>
                <StyledButton
                    name="Request password reset"
                    onClick={handleRequestPasswordReset}
                    type={StyledButtonType.Secondary}
                    icon={KeyIcon}
                    small
                />

            </div>

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
                {
                    userObj?.profile?.name && (
                        <InputField
                            label="Display name"
                            placeholder={userObj?.profile?.name}
                            disabled
                            name="displayName"
                            type="text"
                            required={false}
                            icon={IdentificationIcon}
                        />
                    )
                }

                <div
                    className="relative"
                >
                    <InputField
                        label="Email"
                        placeholder={userObj?.email}
                        disabled
                        name="email"
                        type="email"
                        required={false}
                        icon={AtSymbolIcon}
                    />

                    {
                        !userObj?.verified ? (
                            <div
                                className="absolute flex flex-row gap-1 justify-center items-center text-red-400 right-2 top-2"
                            >
                                <XCircleIcon className="w-4 h-4 inline" />
                                <span className="text-xs ">
                                    Email not verified
                                </span>
                            </div>
                        ) : (
                            <div
                                className="absolute flex flex-row gap-1 justify-center items-center text-green-400 right-2 top-2"
                            >
                                <CheckBadgeIcon className="w-4 h-4 inline" />
                                <span className="text-xs ">
                                    Email verified
                                </span>
                            </div>
                        )
                    }

                    {
                        !userObj?.verified && (
                            <div
                                className="grid w-full sm:grid-cols-2 gap-4 justify-center items-center"
                            >
                                <div />
                                <StyledButton
                                    name="Verify email"
                                    type={StyledButtonType.Secondary}
                                    onClick={handleVerifyEmail}
                                    icon={CheckBadgeIcon}
                                    small
                                />
                            </div>
                        )

                    }
                </div>

                <div
                    className="grid sm:grid-cols-2 gap-4 justify-center items-center"
                >
                    <StyledButton
                        name="Save"
                        type={StyledButtonType.Primary}
                        onClick={handleSave}
                        small
                    />
                    <StyledButton
                        name="Cancel"
                        type={StyledButtonType.Secondary}
                        onClick={handleCancel}
                        className="float-right"
                        small
                    />
                </div>


                <div
                    className=" grid w-full sm:grid-cols-2 gap-4 justify-center items-center"
                >
                    <div />
                    <StyledButton
                        name="Delete account"
                        type={StyledButtonType.Danger}
                        onClick={() => setOpen(true)}
                        className=""
                        icon={TrashIcon}
                        small
                    />
                </div>
            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-20" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                    Delete account
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Are you sure you want to delete your account? All of your data will be permanently
                                                        removed. This action cannot be undone.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-none sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => {
                                                handleDeleteAccount()
                                            }}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>


        </div>
    )
}

export default ProfileSettingsForm;
