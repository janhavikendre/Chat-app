"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { BsGithub,  } from "react-icons/bs"; 
import { useRouter } from 'next/navigation';
import Image from 'next/image';



const ChatSphereLanding = () => {
  const router = useRouter()
  return (
    <div className="font-sans text-gray-800 leading-relaxed">

      <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-white/90 backdrop-blur-sm z-50">
        <div className="text-2xl font-bold">
          Chat<span className="text-primary">Sphere</span>
        </div>
        <div className="space-x-2">
          <Button variant="ghost" onClick={()=>router.push("/auth")}>Login</Button>
          <Button onClick={()=>router.push('https://github.com/janhavikendre')}>Github<BsGithub/> </Button>
        </div>
      </nav>

    
      <section className="min-h-screen flex flex-col justify-center items-center text-center p-4 bg-gradient-to-br from-blue-50 to-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 mt-16">
          Connect Instantly with ChatSphere
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mb-8">
          Experience seamless, real-time conversations in an open platform. No friend requests, no barriers—just pure communication.
        </p>
        <div className="space-x-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>
       
        {/* <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            ChatSphere
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            Give your conversations a new dimension with ChatSphere.
          </CardItem>
          <CardItem
            translateZ="100"
            rotateX={20}
            rotateZ={-10}
            className="w-full mt-4"
          >
            <Image
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-20">
            <CardItem
              translateZ={20}
              translateX={-40}
              as="button"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Try now →
            </CardItem>
            <CardItem
              translateZ={20}
              translateX={40}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
              onClick={()=>router.push('/janhavi')}
            >
              Sign up
            </CardItem>
          </div>
        </CardBody>
      </CardContainer> */}
      </section>

   
      


      <footer className="bg-gray-100 py-8 px-4 text-center">
        <div className="flex justify-center space-x-4 mb-4">
      <span className="text-gray-600">Made by Janhavi Kendre</span>
        </div>
        <p className="text-gray-600">&copy; 2025 ChatSphere. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ChatSphereLanding;