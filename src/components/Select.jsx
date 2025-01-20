const Select = ({ name, label, values, selectedValue }) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-darkGray text-sm" htmlFor={`select-${name}`}>
                {label}
            </label>
            <select
                id={`select-${name}`}
                name={name}
                className="px-[10px] py-[14px] cursor-pointer rounded-md border-2 text-purpleGray border-[#E2DDEB] outline-none bg-transparent focus:border-purple"
            >
                {values.map((value, i) => (
                    <option
                        key={i}
                        value={value.id}
                        selected={value === selectedValue}
                    >
                        {value.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
