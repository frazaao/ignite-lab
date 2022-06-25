import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { GetLessonBySlugQuery, useGetLessonBySlugQuery } from "../graphql/generated";

interface createContextProps {
    data: GetLessonBySlugQuery | undefined,
    refetch: () => void;
}

const lessonsContext = createContext<createContextProps>({
    data: {
        lesson: {
            title: "",
            videoId: "",
            description: "",
            teacher: {
                bio: "",
                avatarURL: "",
                name: "",
            }
        },
        commentaries: []
    },
    refetch: () => {}
})

interface LessonsProviderProps{
    children: JSX.Element
}

export default function LessonsProvider({children}:LessonsProviderProps) {
    

    const { slug } = useParams<{ slug:string }>()

    const { data, refetch } = useGetLessonBySlugQuery({
        variables: {
            slug
        }
    })

    return (
        <lessonsContext.Provider value={{ data, refetch }}>
            { children }
        </lessonsContext.Provider>
    )
}

export function useLessons(){
    const { data, refetch } = useContext(lessonsContext)

    return { data, refetch }
}