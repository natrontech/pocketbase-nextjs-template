import { SVGProps } from "react";

interface InputFieldProps {
    label: string;
    name: string;
    placeholder: string;
    icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    onChange: any;
    required: boolean;
    type: string;
}

const InputField = (props: InputFieldProps) => {
    return (
        <div className="mb-2 relative block bg-gray-200 focus-within:bg-gray-300 w-full group rounded-sm transition-all duration-150 ease-in-out">
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
            <input autoComplete="off" className="w-full bg-transparent border-none focus:ring-0" id={props.name} name={props.name} type={props.type} onChange={props.onChange} required={props.required} />
        </div>
    )
}

export default InputField
