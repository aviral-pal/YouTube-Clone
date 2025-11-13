import { useEffect, useRef, useState } from "react";

// importing icons from Material UI
import {
  Menu as MenuIcon,
  NotificationsNone as NotificationsNoneIcon,
  Search as SearchIcon,
  Mic as MicIcon,
  VideoCallOutlined as VideoCallIcon,
} from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import VideoUpload from "./VideoUpload";
import pp from "../assets/channels4_profile.jpg"; // default profile image

const Navbar = ({ toggleSidebar }) => {
  const [uploadOpen, setUploadOpen] = useState(false); // for upload popup
  const [searchVal, setSearchVal] = useState(""); // for search bar input value
  const [showDrop, setShowDrop] = useState(false); // for show or hide user dropdown menu

  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user); // getting current logged-in user from redux

  // this runs when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // decodedd token
        console.log("Decoded token:", decoded);
      } catch (err) {
        console.warn("Could not decode token. Might be expired.", err.message);
      }
    }
  }, []);

  // handles clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDrop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // logout function
  const signOutUser = () => {
    dispatch(logout());
    setShowDrop(false);
    navigate("/");
  };

  return (
    <>
      {/* top navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow px-4 sm:px-6 py-2 flex items-center justify-between h-16">
        {/* menu icon + logo */}
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar}>
            <MenuIcon className="text-2xl cursor-pointer" />
          </button>
          <Link
            to="/"
            className="text-[22px] font-bold text-red-600 tracking-wide"
          >
            MyTube
          </Link>
        </div>

        {/* search bar  */}
        <div className="hidden sm:flex items-center w-[35%]">
          <div className="flex w-full border border-gray-300 rounded-full overflow-hidden">
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search"
              className="flex-1 px-4 py-2 text-sm text-gray-700 placeholder-gray-500 outline-none"
            />
            <button
              className="px-4 py-2 bg-gray-100 border-l border-gray-300 hover:bg-gray-200"
              onClick={() => navigate(`/search?q=${searchVal}`)}
            >
              <SearchIcon />
            </button>
          </div>
          <MicIcon className="ml-3 p-2 border rounded-full cursor-pointer hover:bg-gray-100" />
        </div>

        {/* upload, notification, and user profile and sign in */}
        <div className="flex items-center gap-5">
          <Link to="/upload">
            <VideoCallIcon className="text-2xl cursor-pointer hover:text-blue-600" />
          </Link>

          <NotificationsNoneIcon className="text-2xl cursor-pointer hover:text-blue-600" />

          {/* if user is logged in, show profile image and dropdown */}
          {currentUser ? (
            <div className="relative">
              <img
                src={currentUser.img || pp} // use user image or default pic
                alt="user avatar"
                onClick={() => setShowDrop(!showDrop)} // toggle dropdown
                className="w-9 h-9 rounded-full object-cover border cursor-pointer hover:ring-2 hover:ring-blue-500"
              />

              {/* dropdown menu */}
              {showDrop && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                >
                  {/* Profile Button */}
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 text-left rounded-t-lg"
                  >
                    Your Channel
                  </button>

                  <div className="border-t border-gray-100" />

                  {/* Sign Out Button */}
                  <button
                    onClick={signOutUser}
                    className="w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 text-left rounded-b-lg"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            // if not logged in, show sign in buttoon (requirement from internshala)
            <Link to="/signin">
              <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-sm text-white rounded-md">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </nav>

      {uploadOpen && <VideoUpload setOpen={setUploadOpen} />}
    </>
  );
};

export default Navbar;
