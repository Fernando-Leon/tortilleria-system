'use client'
import React from "react";
import Link from 'next/link'

import {Card, CardHeader, CardBody } from "@heroui/card";    
import {Input} from "@heroui/input";
import EyeSlashFilledIcon from "../../../../public/svg/closeeye";
import EyeFilledIcon from "../../../../public/svg/openeye";

export default function Login() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Card className="w-full max-w-md">       
        <CardHeader className="flex flex-col items-center">
            <h2 className="text-3xl">Inisio de sesion</h2>
        </CardHeader>
        <CardBody className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input label="Nombre de usuario" type="text" />
            <Input
      endContent={
        <button
          aria-label="toggle password visibility"
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      label="Password"
      placeholder="Enter your password"
      type={isVisible ? "text" : "password"}
      variant="bordered"
    />
    <div className="flex flex-col items-center w-full">
            <Link className="pr-12 pl-12 pb-4 pt-4 bg-slate-700 rounded-lg text-center text-white" href={`/dashboard`}>Iniciar sesion</Link>
    </div>
        </CardBody>
    </Card>
  );
}