import { useEffect, useState } from "react";

const Select = ({ name, label, values, selectedValue, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(selectedValue);

    useEffect(() => {
        setSelectedOption(selectedValue);
    }, [selectedValue]);

    const handleChange = (e) => {
        const selectedId = e.target.value;
        setSelectedOption(selectedId);
        onSelect?.(parseInt(selectedId));
    };

    return (
        <div className="flex flex-col gap-1">
            <label className="text-darkGray text-sm" htmlFor={`select-${name}`}>
                {label}
            </label>
            <select
                id={`select-${name}`}
                name={name}
                value={selectedOption}
                className="px-[10px] py-[14px] cursor-pointer rounded-md border-2 text-purpleGray border-[#E2DDEB] outline-none bg-transparent focus:border-purple"
                onChange={handleChange}
            >
                {values.map((value, i) => (
                    <option key={i} value={value.id}>
                        {value.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
