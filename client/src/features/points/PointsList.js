import { useGetPointsQuery } from "./pointsApiSlice"
import Point from "./Point"
import useAuth from "../../hooks/useAuth"
import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container";

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

    const date = new Date()
    const today = new Intl.DateTimeFormat('es-UY', { dateStyle: 'full', timeStyle: 'long' }).format(date)


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
            <Container>
            <section className="welcome">
                   <div id="fechaDiv" className="">

                       <p>{today}</p>

                   </div>
               </section>
           <br />
           <div id="fondoTabla">

               <Table striped bordered hover size="sm" className="table tableUsers">
                   <thead>
                       <tr>
                           <th>Estado</th>
                           <th>Creado</th>
                           <th>Zona</th>
                           <th>Nombre</th>
                           <th>Propietario</th>
                           <th>Acciones</th>
                       </tr>
                   </thead>
                   <tbody>
                       {tableContent}
                   </tbody>
               </Table>
               
           </div>
          
       </Container>
          
        )
    }

    return content
}
export default PointsList