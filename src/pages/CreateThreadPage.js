import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import useInput from '../hook/useInput';
import {Input} from '../components/common/Input';
import {Button} from '../components/common/Button';

import {asyncCreateThread} from '../states/thread/action';

export const CreateThreadPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, onTitleChange] = useInput('');
  const [body, onBodyChange] = useInput('');
  const [category, onCategoryChange] = useInput('');

  const isInvalid = !title || !body || !category;

  const onSubmit = async (e) => {
    e.preventDefault();

    await dispatch(asyncCreateThread({
      title,
      body,
      category,
    }));

    navigate('/');
  };

  return (
    <section className="create-thread-page">
      <h2 className="create-thread-title">Buat Diskusi Baru</h2>

      <form className="create-thread-form" onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Judul diskusi"
          value={title}
          onChange={onTitleChange}
        />

        <Input
          type="text"
          placeholder="Kategori"
          value={category}
          onChange={onCategoryChange}
        />

        <textarea
          placeholder="Tulis isi diskusi di sini..."
          value={body}
          onChange={onBodyChange}
          rows={6}
          required
        />

        <Button type="submit" disabled={isInvalid}>
          Buat Thread
        </Button>
      </form>
    </section>
  );
};
