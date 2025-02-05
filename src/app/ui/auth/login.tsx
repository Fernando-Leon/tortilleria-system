'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

import { Card, CardHeader, CardBody } from "@heroui/card";    
import { Input } from "@heroui/input";
import EyeSlashFilledIcon from "../../../../public/svg/closeeye";
import EyeFilledIcon from "../../../../public/svg/openeye";

export default function Login() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Credenciales estáticas
  const validUsername = "admin";
  const validPassword = "123456";

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (username === validUsername && password === validPassword) {
      router.push('/dashboard');
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <Card className="w-full max-w-md p-6">
      <CardHeader className="flex flex-col items-center">
        <h2 className="text-3xl font-semibold">Inicio de sesión</h2>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input
          label="Nombre de usuario"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          label="Contraseña"
          placeholder="Ingrese su contraseña"
          type={isVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="bordered"
        />
        
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex flex-col items-center w-full">
          <button
            onClick={handleLogin}
            className="w-full bg-slate-700 hover:bg-slate-800 rounded-lg text-white py-2 text-center transition"
          >
            Iniciar sesión
          </button>
        </div>
      </CardBody>
    </Card>
  );
}
