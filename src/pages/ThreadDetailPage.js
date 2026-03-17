import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {
  createdComment,
  voteThread,
  clearThreadDetail,
  fetchingThreadDetail,
  voteComment,
} from '../states/threadDetail/action';

import {ThreadDetail} from '../components/thread/threadDetail';
import {Loading} from '../components/common/loading';

export const ThreadDetailPage = () => {
  const {id} = useParams();
  const detailDispatch = useDispatch();

  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);
  const [loading, setLoading] = useState(true);

  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      detailDispatch(fetchingThreadDetail(id));
      setLoading(false);
    };
    fetchData();

    return () => {
      detailDispatch(clearThreadDetail());
    };
  }, [id, detailDispatch]);

  if (loading || !threadDetail) {
    return <Loading />;
  }

  const createComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    detailDispatch(createdComment({
      threadId: id,
      content: comment,
    }));

    setComment('');
  };

  return (
    <ThreadDetail
      thread={threadDetail}
      authUser={authUser}
      comment={comment}
      onCommentChange={(e) => setComment(e.target.value)}
      onCommentSubmit={createComment}
      onVoteThread={(voteType) => detailDispatch(voteThread({
        threadId: id,
        voteType,
      }))}
      onVoteComment={(commentId, voteType) =>
        detailDispatch(voteComment({
          threadId: id,
          commentId,
          voteType,
        }))
      }
    />
  );
};
