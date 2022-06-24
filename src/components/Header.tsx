import { useAuth0 } from "@auth0/auth0-react";
import { UserCircle } from 'phosphor-react'
import Logo from "./Logo";

export default function Header(){

    const { loginWithRedirect, user, logout } = useAuth0();

    return (
        <header className="w-full py-5 bg-gray-700 border-b border-gray-600">
            <div className="max-w-[1100px] w-full mx-auto flex items-center justify-between">
                <Logo />
                { user ? (
                    <div 
                        className="cursor-pointer w-8 rounded-full overflow-hidden border border-blue-300"
                        onClick={() => {logout()}}
                    >
                        <img src={user.picture} alt={user.name} />
                    </div>
                ) : (
                    <UserCircle 
                        className="cursor-pointer" 
                        onClick={loginWithRedirect} 
                        size={32}
                    />
                )}
            </div>
        </header>
    )
}