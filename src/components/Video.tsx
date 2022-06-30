import { DefaultUi, Player, Youtube } from "@vime/react";
import { CaretRight, DiscordLogo, FileArrowDown, Image, Lightning } from "phosphor-react";
import '@vime/core/themes/default.css';
import Commentary from "./Commentary";
import LeaveYourCommentary from "./LeaveYourCommentary";
import { useLessons } from "../hooks/useLessons";

interface VideoProps{
    lessonSlug: string
}

export default function Video({ lessonSlug }: VideoProps){

    const { data } = useLessons();

    if(!data || !data.lesson){
        return(
            <div className="flex-1">
                <p>Carregando...</p>
            </div>
        )
    }

    return (
        <div className="flex-1">
            <div className="bg-black flex justify-center">
                <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
                    <Player>
                        <Youtube videoId={data.lesson.videoId} />
                        <DefaultUi />
                    </Player>
                </div>
            </div>

            <div className="p-8 max-w-[1100px] mx-auto">
                <div className="flex items-start gap-16">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">
                            {data.lesson.title}
                        </h1>
                        <p className="mt-4 text-gray-200 leading-relaxed" dangerouslySetInnerHTML={{__html: data.lesson.description!.html}}>
                        </p>

                        { data.lesson.teacher && 
                        <div className="flex items-center gap-4 mt-6">
                            <img 
                            className="h-16 w-16 rounded-full border-2 border-blue-500"
                                src={data.lesson.teacher.avatarURL}
                                alt="" 
                            />
                            <div className="leading-relaxed">
                                <strong className="font-bold text-2xl block">
                                    {data.lesson.teacher.name}
                                </strong>
                                <span className="text-sm text-gray-200 block">
                                    {data.lesson.teacher.bio}
                                </span>
                            </div>
                        </div> 
                        }
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <a href="#" className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors">
                            <DiscordLogo size={24} />
                            Comunidade do Discord
                        </a>

                        <a href="#" className="p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors">
                            <Lightning size={24} />
                            Acesse o desafio
                        </a>
                    </div>
                </div>

                <div className="gap-8 mt-20 grid grid-cols-2">
                    <a href="#" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
                        <div className="bg-green-700 h-full p-6 flex items-center">
                            <FileArrowDown size={40} />
                        </div>

                        <div className="py-6 leading-relaxed">
                            <strong className="text-2xl">
                                Material complementar
                            </strong>
                            <p className="text-sm text-gray-200 mt-2">
                                Acesse o material complementar para acelerar o seu desenvolvimento
                            </p>
                        </div>

                        <div className="h-full p-6 flex items-center">
                            <CaretRight size={24} />
                        </div>
                    </a>

                    <a href="#" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
                        <div className="bg-green-700 h-full p-6 flex items-center">
                            <Image size={40} />
                        </div>

                        <div className="py-6 leading-relaxed">
                            <strong className="text-2xl">
                                Wallpapers exclusivos
                            </strong>
                            <p className="text-sm text-gray-200 mt-2">
                                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
                            </p>
                        </div>

                        <div className="h-full p-6 flex items-center">
                            <CaretRight size={24} />
                        </div>
                    </a>
                </div>
            </div>
            <div className="p-8 max-w-[1100px] mx-auto flex flex-col gap-8">
                <span className="block text-2xl">
                    Comentários
                </span>

                { data.commentaries.length == 0 && (
                    <div className="text-center border-gray-500 p-8">
                        Ainda não temos nenhum comentário 😐
                    </div>
                )}

                { data.commentaries.map((commentary) => {
                    return <Commentary key={commentary.id} commentary={commentary} />
                }) }
                <LeaveYourCommentary slug={lessonSlug} />
            </div>
        </div>
    )
}