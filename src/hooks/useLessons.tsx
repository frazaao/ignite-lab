import { gql, useQuery } from "@apollo/client";
import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";

const GET_LESSON_BY_SLUG_QUERY = gql`
    query GetLessonBySlug($slug: String){
        lesson(where: { slug: $slug }){
            title,
            videoId,
            description,
            teacher{
                bio,
                avatarURL,
                name
            }
        }
        commentaries(where: { lessonSlug: $slug }, stage:DRAFT){
            id,
            authorName,
            content,
            createdAt,
        }
    }
`;

interface GetLessonBySlugResponse {
    lesson: {
        title: string,
        videoId: string,
        description: string,
        teacher: {
            bio: string,
            avatarURL: string,
            name: string,
        }
    },
    commentaries: {
        id: string,
        authorName: string,
        content: string,
        createdAt: Date,
    }[]
}

interface createContextProps {
    data: GetLessonBySlugResponse | undefined,
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

    const { data, refetch } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
        variables: {
            slug,
        }
    });

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