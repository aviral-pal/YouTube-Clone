import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Card";

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]); // to store recommended videos
  const [loading, setLoading] = useState(true); // loading state

  //runs when component mounts or tags change
  useEffect(() => {
    // function to fetch recommended videos from server
    const fetchRecommendedVideos = async () => {
      setLoading(true);
      try {
        // convert array of tags to a comma-separated string
        const formattedTags = Array.isArray(tags) ? tags.join(",") : tags;

        // make GET request to API using tags
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/videos/tags?tags=${formattedTags}`
        );

        setVideos(res.data);
      } catch (err) {
        console.error("Error while fetching recommendations:", err);
      }
      setLoading(false);
    };

    // only call API if tags are available
    if (tags && tags.length > 0) {
      fetchRecommendedVideos();
    }
  }, [tags]);

  return (
    <div className="flex flex-col gap-3 mt-2">
      {/* show loading text when data is fetchimg */}
      {loading && (
        <p className="text-sm text-gray-500">Loading recommendations...</p>
      )}

      {/* show if no videos found */}
      {!loading && videos.length === 0 && (
        <p className="text-sm text-gray-500">No related videos found.</p>
      )}

      {/* show all recommended videos using Card component */}
      {!loading &&
        videos.map((video) => <Card key={video._id} video={video} type="sm" />)}
    </div>
  );
};

export default Recommendation;