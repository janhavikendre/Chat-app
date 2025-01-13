"use client";

import { MessageCircle } from 'lucide-react';
import AuthForm from './components/AuthForm';
import { IoArrowBackOutline } from "react-icons/io5"; // Import back arrow icon
import { useRouter } from 'next/navigation';


export default function Home() {

  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/landing')
  }

  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <MessageCircle 
        height="48"
        width="48"
        className='mx-auto w-auto'
        />
        
        {/* Back Button */}
        <button onClick={handleGetStarted}
        className="mb-1">
                    <IoArrowBackOutline className="text-2xl cursor-pointer" />
                </button>
                
                {/* Heading Section */}
                <div className="text-center mb-2">
                    <h2 className="text-2xl font-bold">Hello, Welcome Back</h2>
                    <p className="text-gray-500">
                        Happy to see you again, to use your account please login first.
                    </p>
                </div>
        </div>
      <AuthForm />
    </div>
    
  );
}
