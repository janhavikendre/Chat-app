"use client";

import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/input/input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle, BsFacebook } from "react-icons/bs"; // Add Facebook icon
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Varient = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [varient, setVarient] = useState<Varient>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/users');
        }

    }, [session?.status, router]);

    const toggleVarient = useCallback(() => {
        if (varient === 'LOGIN') {
            setVarient('REGISTER');
        } else {
            setVarient('LOGIN');
        }
    }, [varient]);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (varient === 'REGISTER') {
            axios.post('/api/register', data)
            .then(() => signIn('credentials', data))
            .catch(() => toast.error('Something went wrong'))
            .finally(() => setIsLoading(false));
        }

        if (varient === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false,
        })
        .then((callback) => {
            if (callback?.error) {
                toast.error('Invalid credentials');
            }

            if (callback?.ok && !callback?.error) {
                toast.success('Logged in successfully');
                router.push('/users');
            }
        })
        .finally(() => setIsLoading(false));
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, { redirect: false })
        .then((callback) => {
            if (callback?.error) {
                toast.error('Something went wrong');
            }

            if (callback?.ok && !callback?.error) {
                toast.success('Logged in successfully');
            }
        })
        .finally(() => setIsLoading(false));
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
             
            <div className="bg-white py-8 px-6 shadow sm:rounded-lg sm:px-10">
               

                {/* Form Section */}
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        id="email"
                        label="Email Address"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />

                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />

                    <div className="flex justify-between items-center">
                        <div />
                        <button className="text-purple-600 hover:underline text-sm">
                            Forgot Password
                        </button>
                    </div>

                    {/* Login Button */}
                    <Button
                        disabled={isLoading}
                        type="submit"
                        fullWidth
                        className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
                    >
                        {varient === 'LOGIN' ? 'Login' : 'Register'}
                    </Button>
                </form>

                {/* Social Login */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or Login with
                            </span>
                        </div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="mt-6 flex justify-center gap-4">
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton
                            icon={BsFacebook} // Facebook Login
                            onClick={() => socialAction('facebook')}
                        />
                    </div>
                </div>

                {/* Switch to Register */}
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {varient === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
                    </div>
                    <div
                        onClick={toggleVarient}
                        className="underline cursor-pointer text-purple-600"
                    >
                        {varient === 'LOGIN' ? 'Create an account' : 'Sign in'}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
