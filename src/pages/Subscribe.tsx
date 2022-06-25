import { FormEvent, useState } from "react";
import Header from "../components/Header";
import Logo from "../components/Logo";
import { UserCircle } from "phosphor-react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Subscribe(){

    const { loginWithRedirect } = useAuth0();

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        
    }

    return (
        <>
        <Header />
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
            <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
                <div className="max-w-[640px]">
                    <Logo />

                    <h1 className="mt-8 text-[2.5rem] leading-tight">
                        Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React JS</strong>
                    </h1>

                    <p className="mt-4 text-gray-200 leading-relaxed">
                        Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
                    </p>
                </div>

                <div className="p-8 bg-gray-700 border border-gray-500 rounded">
                    <strong className="text-2xl mb-6 block">Faça login gratuitamente</strong>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">

                        <button
                            onClick={() => {loginWithRedirect()}} 
                            type="submit"
                            className="mt-4 flex items-center justify-center gap-4 bg-green-500 uppercase py-4 rounded font-bold hover:bg-green-700 transition-colors"
                        >
                            <UserCircle size={32} />
                            Fazer login
                        </button>
                    </form>
                </div>
            </div>

            <img src="src/assets/code-mockup.png" className="mt-10" alt="" />
        </div>
        </>
    )
}