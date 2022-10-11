import { useGetDriversQuery } from "./driversApiSlice"
import Driver from './Driver'

const DriversList = () => {

    const {
        data: drivers,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetDriversQuery('driversList', {
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

        const { ids } = drivers

        const tableContent = ids?.length && ids.map(driverId => <Driver key={driverId} driverId={driverId} />)
          
        content = (
            <table className="table tableDrivers">
                <thead className="tableThead">
                    <tr>
                        <th scope="col" className="tableTh driverName">Nombre</th>
                        <th scope="col" className="tableTh driverSurname">Apellido</th>
                        <th scope="col" className="tableTh driverEdit">Editar</th>
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
export default DriversList