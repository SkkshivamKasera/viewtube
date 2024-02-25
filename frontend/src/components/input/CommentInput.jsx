import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegFaceSmile } from 'react-icons/fa6';
import EmojiPicker from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, replyToComment, replyToReplyesComment } from '../../redux/action/commentAction';

const CommentInput = ({ videoID, commentID, replyedCommentID, commentTo }) => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [commentText, setCommentText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiClick = emojiData => {
    setCommentText(prevInput => prevInput + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const submitHandler = () => {
    switch (commentTo) {
      case 'VIDEO':
        dispatch(addComment(videoID, commentText));
        break;

      case 'REPLY_COMMENT':
        dispatch(replyToComment(videoID, commentID, commentText));
        break;

      case 'REPLYED_COMMENT':
        dispatch(replyToReplyesComment(videoID, commentID, replyedCommentID, commentText));
        break;

      default:
        return;
    }
    setCommentText('');
  };

  return (
    <div className='w-full flex justify-between items-center px-2'>
      <div className='w-10 h-10'>
        <Link to='/channel/me' className='w-full h-full rounded-full'>
          <img src={user && user.avatar} alt='logo' className='w-full h-full rounded-full' />
        </Link>
      </div>
      <div className='w-full px-4 flex flex-col'>
        <div className='w-full'>
          <input
            type='text'
            placeholder='Add a comment'
            className='w-full border border-t-0 border-l-0 border-r-0 border-b-black outline-none'
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
          />
        </div>
        <div className='w-full flex justify-between items-center mt-1 relative'>
          <div className='w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <FaRegFaceSmile />
          </div>
          {showEmojiPicker && (
            <div className='absolute left-10 bottom-0'>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
          <div className='w-auto space-x-2'>
            <button className='px-4 py-2 rounded-3xl cursor-pointer font-semibold bg-red-700 text-white' onClick={() => setCommentText('')}>
              cancel
            </button>
            <button disabled={!commentText} className='px-4 py-2 bg-green-700 rounded-3xl cursor-pointer font-semibold text-white' onClick={submitHandler}>
              comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;