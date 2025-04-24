import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import AdminProfile from './pages/AdminProfile';
import Header from './components/Header';

function App() {
  const token = localStorage.getItem('token');
  const roles = JSON.parse(localStorage.getItem('roles') || '[]');

  return( <>
  <Header />
    <Routes>
      
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/profile"
        element={token && !roles.includes('ROLE_ADMIN') ? <Profile /> : <Navigate to="/signin" />}
      />
      <Route
        path="/admin/profile"
        element={token && roles.includes('ROLE_ADMIN') ? <AdminProfile /> : <Navigate to="/signin" />}
      />
      {/* other routes… */}
      <Route path="*" element={<Navigate to={token ? (roles.includes('ROLE_ADMIN') ? '/admin/profile' : '/profile') : '/signin'} />} />
    </Routes>
    </>
  );
}


export default App
