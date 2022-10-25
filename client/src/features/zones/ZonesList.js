import { useGetZonesQuery } from "./zonesApiSlice"
import Zone from './Zone'
import useTitle from "../../hooks/useTitle"

const ZonesList = () => {
    useTitle('Lista de Zonas')

    const {
        data: zones,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetZonesQuery('zonesList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Cargando...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = zones

        const tableContent = ids?.length && ids.map(zoneId => <Zone key={zoneId} zoneId={zoneId} />)
          
        content = (
            <table className="table tableZones">
                <thead className="tableThead">
                    <tr>
                        <th scope="col" className="tableTh zoneName">Nombre</th>
                        <th scope="col" className="tableTh zoneDetails">Detalles</th>
                        <th scope="col" className="tableTh zoneEdit">Editar</th>
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
export default ZonesList