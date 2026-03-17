import {useDispatch, useSelector} from 'react-redux';
import {fetchingLeaderboards} from '../states/leaderboard/action';
import {Avatar} from '../components/common/avatar';

import {useEffect, useState} from 'react';
import {Loading} from '../components/common/loading';

const crown = ['👑', '🥈', '🥉'];

export const LeaderBoardPage = () => {
  const dispatch = useDispatch();
  const leaderBoards = useSelector((state) => state.leaderboards);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchingLeaderboards());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="leaderpage-board">
      <h2 className="leaderboard-page">Leaderboards</h2>

      <ul className="leaderboard-list">
        {leaderBoards.map((item, index) => (
          <li
            key={item.user.id}
            className={`leaderboard-item ${index < 3 ? 'top-rank' : ''}`}
          >
            <div className="leaderboard-rank">
              {index < 3 ? crown[index] : index + 1}
            </div>

            <Avatar src={item.user.avatar} alt={item.user.name} />

            <div className="leaderboard-user">
              <p className="leaderboard-name">{item.user.name}</p>
              <p className="leaderboard-score">{item.score} point</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
