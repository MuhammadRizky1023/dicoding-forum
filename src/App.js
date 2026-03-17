import {Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style/global.css';
import LoginPage from './pages/LoginPage';
import {LeaderBoardPage} from './pages/LeaderboardPage';

import MainLayout from './pages/MainLayout';
import RegisterPage from './pages/RegisterPage';
import {ThreadPage} from './pages/ThreadPage';
import {ProfilePage} from './pages/ProfilePage';
import {CreateThreadPage} from './pages/CreateThreadPage';
import {ThreadDetailPage} from './pages/ThreadDetailPage';
import LoadingBar from '@dimasmds/react-redux-loading-bar';

function App() {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <LoadingBar style={{backgroundColor: '#f65a3bff', height: '4px'}}/>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<ThreadPage/>} />
          <Route path='/threads/:id' element={<ThreadDetailPage/>}/>
          <Route path="/leaderboards" element={<LeaderBoardPage />} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path='/new' element={<CreateThreadPage />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
