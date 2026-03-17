import {Link, Outlet} from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
const MainLayout = () => {
  return (
    <div className="navigate-layout">
      <header className="navigate-header">
        <Link to='/' className="nav-logo"><h1>Dicoding Forum</h1></Link>
      </header>

      <main className="navigate-content">
        <Outlet/>
      </main>

      <BottomNavigation />
    </div>
  );
};


export default MainLayout;
