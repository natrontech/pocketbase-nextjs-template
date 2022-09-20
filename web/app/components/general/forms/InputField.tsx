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

const InputField = ({ label, name, icon, onChange, required, type }: InputFieldProps) => {
    return (
        <div className="mb-2 block bg-gray-200 focus-within:bg-gray-300 w-full rounded-sm transition-all duration-150 ease-in-out">
            <label className="block pt-2 pl-3 text-xs font-GilroyMedium text-gray-600 uppercase" htmlFor={name}>
                {
                    required ?
                        <>
                            {label} <span className="text-red-600">*</span>
                        </> :
                        label
                }
            </label>
            <input autoComplete="off" className="w-full bg-transparent border-none focus:ring-0" id={name} name={name} type={type} onChange={onChange} required={required} />
        </div>
    )
}

export default InputField