import { classNames } from "../../../lib/design";

export interface ToggleProps {
    name: string;
    label: string;
    onChange: (value: boolean) => void;
    value: boolean;
}

const Toggle = (props: ToggleProps) => {

    return (
        <div className="">

            <label  className="flex items-center group">
                <div className="relative cursor-pointer">
                    <input
                        type="checkbox"
                        name={props.name}
                        className="hidden peer"
                        onChange={(e) => props.onChange(e.target.checked)}
                        checked={props.value}
                    />
                        <div className="block bg-gray-400 group-hover:bg-gray-500 w-10 h-6 peer-checked:bg-green-400 rounded-full transition-all duration-150 ease-in-out"></div>
                        <div className="dot absolute left-1 top-1 group-active:group-hover:scale-95 bg-white w-4 h-4 rounded-full transition"></div>
                </div>
                <div className="ml-3 text-gray-700 font-GilroyMedium inline">
                    {props.label}
                </div>
            </label>
        </div>
    )

}

export default Toggle;
