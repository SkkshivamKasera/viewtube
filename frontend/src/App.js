import { Fragment, useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import { EditChannel, EditVideos, Home, Login, MobileCommentsShow, MyProfile, UploadVideoPage, UserProfile, WatchVideo } from "./pages";
import { Header, SideDrawer } from "./components";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProfile } from "./redux/action/userAction";
import { fetchAllVideos } from "./redux/action/videoAction";

function App() {
  const [activeSideDrawerLink, setActiveSideDrawerLink] = useState("home");
  const [ loadVideoDetails, setLoadVideoDetails ] = useState(false)

  const [fetchAll, setFetchAll] = useState(false)

  const drawerRef = useRef(null);
  const barRef = useRef(null);

  const dispatch = useDispatch();

  const { isAuthenticated, error, message } = useSelector(state => state.user);
  const { message: videoMessage, error: videoError } = useSelector(state => state.video);
  const { error: videoDetailsError, message: videoDetailsMessage } = useSelector(state => state.videoDetails);

  const activeSideDrawer = (enable_disable) => {
    const sidedrawer = document.getElementById("sidedrawer");
    if (enable_disable) {
      sidedrawer.classList.remove("-left-1/2");
      sidedrawer.classList.add("left-0");
    } else {
      sidedrawer.classList.remove("left-0");
      sidedrawer.classList.add("-left-1/2");
    }
  };

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if ((drawerRef.current || barRef.current) && (!barRef.current.contains(event.target) && !drawerRef.current.contains(event.target))) {
        activeSideDrawer(false);
      }
    };
    document.addEventListener("click", handleOutSideClick);
    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "CLEAR_ERROR" });
    }
    if (message) {
      toast.success(message)
      dispatch({ type: "CLEAR_MESSAGE" })
    }
    if (videoError) {
      toast.error(videoError);
      dispatch({ type: "CLEAR_ERROR" });
    }
    if (videoMessage) {
      toast.success(videoMessage);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
    if (videoDetailsError) {
      toast.error(videoDetailsError);
      dispatch({ type: "CLEAR_ERROR" });
    }
    if (videoDetailsMessage) {
      toast.success(videoDetailsMessage);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [dispatch, error, message, videoError, videoMessage, videoDetailsError, videoDetailsMessage]);

  useEffect(() => {
    if (!fetchAll) {
      dispatch(fetchMyProfile());
      dispatch(fetchAllVideos());
      setFetchAll(!fetchAll)
    }
  }, [dispatch, fetchAll]);

  return (
    <Fragment>
      {false ? (
        <div>loading</div>
      ) : (
        <Fragment>
          <Header activeSideDrawer={activeSideDrawer} barRef={barRef} isAuthenticated={isAuthenticated} />
          <SideDrawer drawerRef={drawerRef} activeSideDrawerLink={activeSideDrawerLink} setActiveSideDrawerLink={setActiveSideDrawerLink} activeSideDrawer={activeSideDrawer} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/video/watch/:videoID" element={<WatchVideo loadVideoDetails={loadVideoDetails} setLoadVideoDetails={setLoadVideoDetails} />} />
            <Route exact path="/channel/me" element={<MyProfile />} />
            <Route exact path="/channel/user/:userID" element={<UserProfile />} />
            <Route exact path="/video/upload" element={<UploadVideoPage fetchAll={fetchAll} setFetchAll={setFetchAll} />} />
            <Route exact path="/comments" element={<MobileCommentsShow />} />
            <Route exact path="/login" element={<Login isAuthenticated={isAuthenticated} />} />
            <Route exact path="/channel/me/edit/channel" element={<EditChannel />} />
            <Route exact path="/channel/me/edit/videos" element={<EditVideos />} />
          </Routes>
          <Toaster />
        </Fragment>
      )}
    </Fragment>
  );
}

export default App;