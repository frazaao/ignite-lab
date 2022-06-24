import { gql, useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { FormEvent, useState } from "react";
import { useLessons } from "../hooks/useLessons";

const CREATE_COMMENTARY_QUERY = gql`
    mutation CreateCommentary($content: String!, $authorName: String!, $lessonSlug: String){
        createCommentary(data: {
            authorName: $authorName, 
            content: $content,
            lessonSlug: $lessonSlug
        }){
            id
        }
    }
`;


export default function LeaveYourCommentary({slug = ""}){

    const { refetch } = useLessons();

    const { user, loginWithRedirect } = useAuth0();

    const [ commentary, setCommentary ] = useState("");

    const [ createCommentary, { loading } ] = useMutation(CREATE_COMMENTARY_QUERY);

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        await createCommentary({
            variables: {
                content: commentary,
                authorName: user?.name,
                lessonSlug: slug
            }
        })

        refetch()
    }

    if(!user){
        return(
            <div className="text-center mb-4">
                <span>
                    Faça <a href="#" className="text-blue-500 font-bold" onClick={() => {loginWithRedirect()}}>login</a> e deixe um comentário
                    </span>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="flex">
            <textarea
            className="p-8 bg-gray-900 text-gray-200 outline-none resize-none flex-1 border-y border-l border-gray-500 rounded"
            name="commentary"
            id="commentary"
            placeholder="Deixe aqui o seu comentário"
            cols={30}
            rows={3}
            value={commentary}
            onChange={(e) => { setCommentary(e.target.value) }}
            />

            <button 
            className={`w-100 block ${ loading ? "bg-green-700" : "bg-green-500" } rounded-r p-4 uppercase hover:bg-green-700`}
            type="submit"
            disabled={loading}
            >
                Enviar
            </button>
        </form>
    )
}