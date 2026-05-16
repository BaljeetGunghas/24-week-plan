import { useState, useEffect } from "react";
import { getTokenKey } from "../utils/constant";
import { getDashboardStatsApi } from "../api/dashboard";
import UploadModal from "./DashboardComponent/UploadModal";
import Asside from "./DashboardComponent/Asside";
import Setting from "./DashboardComponent/Setting";

import { updateStatesActionReducer } from "../redux/slice/statsSlice";
import { useDispatch, useSelector } from "react-redux";

import { getFilesApi } from "../api/file";
import {
  updateFilesActionReducer,
  updateFilesLoadingActionReducer,
} from "../redux/slice/fileSlice";
import MyFiles from "./DashboardComponent/MyFiles";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { totalPages = 1 } = useSelector((state) => state.files);

  const [activeTab, setActiveTab] = useState("My Files");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchFiles = async ({ query = "", page = 1, append = false } = {}) => {
    dispatch(updateFilesLoadingActionReducer(true));

    try {
      const response = await getFilesApi({
        search: query,
        page,
      });

      dispatch(
        updateFilesActionReducer({
          ...(response?.data || {}),
          append,
        }),
      );

      setPage(page);
    } catch (err) {
      console.log(err);
    }

    dispatch(updateFilesLoadingActionReducer(false));
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      try {
        const stats = await getDashboardStatsApi();
        dispatch(updateStatesActionReducer(stats?.data?.storage));

        await fetchFiles({ page: 1 });
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    init();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFiles({
        query: searchQuery,
        page: 1,
        append: false,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className=" overflow-x-hidden bg-[#0B1120] text-white relative ">
      {/* BACKGROUND */}
      <div className="absolute top-[-150px] left-[-150px] w-[320px] h-[320px] bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-180px] right-[-150px] w-[360px] h-[360px] bg-blue-600/20 rounded-full blur-3xl" />

      {/* SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen z-40 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <Asside
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          loading={loading}
          closeSidebar={() => setSidebarOpen(false)}
        />
      </div>

      {/* ================= MAIN ================= */}
      <main className="lg:ml-[280px] h-screen relative z-10 p-4 sm:p-6 lg:p-8">
        {/* HEADER */}
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
          {/* ================= LEFT ================= */}
          <div className="flex items-center justify-between md:justify-start gap-3 sm:gap-4 w-full md:w-auto">
            {/* MENU BUTTON */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-sm"
            >
              ☰
            </button>

            {/* TITLE */}
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate">
                {activeTab}
              </h1>

              <p className="text-xs sm:text-sm text-slate-400">
                Hi,
                <span className="text-cyan-400 font-semibold ml-1">
                  {getTokenKey("name")}
                </span>
              </p>
            </div>
          </div>

          {/* ================= SEARCH + ACTIONS ================= */}
          {activeTab !== "Settings" && (
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:items-center">
              {/* SEARCH */}
              <div className="w-full sm:w-[320px] md:w-[360px]">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                    🔍
                  </span>

                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search files..."
                    className="
              w-full
              h-10
              pl-10 pr-4
              rounded-xl
              bg-white/10
              border border-white/10
              text-sm text-white
              placeholder:text-slate-500
              focus:outline-none
              focus:ring-1 focus:ring-cyan-500
              transition
            "
                  />
                </div>
              </div>

              {/* UPLOAD BUTTON */}
              <div className="w-full sm:w-auto flex justify-end">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="
            h-10
            w-full sm:w-auto
            px-4 sm:px-5
            rounded-xl
            bg-gradient-to-r from-cyan-500 to-blue-600
            text-xs sm:text-sm font-semibold
            flex items-center justify-center gap-2
            whitespace-nowrap
          "
                >
                  ☁️
                  <span>Upload</span>
                </button>
              </div>
            </div>
          )}
        </header>

        {/* ================= CONTENT ================= */}
        <div className="rounded-2xl bg-white/10 border border-white/10 p-4 sm:p-3 lg:p-3 ">
          {activeTab === "Settings" ? (
            <Setting />
          ) : (
            <>
              <MyFiles
                onUploadClick={() => setIsModalOpen(true)}
                searchQuery={searchQuery}
                handleClearSearch={() => setSearchQuery("")}
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(p) =>
                  fetchFiles({
                    query: searchQuery,
                    page: p,
                    append: false,
                  })
                }
              />
            </>
          )}
        </div>
      </main>

      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
