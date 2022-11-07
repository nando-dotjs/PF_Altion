import { useGetRoutesQuery } from "./routesApiSlice"
import Route from './Route'
import useTitle from "../../hooks/useTitle"
import Table from 'react-bootstrap/Table';

const RoutesList = () => {
    useTitle('Lista de Recorridoss')
    const {
        data: routes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRoutesQuery('routesList', {
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

        const { ids } = routes

        const tableContent = ids?.length && ids.map(routeId => <Route key={routeId} routeId={routeId} />)  
        content = (
            <Table className="table tableRoutes">
                <thead className="tableThead">
                    <tr>
                        <th scope="col" className="tableTh routeRoutename">Usuario</th>
                        <th scope="col" className="tableTh routeRoles">Roles</th>
                        <th scope="col" className="tableTh routeEdit">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </Table>
        )
    }

    return content
}
export default RoutesList