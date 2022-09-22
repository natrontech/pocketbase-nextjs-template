import { SVGProps } from "react";
import { classNames } from "../../../lib/design";

export interface StyledButtonProps {
    name: string;
    icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    iconAnimation?: boolean;
    type?: StyledButtonType;
    onClick: () => void;
    className?: string;
}

export enum StyledButtonType {
    Primary = 'primary',
    Secondary = 'secondary',
}

const StyledButton = (props: StyledButtonProps) => {

    const hoverAnimationClasses = classNames(
        props.type === StyledButtonType.Primary ? "active:hover:bg-gray-800 sm:hover:bg-gray-800" : "active:hover:bg-gray-100 sm:hover:bg-gray-100",
        "transition-all duration-150 ease-in-out"
    )
    const defaultStyleClasses = classNames(
        props.type === StyledButtonType.Primary ? "bg-black text-white" : " border-2 border-black text-gray-700",
        "rounded-sm px-11 py-4 w-full h-14 overflow-hidden group  font-GilroyMedium text-sm my-2",
    )

    return (
        <button
            className={classNames(
                defaultStyleClasses,
                hoverAnimationClasses,
                props.className ? props.className : ""
            )}
            onClick={props.onClick}
        >
            {props.icon && !props.iconAnimation && <props.icon className="h-5 w-5 inline mr-2" />}
            {props.name}
            {props.icon && props.iconAnimation && <props.icon className="h-5 w-5 inline ml-2 group-hover:translate-x-1 transition-all ease-in-out duration-150" />}

        </button>
    )

}

export default StyledButton
