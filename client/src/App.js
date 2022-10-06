import {Routes, Route} from 'react-router-dom'
import DashLayout from './components/DashLayout'
import Layout from './components/Layout'
import Login from './features/auth/Login'
import Public from './components/Public'
import RoutesList from './features/routes/RoutesList'
import Welcome from './features/auth/Welcome'
import UsersList from './features/users/UsersList'


function App() {

  console.log('a')

  return (
   <Routes>
     <Route path="/" element={<Layout/>}>
      <Route index element={<Public/>}/>
      <Route path="login" element={<Login/>}/>

      <Route path="dash" element={<DashLayout/>}>

        <Route index element={<Welcome/>}/>

        <Route path="routes">
          <Route index element={<RoutesList/>}/>
        </Route>

        <Route path="users">
          <Route index element={<UsersList/>}/>
        </Route>

      </Route> {/*End Dash*/}

     </Route>
   </Routes>
  );
}

export default App;
