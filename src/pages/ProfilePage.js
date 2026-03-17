import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {asyncProfile} from '../states/profile/action';
import {Loading} from '../components/common/loading';
import {Avatar} from '../components/common/avatar';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(asyncProfile());
  }, [dispatch]);

  if (!profile) {
    return <Loading />;
  }

  const onLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <section className="profile-page">
      <div className="profile-card">
        <Avatar src={profile.avatar} alt={profile.name} />

        <h2>{profile.name}</h2>
        <p className="profile-email">{profile.email}</p>

        <button className='btn-profile' onClick={onLogout}>
          Logout
        </button>
      </div>
    </section>
  );
};
