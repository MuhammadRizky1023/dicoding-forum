import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

import useInput from '../hook/useInput';
import {Input} from '../components/common/Input';
import {Button} from '../components/common/Button';

import {asyncRegister} from '../states/auth/action';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const isFormInvalid = !name || !email || !password;

  const onSubmit = async (e) => {
    e.preventDefault();

    const success = await dispatch(asyncRegister({name, email, password}));

    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={onSubmit}>
        <h2 className="auth-title">Halaman Register</h2>
        <p className="auth-subtitle">Mari buat akun forum</p>

        <div className="auth-form">
          <span>Name</span>
          <Input
            placeholder="Nama lengkap"
            value={name}
            onChange={onNameChange}
          />
          <span>email</span>
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
            Daftar
          </Button>
        </div>

        <p className="auth-footer">
          Sudah meimiliki akun?{' '}
          <Link to="/login" className="auth-link">
            Silahkan login di sini
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
