import { SVGProps } from "react";
import { classNames } from "../../../lib/design";

export interface InputFieldProps {
    label: string;
    name: string;
    placeholder?: string;
    icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    onChange?: any;
    required: boolean;
    type: string;
    value?: string;
    disabled?: boolean;
}

const InputField = (props: InputFieldProps) => {
    return (
        <div className={classNames(
            props.disabled ? "bg-gray-100 text-gray-400" : "bg-gray-200",
            "mb-2 relative block  focus-within:bg-gray-300 w-full group rounded-sm transition-all duration-150 ease-in-out uppercase"
        )}>
            <label className="block pt-2 pl-3 text-xs font-GilroyMedium text-gray-600 uppercase" htmlFor={props.name}>
                {props.icon && <props.icon className="h-4 w-4 inline mr-2 group-focus-within:text-gray-900 transition-all duration-150 ease-in-out" />}
                {
                    props.required ?
                        <>
                            {props.label} <span className="text-red-600">*</span>
                        </> :
                        props.label
                }
            </label>
            <input autoComplete="off" className="w-full bg-transparent border-none focus:ring-0" disabled={props.disabled} value={props.value} placeholder={props.placeholder} id={props.name} name={props.name} type={props.type} onChange={props.onChange} required={props.required} />
        </div>
    )
}

export default InputField;
