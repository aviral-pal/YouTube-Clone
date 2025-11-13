import {
  HomeOutlined,
  SubscriptionsOutlined,
  VideoLibraryOutlined,
  PersonOutline,
  ChevronRight,
  MusicNoteOutlined,
  StorefrontOutlined,
  LiveTvOutlined,
  SportsEsportsOutlined,
  HistoryOutlined,
  PlaylistPlayOutlined,
  WhatshotOutlined,
  MovieOutlined,
  SettingsOutlined,
  FlagOutlined,
  HelpOutline,
  FeedbackOutlined,
  SmartDisplayOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, isLargeScreen }) => {
  // Menu list for main navigationns
  const sidebarItems = [
    { id: 1, name: "Home", icon: <HomeOutlined />, path: "/" },
    { id: 2, name: "Your Channel", icon: <PersonOutline />, path: "/channel" },
    { id: 3, name: "Subscription", icon: <SubscriptionsOutlined />, path: "/subscriptions",
    },
  ];

  // User related menu items
  const sidebarItems2 = [
    { id: 1, name: "Shorts", icon: <SmartDisplayOutlined /> },
    { id: 2, name: "History", icon: <HistoryOutlined /> },
    { id: 3, name: "Playlists", icon: <PlaylistPlayOutlined /> },
    { id: 4, name: "Your Videos", icon: <VideoLibraryOutlined /> },
  ];

  // Explore section items
  const sidebarItems3 = [
    { id: 1, name: "Trending", icon: <WhatshotOutlined /> },
    { id: 2, name: "Shopping", icon: <StorefrontOutlined /> },
    { id: 3, name: "Music", icon: <MusicNoteOutlined /> },
    { id: 4, name: "Films", icon: <MovieOutlined /> },
    { id: 5, name: "Live", icon: <LiveTvOutlined /> },
    { id: 6, name: "Gaming", icon: <SportsEsportsOutlined /> },
  ];

  // Footer settings help items
  const sidebarItems5 = [
    { id: 1, name: "Settings", icon: <SettingsOutlined /> },
    { id: 2, name: "Report History", icon: <FlagOutlined /> },
    { id: 3, name: "Help", icon: <HelpOutline /> },
    { id: 4, name: "Send Feedback", icon: <FeedbackOutlined /> },
  ];

  return (
    <aside
      className={`
        bg-white fixed top-16 left-0 h-[calc(100vh-4rem)] overflow-y-auto z-40 shadow-md
        transition-transform duration-300
        ${isOpen ? "translate-x-0 w-64" : "-translate-x-full"}
        ${isLargeScreen ? "lg:translate-x-0 lg:w-64" : ""}
      `}
    >
      <nav className="pt-6 px-4 space-y-6 text-sm text-gray-700">
        {/* Main Navigation Section */}
        <div className="space-y-2">
          {sidebarItems.map((item) => (
            <Link key={item.id} to={item.path}>
              <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100">
                <div className="text-lg">{item.icon}</div>
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Divider line */}
        <div className="my-4 border-t border-gray-300" />

        {/* Your content section */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2 font-medium text-gray-900">
            <span>You</span>
            <ChevronRight />
          </div>
          {sidebarItems2.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="text-lg">{item.icon}</div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Divider line */}
        <div className="my-4 border-t border-gray-300" />

        {/* Explore Section */}
        <div className="space-y-2">
          <div className="font-semibold px-2 text-gray-900">Explore</div>
          {sidebarItems3.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="text-lg">{item.icon}</div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Divider line */}
        <div className="my-4 border-t border-gray-300" />

        {/* Settings & Feedback Section */}
        <div className="space-y-2">
          {sidebarItems5.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="text-lg">{item.icon}</div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <footer className="text-xs text-gray-500 pt-4 leading-relaxed">
          <p>
            Terms · Privacy · Policy & Safety
            <br />
            How MyTube works
            <br />
            Test new features
          </p>
          <p className="font-medium mt-4">© Aviral Pal</p>
        </footer>
      </nav>
    </aside>
  );
};

export default Sidebar;
