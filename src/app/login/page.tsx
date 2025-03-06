"use client";
import Form from "./Form";


//import { Button, TextInput, Form, PasswordInput } from "@mantine/core";
//import { FcGoogle } from "react-icons/fc";
//import { FaTwitter } from "react-icons/fa";


function LoginPage() {



 return (
   <div className="flex w-full h-screen bg-white">
     {/* Left Side - Form */}
     <div className="w-full flex items-center justify-center lg:w-1/2">
       <Form />
     </div>
      {/* Right Side - Decoration */}
     <div className="hidden lg:flex h-full items-center justify-center bg-gray-200 w-1/2">
       <div className="w-60 h-60 bg-gradient-to-tr from-[#2D68C4] to-[#F2A900] rounded-full animate-bounce" />
       <div className= "w-full h-1/2 absolute"/>
   
     </div>
   </div>
 );
}
export default LoginPage;
