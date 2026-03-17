import {useDispatch} from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';

import useInput from '../hook/useInput';
import {Input} from '../components/common/Input';
import {Button} from '../components/common/Button';

import {asyncLogin} from '../states/auth/action';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const isFormInvalid = !email || !password;

  const onSubmit = async (e) => {
    e.preventDefault();

    const success = await dispatch(asyncLogin({email, password}));

    if (success) {
      navigate('/profile');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={onSubmit}>
        <h2 className="auth-title">Halaman Login</h2>
        <p className="auth-subtitle">Mari masuk ke forum</p>

        <div className="auth-form">
          <span>Email</span>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={onEmailChange}
          />
          <span>Password</span>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={onPasswordChange}
          />

          <Button type="submit" disabled={isFormInvalid}>
            Login
          </Button>
        </div>

        <p className="auth-footer">
          Belum memilii akun?{' '}
          <Link to="/register" className="auth-link">
            Silahkan daftar sekarang
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

