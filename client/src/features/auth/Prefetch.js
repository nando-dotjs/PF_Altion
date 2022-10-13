import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice';
import { driversApiSlice } from '../drivers/driversApiSlice'
import { cevsApiSlice } from '../cevs/cevsApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        //console.log('subscribing')
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const drivers = store.dispatch(driversApiSlice.endpoints.getDrivers.initiate())
        const cevs = store.dispatch(cevsApiSlice.endpoints.getCevs.initiate())
        return () => {
            //console.log('unsubscribing')
            users.unsubscribe()
            drivers.unsubscribe()
            cevs.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch