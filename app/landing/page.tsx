'use client';

import Image from 'next/image'
import { useRouter } from 'next/navigation';

export default function Landing() {


    const router = useRouter()

    const handleGetStarted = () => {
        router.push('/')
    }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 px-6">
      <div className="text-center max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Get Closer To <span className="underline">EveryOne</span>
        </h1>
        <p className="text-gray-600 mb-8">
          Helps you to contact everyone with just an easy way
        </p>

        <div className="relative w-full h-0 pb-[95%] mb-8">
          <Image
            src="/images/chat-app1.jpg" 
            alt="Illustration of people"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        <button onClick={handleGetStarted} className="bg-purple-600 text-white py-3 px-8 rounded-full hover:bg-purple-700 transition duration-300 ease-in-out">

          Get Started
        </button>
      </div>
    </div>
  )
}
