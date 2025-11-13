import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "./Card";

const Search = () => {
  // state to store videos that match search
  const [videos, setVideos] = useState([]);
  // get current logged in user from redux store
  const { currentUser } = useSelector((state) => state.user);
  // get the search query from URL
  const query = useLocation().search;

  // when currentuser changes run this
  useEffect(() => {
    if (!currentUser) return;

    // async function to get search results from server
    const fetchSearchResults = async () => {
      try {
        // call backend API with the search query
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/videos/search${query}`
        );

        if (response && response.data) {
          setVideos(response.data);
        } else {
          setVideos([]);
        }
      } catch (err) {
        console.log("Something went wrong while searching:", err);
      }
    };

    fetchSearchResults();
  }, [query, currentUser]);

  return (
    // container for videos
    <div className="flex flex-wrap gap-2 p-2 mt-16">
      {videos.length > 0 ? (
        // show each video inside Card component
        videos.map((video) => (
          <div key={video._id} className="w-60">
            <Card video={video} />
          </div>
        ))
      ) : (
        // if no videos found, show this message
        <p className="w-full text-center mt-4 text-gray-600 dark:text-gray-400">
          Nothing found for this search.
        </p>
      )}
    </div>
  );
};

export default Search;
