import {FiBarChart, FiLogIn, FiMessageCircle, FiUser} from 'react-icons/fi';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';

const BottomNavigation = () => {
  const authUser = useSelector((state) => state.authUser);

  return (
    <nav className="navigate-bottom">
      <NavLink
        to="/"
        className={({isActive}) =>
          `bottom-item ${isActive ? 'active' : ''}`
        }
      >
        <FiMessageCircle size={12} />
        <p>Threads</p>
      </NavLink>

      <NavLink
        to="/leaderboards"
        className={({isActive}) =>
          `bottom-item ${isActive ? 'active' : ''}`
        }
      >
        <FiBarChart size={12} />
        <p>Leaderboards</p>
      </NavLink>

      {authUser ? (
        <NavLink
          to="/profile"
          className={({isActive}) =>
            `bottom-item ${isActive ? 'active' : ''}`
          }
        >
          <FiUser size={12} />
          <p>Profile</p>
        </NavLink>
      ) : (
        <NavLink
          to="/login"
          className={({isActive}) =>
            `bottom-item ${isActive ? 'active' : ''}`
          }
        >
          <FiLogIn size={12} />
          <p>Login</p>
        </NavLink>
      )}
    </nav>
  );
};

export default BottomNavigation;
