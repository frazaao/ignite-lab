import { format } from 'date-fns';
import  ptBR  from 'date-fns/locale/pt-BR';

interface CommentaryProps{
    commentary: {
        id: string,
        authorName: string,
        content: string,
        createdAt: Date,
    }
}

export default function Commentary({ commentary }: CommentaryProps){    

    const createdAtDate = new Date(commentary.createdAt)

    const createdAtFormatted = format(createdAtDate, "d' de 'MMMM' • ' k':'mm",{
        locale: ptBR
    });

    return (
        <div className="border rounded border-gray-500 p-8 flex flex-col gap-4">
            <span className="text-blue-500 font-bold">
                { commentary.authorName + ' - ' + createdAtFormatted }
            </span>
            <hr className="border-gray-500" />
            <p className="leading-relaxed">
                { commentary.content }
            </p>
        </div>
    )
}