import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import useTitle from './hooks/useTitle';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';

import RoutesList from './features/routes/RoutesList'
import NewRouteForm from './features/routes/NewRouteForm'
import InitRoute from './features/routes/InitRoute'
import EditRouteForm from './features/routes/EditRouteForm'
import ViewRoute from './features/routes/ViewRoute'

import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import { ROLES } from './config/roles';
import Register from './features/users/Register';
import ViewUserForm from './features/users/ViewUserForm';

import DriversList from './features/drivers/DriversList';
import NewDriverForm from './features/drivers/NewDriverForm';
import EditDriver from './features/drivers/EditDriver';
import ViewDriverForm from './features/drivers/ViewDriverForm';

import ZonesList from './features/zones/ZonesList';
import EditZone from './features/zones/EditZone';
import NewZone from './features/zones/NewZone';
import ViewZoneForm from './features/zones/ViewZoneForm';

import PointsList from './features/points/PointsList';
import EditPoint from './features/points/EditPoint';
import NewPoint from './features/points/NewPoint';
import ViewPointForm from './features/points/ViewPointForm';

import MapContainer from './features/maps/MapContainer';
import Cookies from './features/users/Cookies';
import Privacy from './features/users/Privacy';

function App() {
  useTitle('UPC')
  return (
    
    <Routes>
                              
      <Route path="/" element={<Layout />}>
        {/* public routes */ }
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="cookies" element={<Cookies />} />
        <Route path="privacy" element={<Privacy />} />
        {/* Protected Routes */ }
        <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
        <Route element={<Prefetch />}>
          <Route path="dash" element={<DashLayout />}>

            <Route index element={<Welcome />} />
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>

            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path=":id" element={<EditUser />} />
              <Route path="new" element={<NewUserForm />} />  
            </Route>

            <Route path="user" >
             <Route path=":id" element={<ViewUserForm />} />
            </Route>
            
            <Route path="drivers">
              <Route index element={<DriversList />} />
              <Route path=":id" element={<EditDriver />} />
              <Route path="new" element={<NewDriverForm />} />
            </Route>

            <Route path="driver" >
             <Route path=":id" element={<ViewDriverForm />} />
            </Route>

            <Route path="zones">
              <Route index element={<ZonesList />} />
              <Route path=":id" element={<EditZone />} />
              <Route path="new" element={<NewZone />} />
            </Route>
            </Route>

            <Route path="zone" >
             <Route path=":id" element={<ViewZoneForm />} />
            </Route>

            <Route path="points">
              <Route index element={<PointsList />} />
              <Route path=":id" element={<EditPoint />} />
              <Route path="new" element={<NewPoint />} />
            </Route>

            <Route path="point" >
             <Route path=":id" element={<ViewPointForm />} />
            </Route>

            <Route path="routes">
              <Route index element={<RoutesList />} />
              <Route path="new" element={<NewRouteForm />} />
              <Route path="init/:id" element={<InitRoute />} />
              <Route path="view/:id" element={<ViewRoute />} />
              <Route path=":id" element={<EditRouteForm />} />
            </Route>

            <Route path="maps">
              <Route index element={<MapContainer />} />
            </Route>
            </Route>
          </Route>{/* End Dash */}
        </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;