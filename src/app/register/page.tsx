"use client";
import Form from "./Form";
import Image from "next/image"; 

function LoginPage() {
  return (
    <div className="flex w-full h-screen ">
      {/* Left Side - Image */}
      <div className=" lg:flex h-full w-1/2 items-center bg-gray-300 justify-center">
        <Image 
            src="/image/couples.jpg"
            alt="Sign Up Illustration"
            layout="intrinsic" 
            width={500}
            height={600}
            className="object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full flex items-center bg-white justify-center lg:w-1/2">
        <Form />
      </div>
    </div>
  );
}

export default LoginPage;
