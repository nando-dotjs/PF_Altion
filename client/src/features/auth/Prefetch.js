import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice';
import { driversApiSlice } from '../drivers/driversApiSlice'
import { cevsApiSlice } from '../cevs/cevsApiSlice';
import { companysApiSlice } from '../companys/companysApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const drivers = store.dispatch(driversApiSlice.endpoints.getDrivers.initiate())
        const cevs = store.dispatch(cevsApiSlice.endpoints.getCevs.initiate())
        const companys = store.dispatch(companysApiSlice.endpoints.getCompanys.initiate())
        
        return () => {
            users.unsubscribe()
            drivers.unsubscribe()
            cevs.unsubscribe()
            companys.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch