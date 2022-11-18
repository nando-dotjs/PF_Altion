import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useAuth from '../../hooks/useAuth'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Row, Col, Table} from 'react-bootstrap';
import { selectRouteById, useUpdatePointsMutation } from './routesApiSlice'
import Point from './Point'
import './initRoute.css';
import Swal from "sweetalert2"

const InitRoute = () => {

    const { username, isAdmin, isCEV, isEmpresa } = useAuth()

    const { id } = useParams()

    const route = useSelector(state => selectRouteById(state, id))

    const [pointsList, setPointsList] = React.useState(route.points)

    console.log(pointsList)

    const date = new Date()
    const today = new Intl.DateTimeFormat('es-UY', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const [updatePoints, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdatePointsMutation()

    const handlePoints = (p, a) => {
        const current = new Date();
        const time = current.toLocaleTimeString("es-UY");
        let auxArray = [...pointsList]
        for (let o in auxArray) {
            if (auxArray[o].point === p._id) {
                auxArray[o] = {point: p._id, collected:true, amountCollected: a, timeCollected: time}
            }
        }
        //pointsList.push({point: p, amountCollected: a, timeCollected: time})
        setPointsList(auxArray)
    } 

    React.useEffect(() => {
        onSavePointsClicked();
    }, [pointsList])

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    })

    const onSavePointsClicked = async (e) => {
            await updatePoints({ id, points: pointsList})
                // .then((response) => {
                //     if(response.error){
                //         Toast.fire({
                //             icon: 'error',
                //             title: response.error.data.message
                //         })
                //     } else {
                //         Toast.fire({
                //             icon: 'info',
                //             title: response.data.message
                //           })
                //     }
                // })
       
    }

    const tableContent = route.points?.length && route.points.map(p => <Point key={p.point} pointId={p.point} amount={p.amountCollected} handlePoint={handlePoints}/>)  



    const content = (
        <Container fluid>
            <Row className={'containerRow'}>
                <Table className="table tableRoutes">
                    <thead className="tableThead">
                        <tr>
                            <th scope="col" className="tableTh pointName">Punto</th>
                            <th scope="col" className="tableTh pointVisited">Visitado</th>
                                <th scope="col" className="tableTh pointAmount">Bolsones Recolectados</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </Table>
                <button onClick={() => onSavePointsClicked()}>Confirmar</button>
            </Row>
            
                
        </Container>

    )

    return content
}

export default InitRoute