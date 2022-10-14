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

import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import { ROLES } from './config/roles';
import Register from './features/users/Register';

import DriversList from './features/drivers/DriversList';
import NewDriverForm from './features/drivers/NewDriverForm';
import EditDriver from './features/drivers/EditDriver';

import CevsList from './features/cevs/CevsList';
import EditCev from './features/cevs/EditCev';
import NewCev from './features/cevs/NewCev';

import CompanysList from './features/companys/CompanysList';
import EditCompany from './features/companys/EditCompany';
import NewCompany from './features/companys/NewCompany';

function App() {
  useTitle('UPC')
  return (
    
    <Routes>
    
      <Route path="/" element={<Layout />}>
        {/* public routes */ }
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />

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

            <Route path="drivers">
              <Route index element={<DriversList />} />
              <Route path=":id" element={<EditDriver />} />
              <Route path="new" element={<NewDriverForm />} />
            </Route>
            </Route>

            <Route path="cevs">
              <Route index element={<CevsList />} />
              <Route path=":id" element={<EditCev />} />
              <Route path="new" element={<NewCev />} />
            </Route>

            <Route path="companys">
              <Route index element={<CompanysList />} />
              <Route path=":id" element={<EditCompany />} />
              <Route path="new" element={<NewCompany />} />
            </Route>

            <Route path="routes">
              <Route index element={<RoutesList />} />
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