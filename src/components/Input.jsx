import React, { useState } from 'react';
import { HiEye, HiEyeOff } from "react-icons/hi";

const Input = ({ name, label, placeholder, type, value, onChange }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    const isPassword = type === 'password';
    const inputType = isPassword && isPasswordVisible ? 'text' : type;

    return (
        <div className="flex flex-col gap-1 relative">
            <label className="text-darkGray text-sm" htmlFor={`input-${name}`}>
                {label}
            </label>
            <div className="relative">
                <input
                    type={inputType}
                    id={`input-${name}`}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className="py-[10px] pl-3 pr-10 rounded-md border-2 text-purpleGray border-[#E2DDEB] outline-none bg-transparent focus:border-purple w-full"
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purpleGray"
                        aria-label={isPasswordVisible ? 'Esconder senha' : 'Mostrar senha'}
                    >
                        {isPasswordVisible ? (<HiEyeOff className='w-5 h-5'/>) : (<HiEye className='h-5 w-5'/>)}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;
