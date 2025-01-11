'use client';

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Model from "@/app/components/Model";
import Input from "@/app/components/input/input";
import Select from "@/app/components/input/Select";
import Button from "@/app/components/Button";

interface GroupChatModalProps {
    isOpen?: boolean;
    onClose: () => void;
    users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
    isOpen,
    onClose,
    users
}) => {


    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: []
        }
    })

    const members = watch('members');

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/conversations', {
            ...data,
            isGroup: true
        })
        .then(() => {
            router.refresh();
            onClose();
        })
        .catch(() => toast.error('Something went wrong!'))
    }


    return (
       <Model 
       isOpen={isOpen}
       onClose={onClose}
       >
        <form onSubmit={handleSubmit(onSubmit)}>


           <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
                Create a group chat
            </h2>
            <p 
            className="mt-1 text-sm leading-6 text-gray-600">
                Create a chat with more then two person
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
                <Input
                register={register}
                label="Name"
                id="name"
                required
                errors={errors}
                disabled={isLoading}
                />
                <Select
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
                    label: user.name,
                    value: user.id
                }))}
                onChange= {(value) => setValue('members', value, {
                    shouldValidate: true
                })}
                value={members}
                />
            </div>
            </div>
           </div>
           <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button 
            disabled={isLoading}
            type="button"
            onClick={onClose}
            secondary
            >
                cancle
            </Button>
            <Button 
            disabled={isLoading}
            type="submit"
            >
                Create
            </Button>
           </div>

            </form>

       </Model>
    )

}

export default GroupChatModal;