import {useDispatch, useSelector} from 'react-redux';
import {asyncFetchThreads} from '../states/thread/action';
import {Loading} from '../components/common/loading';
import {ThreadList} from '../components/thread/threadList';
import {useEffect, useState} from 'react';
import {FiPlusSquare} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import {voteThread} from '../states/threadDetail/action';

export const ThreadPage = () => {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads);
  const authUser = useSelector((state) => state.authUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(asyncFetchThreads());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <div>
      <h2>Diskusi tersedia</h2>

      <ThreadList
        threads={threads}
        authUser={authUser}
        onVoteThread={(threadId, voteType) =>
          dispatch(voteThread({threadId, voteType}))
        }
      />
      {authUser && (
        <Link
          className="thread-class-button"
          to="/new"
        >
          <FiPlusSquare size={48} />
        </Link>
      )}
    </div>
  );
};
