import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note"
import useAuth from "../../hooks/useAuth"

const NotesList = () => {

    const { username, isAdmin } = useAuth()
    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Cargando...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = notes

        let filteredIds
        if (isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(noteId => entities[noteId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />)
       
        content = (
            <table className="table tableNotes">
                <thead className="tableThead">
                    <tr>
                        <th scope="col" className="tableTh noteStatus">Estado</th>
                        <th scope="col" className="tableTh noteCreated">Creado</th>
                        <th scope="col" className="tableTh noteUpdated">Actualizado</th>
                        <th scope="col" className="tableTh noteTitle">Identificador</th>
                        <th scope="col" className="tableTh noteUsername">Propietario:</th>
                        <th scope="col" className="tableTh noteEdit">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default NotesList