'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
    id: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    required?: boolean;
    placeholder?: string;
    type?: string;
}


const MessaageInput: React.FC<MessageInputProps> = ({
    placeholder,
    id,
    register,
    errors,
    required,
    type = "text"
}) => {
    return (
        <div className="relative w-full">
            <input 
            id={id}
            type={type}
            autoComplete={id}
            { ...register(id, { required })}
            placeholder={placeholder}
            className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none">

            </input>
           
        </div>
    )

}

export default MessaageInput;