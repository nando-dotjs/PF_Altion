import { useGetCevsQuery } from "./cevsApiSlice"
import Cev from "./Cev"
import useAuth from "../../hooks/useAuth"

const CevsList = () => {

    const { username, isAdmin } = useAuth()
    const {
        data: cevs,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCevsQuery('cevsList', {
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
        const { ids, entities } = cevs

        let filteredIds
        if (isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(cevId => entities[cevId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(cevId => <Cev key={cevId} cevId={cevId} />)
       
        content = (
            <table className="table tableCevs">
                <thead className="tableThead">
                    <tr>
                        <th scope="col" className="tableTh cevStatus">Estado</th>
                        <th scope="col" className="tableTh cevCreated">Creado</th>
                        <th scope="col" className="tableTh cevZone">Zona</th>
                        <th scope="col" className="tableTh cevTitle">Nombre</th>
                        <th scope="col" className="tableTh cevUsername">Propietario:</th>
                        <th scope="col" className="tableTh cevEdit">Editar</th>
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
export default CevsList