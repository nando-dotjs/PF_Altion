import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice';
import { driversApiSlice } from '../drivers/driversApiSlice'
import { pointsApiSlice } from '../points/pointsApiSlice';
import { zonesApiSlice } from '../zones/zonesApiSlice';
import { routesApiSlice } from '../routes/routesApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const drivers = store.dispatch(driversApiSlice.endpoints.getDrivers.initiate())
        const zones = store.dispatch(zonesApiSlice.endpoints.getZones.initiate())
        const points = store.dispatch(pointsApiSlice.endpoints.getPoints.initiate())
        const routes = store.dispatch(routesApiSlice.endpoints.getRoutes.initiate())
        return () => {
            users.unsubscribe()
            drivers.unsubscribe()
            zones.unsubscribe()
            points.unsubscribe()
            routes.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch