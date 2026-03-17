import {useEffect, useState} from 'react';
import api from '../utils/api';

import {Avatar} from '../components/common/avatar';
import {Loading} from '../components/common/loading';

export const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await api.getOwnProfile();
        setProfile(user);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const onLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (loading) {
    return <Loading/>;
  }

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
