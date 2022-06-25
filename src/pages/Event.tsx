import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Video from "../components/Video";
import LessonsProvider from "../hooks/useLessons";
import { useNavigate } from "react-router-dom";

export default function Event(){

    const { slug } = useParams<{ slug:string }>();

    const navigate = useNavigate();

    const { user } = useAuth0();

    if(!user){
        navigate('/')
    }

    return (
        <LessonsProvider>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex flex-1">
                    { slug ? (
                        <Video lessonSlug={slug}/>
                    ) : (
                        <div className="flex-1 flex items-center justify-center min-h-screen">
                            <span className="text-3xl">
                                Selecione uma aula ao lado para começar o aprendizado 👉
                            </span>
                        </div>
                    ) }
                    <Sidebar />
                </main>
            </div>
        </LessonsProvider>
    )
}