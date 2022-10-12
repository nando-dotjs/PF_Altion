import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import RoutesList from './features/routes/RoutesList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import { ROLES } from './config/roles';
import Register from './features/users/Register';
import DriversList from './features/drivers/DriversList';
import NewDriverForm from './features/drivers/NewDriverForm';
import EditDriver from './features/drivers/EditDriver';

function App() {
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
            </Route>

            <Route path="drivers">
              <Route index element={<DriversList />} />
              <Route path=":id" element={<EditDriver />} />
              <Route path="new" element={<NewDriverForm />} />
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