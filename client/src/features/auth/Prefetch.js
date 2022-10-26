import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice';
import { driversApiSlice } from '../drivers/driversApiSlice'
import { cevsApiSlice } from '../cevs/cevsApiSlice';
import { companysApiSlice } from '../companys/companysApiSlice';
import { zonesApiSlice } from '../zones/zonesApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const drivers = store.dispatch(driversApiSlice.endpoints.getDrivers.initiate())
        const cevs = store.dispatch(cevsApiSlice.endpoints.getCevs.initiate())
        const companys = store.dispatch(companysApiSlice.endpoints.getCompanys.initiate())
        const zones = store.dispatch(zonesApiSlice.endpoints.getZones.initiate())
        return () => {
            users.unsubscribe()
            drivers.unsubscribe()
            cevs.unsubscribe()
            companys.unsubscribe()
            zones.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch