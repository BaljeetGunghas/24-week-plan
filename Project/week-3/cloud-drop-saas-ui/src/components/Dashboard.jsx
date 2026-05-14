import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { getTokenKey } from "../utils/constant";
import { getDashboardStatsApi } from "../api/dashboard";
import UploadModal from "./DashboardComponent/UploadModal";
import Asside from "./DashboardComponent/Asside";
import Setting from "./DashboardComponent/Setting";
import MyFiles from "./DashboardComponent/MyFiles";

import { updateStatesActionReducer } from "../redux/slice/statsSlice";
import { useDispatch, useSelector } from "react-redux";

import { getFilesApi } from "../api/file";
import {
  updateFilesActionReducer,
  updateFilesLoadingActionReducer,
} from "../redux/slice/fileSlice";
import Pagination from "./DashboardComponent/Pagination";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { totalPages = 1 } = useSelector((state) => state.files);

  const [activeTab, setActiveTab] = useState("My Files");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // track page locally (important for pagination)
  const [page, setPage] = useState(1);

  // -------------------------
  // FETCH FILES (PAGINATION SUPPORT)
  // -------------------------
  const fetchFiles = async ({ query = "", page = 1, append = false } = {}) => {
    dispatch(updateFilesLoadingActionReducer(true));

    const params = {
      search: query,
      page,
    };

    const response = await getFilesApi(params);
    const responseData = response?.data || {};

    dispatch(
      updateFilesActionReducer({
        ...responseData,
        append,
      }),
    );

    setPage(page);
    dispatch(updateFilesLoadingActionReducer(false));
  };

  // -------------------------
  // INIT
  // -------------------------
  useEffect(() => {
    const init = async () => {
      setLoading(true);

      const stats = await getDashboardStatsApi();
      dispatch(updateStatesActionReducer(stats?.data?.storage));

      await fetchFiles({ page: 1 });

      setLoading(false);
    };

    init();
  }, []);

  // -------------------------
  // SEARCH (RESET PAGINATION)
  // -------------------------
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFiles({
        query: searchQuery,
        page: 1,
        append: false,
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100">
      {/* Sidebar */}
      <Asside
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        loading={loading}
      />

      {/* Main */}
      <main className="flex-1 ml-96 p-12 pt-5 overflow-y-auto relative">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-black">{activeTab}</h2>
            <p className="text-slate-500">
              Welcome back, {getTokenKey("name")}!
            </p>
          </div>

          <div className="flex items-center gap-6">
            <ThemeToggle />

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold shadow-xl"
            >
              ☁️ Upload New
            </button>
          </div>
        </header>

        {/* SEARCH */}
        {activeTab !== "Settings" && (
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files..."
            className="w-full mb-6 px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border"
          />
        )}

        {/* CONTENT */}
        {activeTab === "Settings" ? (
          <Setting />
        ) : (
          <>
            <MyFiles />

            {/* PAGINATION BUTTON */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => {
                fetchFiles({
                  query: searchQuery,
                  page: p,
                  append: false, // IMPORTANT: replace data
                });
              }}
            />
          </>
        )}
      </main>

      {/* MODAL */}
      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
