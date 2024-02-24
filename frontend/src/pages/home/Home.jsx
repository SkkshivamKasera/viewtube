import React from 'react';
import { useSelector } from 'react-redux';
import { VideoCard } from '../../components';

const Home = () => {
  const { videos } = useSelector(state => state.video);

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 place-items-center py-4">
      {videos && videos.map(video => (
        <VideoCard
          key={video._id}
          videoID={video._id}
          channelID={video.user?._id}
          thumbnail={video.thumbnail}
          channel_logo={video.user?.avatar}
          title={video.title}
          channel_name={video.user?.channelName}
          views={video.views}
          createdAt={video.createdAt}
        />
      ))}
    </div>
  );
};

export default Home;