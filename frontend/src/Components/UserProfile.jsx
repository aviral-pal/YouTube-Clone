import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Card from "./Card";
import { toast } from "react-toastify";
import { Edit, Delete, Save, Close } from "@mui/icons-material";
import banneryoutube from "../assets/banneryoutube.jpg";
import pp from "../assets/channels4_profile.jpg";

const UserProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  // setting states for videos, channel, editing video and title
  const [videos, setVideos] = useState([]); //for videos
  const [channel, setChannel] = useState(null); //for channe
  const [editingVideo, setEditingVideo] = useState(null); // for edits
  const [newTitle, setNewTitle] = useState(""); // for title

  // will run when the currentUser changes
  useEffect(() => {
    if (currentUser) {
      getUserVideos();
      getChannelData();
    }
  }, [currentUser]);

  // function to fetch user's videos from server
  const getUserVideos = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/videos/user/${currentUser._id}`
      );
      setVideos(res.data);
    } catch (error) {
      console.error("Could not fetch user videos", error);
    }
  };

  // function to fetch user's channel info
  const getChannelData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/channels/${currentUser._id}`
      );
      setChannel(res.data);
    } catch (error) {
      console.warn("Channel data not found", error);
      setChannel(null);
    }
  };

  // delete video function
  const deleteVideo = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/videos/${id}`);
      setVideos((prev) => prev.filter((v) => v._id !== id));
      toast.success("Video removed.");
    } catch (error) {
      console.error("Error deleting the video", error);
    }
  };

  //clicks edit icon on a video
  const startEditing = (video) => {
    setEditingVideo(video._id);
    setNewTitle(video.title);
  };

  // function to update title of a video
  const updateTitle = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/videos/${id}`, {
        title: newTitle,
      });
      setVideos((prev) =>
        prev.map((v) => (v._id === id ? { ...v, title: newTitle } : v))
      );
      setEditingVideo(null);
    } catch (error) {
      console.error("Unable to update video", error);
    }
  };

  // if user is not logged in, show this message
  if (!currentUser) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-xl font-semibold text-gray-700">
          Please sign in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full font-sans pt-20">
      {/* show channel banner and profile picture if channel exists */}
      {channel && (
        <div>
          <div className="relative h-52 w-full bg-gray-200">
            <img
              src={channel.bannerUrl || banneryoutube}
              alt="Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-[-36px] left-14">
              <img
                src={channel.profileUrl || pp}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>

          <div className="pt-16 pl-14 pr-4">
            <h2 className="text-2xl font-bold">{channel.name}</h2>
            <p className="text-sm text-gray-600">
              @{channel.description} • {videos.length} videos
            </p>
            <button className="mt-2 px-5 py-2 text-sm bg-black text-white rounded hover:bg-gray-800 transition">
              Subscribe
            </button>
          </div>
        </div>
      )}

      {/* navigation tabs */}
      <div className="border-b border-gray-300 mt-6 px-14">
        <div className="flex gap-8 text-sm font-medium text-gray-700">
          <button className="py-3 border-b-2 border-black">Videos</button>
          <button className="py-3 hover:text-black">Shorts</button>
        </div>
      </div>

      {/* user uploaded videos */}
      <div className="px-14 mt-8">
        <h3 className="text-xl font-semibold mb-4">Your Uploads</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.length > 0 ? (
            videos.map((video) => (
              <div
                key={video._id}
                className="relative group rounded-lg overflow-hidden"
              >
                <Card video={video} />

                {/* if the video is being edited, show input field */}
                {editingVideo === video._id ? (
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => updateTitle(video._id)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Save />
                    </button>
                    <button
                      onClick={() => setEditingVideo(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <Close />
                    </button>
                  </div>
                ) : (
                  // if not editing, show edit and delete icons on hover
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => startEditing(video)}
                      className="bg-white p-1 rounded-full shadow hover:shadow-md"
                    >
                      <Edit fontSize="small" />
                    </button>
                    <button
                      onClick={() => deleteVideo(video._id)}
                      className="bg-white p-1 rounded-full shadow hover:shadow-md"
                    >
                      <Delete fontSize="small" color="error" />
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            // show message if no videos uploaded
            <p className="text-gray-500">
              You haven't uploaded any videos yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
