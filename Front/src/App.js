import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomLoader from './components/Loader/Loader';
import ProtectRoutes from './components/ProtectRoutes/ProtectRoutes'

const wait = (delay) => new Promise(resolve => setTimeout(resolve, delay));

// Lazy loading components

const LazySign = lazy(() => wait(2000).then(() => import('./components/Sign/Sign')));
const LazyMainComponent = lazy(() => wait(1000).then(() => import('./utilisateur/Main_component')));
const LazyProfileUser = lazy(() => wait(1000).then(() => import('./utilisateur/Profile/Profile')));


const UserLayout = ({ children }) => (
  <Suspense fallback={<CustomLoader />}>
    <ProtectRoutes>
      <LazyMainComponent />
      {children}
    </ProtectRoutes>
  </Suspense>
);

const App = () => {
  return (
    <Routes>
      <Route 
        path='/' 
        element={
          <Suspense fallback={<CustomLoader />}>
            <LazySign />
          </Suspense>
        } 
      />
      
      {/* User routes */}
      <Route path='/user' element={<UserLayout />}>
        <Route 
          path='profile'
          element={<LazyProfileUser />}
        />
      </Route>
      
    </Routes>
  );
};

export default App;