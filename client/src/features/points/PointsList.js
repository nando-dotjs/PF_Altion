import { useGetPointsQuery } from "./pointsApiSlice"
import Point from "./Point"
import useAuth from "../../hooks/useAuth"
import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import useTitle from "../../hooks/useTitle"
import InputGroup from 'react-bootstrap/InputGroup';
import Pagination from 'react-bootstrap/Pagination';
import Swal from "sweetalert2";

const PointsList = () => {

    const [filtroTexto, setTexto] = useState('');
    const [viewInactives,setViewInactives] = useState(false);
    const [page, setPage] = useState(1)
    const navigate = useNavigate()
    useTitle('Lista de Puntos')
    const onChangeText = e => setTexto(e.target.value)
    const onActiveChanged = e => setViewInactives(!viewInactives)

    const { mail, isAdmin } = useAuth()
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

    if (isLoading) content = (
        <div className="loader"></div>
    )

    if (isError) {

        Swal.fire({
            position: 'center',
            icon: 'error',
            title: error?.data?.message,
            showConfirmButton: false,
            timer: 1500
          })
          navigate('/dash')
    }
    
    if (isSuccess) {
        const { ids, entities } = points

        let filteredIds
        let filtroPrendido
        if (isAdmin) {
            if (viewInactives){
                filteredIds = [...ids]
                if (filtroTexto !==  ''){
                    filteredIds = ids.filter(pointId => (entities[pointId].name.toUpperCase()+' '+entities[pointId].zone?.toUpperCase()).includes(filtroTexto.toLocaleUpperCase()))
                    filtroPrendido = true
                } 
            }else{
                filteredIds = ids.filter(userId => (entities[userId].completed===true))
                if (filtroTexto !==  ''){
                    filteredIds = ids.filter(pointId => (entities[pointId].name.toUpperCase()+' '+entities[pointId].zone?.toUpperCase()).includes(filtroTexto.toLocaleUpperCase())&& entities[pointId].completed ===true)
                    filtroPrendido = true
                } 
            }   
        } else {
            filteredIds = ids.filter(pointId => entities[pointId].mail === mail)
            if (filtroTexto !==  ''){
                filteredIds = ids.filter(pointId => (entities[pointId].name.toUpperCase()+' '+entities[pointId].zone?.toUpperCase()).includes(filtroTexto.toLocaleUpperCase()) && entities[pointId].mail === mail)
                filtroPrendido = true
            }
        }

        const tableContent = ids?.length && filteredIds.slice(page*10-10, page*10).map(pointId =>  <Point key={pointId} pointId={pointId} />)
        
        let items = [];

        const handlePage = (n) => {
            setPage(n)
            items = []
        }

        const nextPage = () => {
            if(items.length !== page){
                setPage(page+1)
            }
        }

        const lastPage = () => {
            setPage(items.length)
        }

        const firstPage = () => {
            setPage(1)
        }

        const prevPage = () => {
            if(page !== 1){
                setPage(page-1)
            }
        }

        for (let number = 1; number < (filteredIds.length/10)+1; number++) {
            items.push(number);
        }

        let pagination = items.map(number => <Pagination.Item key={number} active={number === page} onClick={() => handlePage(number)}>{number}</Pagination.Item>)

        if ((!filtroPrendido && filteredIds.length === 0 && !isAdmin) || (isAdmin && ids.length === 0) ) {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'No se encontraron puntos para este usuario',
                showConfirmButton: false,
                timer: 1500
              })
              navigate('/dash');
        }else{
        content = (
            <>

                    <Container>     
                        <br/>
                        <div id="fondoTablaFiltro">
                            <InputGroup.Text>
                                &nbsp; &nbsp; <input className="filtroFiltrar form-control" placeholder="Filtrar" value={filtroTexto} onChange={onChangeText} type="text"></input>
                                &nbsp; &nbsp;
                                {(isAdmin) && <strong className="tituloCheck">Mostrar puntos pendientes: </strong> }
                                {  (isAdmin) && <InputGroup.Checkbox
                                        placeholder="Mostrar puntos pendientes"
                                        className="filterActives"
                                        id="user-active"
                                        name="user-active"
                                        type="checkbox"
                                        value={viewInactives}
                                        onChange={onActiveChanged}
                            />}</InputGroup.Text>    
                        </div>                 
                        <div id="fondoTabla">
                            <Table  striped bordered hover size="sm" className="table tablePoints">
                                <thead>
                                    <tr> 
                                        <th>Estado</th>                                    
                                        <th>Nombre</th>
                                        <th>Zona</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableContent}
                                </tbody>
                            </Table>
                        </div>
                        <Pagination>
                            <Pagination.First onClick={() => firstPage()} />
                            <Pagination.Prev onClick={() => prevPage()} />
                                {pagination}
                            <Pagination.Next onClick={() => nextPage()} />
                            <Pagination.Last onClick={() => lastPage()} />
                        </Pagination>
                    </Container>
                   

            </>

        )}
    }

    return content
}
export default PointsList