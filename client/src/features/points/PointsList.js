import { useGetPointsQuery } from "./pointsApiSlice"
import Point from "./Point"
import useAuth from "../../hooks/useAuth"

const PointsList = () => {

    const { username, isAdmin } = useAuth()
    const {
        data: points,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPointsQuery('pointsList', {
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
        const { ids, entities } = points

        let filteredIds
        if (isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(pointId => entities[pointId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(pointId => <Point key={pointId} pointId={pointId} />)
       
        content = (
            <table className="table tablePoints">
                <thead className="tableThead">
                    <tr>
                        <th scope="col" className="tableTh pointStatus">Estado</th>
                        <th scope="col" className="tableTh pointCreated">Creado</th>
                        <th scope="col" className="tableTh pointZone">Zona</th>
                        <th scope="col" className="tableTh pointTitle">Detalle</th>
                        <th scope="col" className="tableTh pointUsername">Propietario</th>
                        <th scope="col" className="tableTh pointEdit">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {tableContent} */}
                </tbody>
            </table>
        )
    }

    return content
}
export default PointsList