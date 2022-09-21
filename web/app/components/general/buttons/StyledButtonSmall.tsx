import { SVGProps } from "react";
import { classNames } from "../../../lib/design";

interface StyledButtonProps {
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

const StyledButtonSmall = (props: StyledButtonProps) => {

    const hoverAnimationClasses = classNames(
        props.type === StyledButtonType.Primary ? "active:hover:bg-gray-800 sm:hover:bg-gray-800" : "active:hover:bg-gray-100 sm:hover:bg-gray-100",
        "transition-all duration-150 ease-in-out"
    )
    const defaultStyleClasses = classNames(
        props.type === StyledButtonType.Primary ? "bg-black text-white" : " border-2 border-black text-gray-700",
        "rounded-sm h-8 w-40 overflow-hidden group font-GilroyBold text-xs my-2 relative",
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
            {props.icon && !props.iconAnimation && <props.icon className="h-4 w-4 inline absolute left-4 top-1/2 -translate-y-1/2" />}
            <div
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
            >
                {props.name}
            </div>
            {props.icon && props.iconAnimation && <props.icon className="h-4 w-4 top-1/2 -translate-y-1/2 absolute right-6 group-hover:translate-x-1 transition-all ease-in-out duration-150" />}

        </button>
    )

}

export default StyledButtonSmall