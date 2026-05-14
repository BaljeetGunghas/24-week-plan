import { useState } from "react";

const plans = [
  {
    id: "free",
    name: "Basic",
    storage: "100MB",
    price: "0",
    current: true,
    features: ["Standard Upload", "Community Support", "Basic Security"],
  },
  {
    id: "advance",
    name: "Advance",
    storage: "200MB",
    price: "2.99",
    current: false,
    features: [
      "Faster Processing",
      "Email Support",
      "Ad-Free Experience",
      "Password Protected Links",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    storage: "500MB",
    price: "5.99",
    current: false,
    features: [
      "Priority Processing",
      "24/7 Support",
      "Advanced Analytics",
      "Custom Expiry Dates",
      "AI Image Search",
    ],
  },
];

const Setting = () => {
  const [edit, setEdit] = useState(false);
  const [preview, setPreview] = useState(null); // For local image preview
  const [form, setForm] = useState({
    name: "Baljeet Singh",
    email: "baljeet@clouddrop.io",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Baljeet",
  });

  // Handle local image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Shows the image instantly
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 py-12 antialiased animate-in fade-in duration-700">
      {/* --- SECTION 1: IDENTITY --- */}
      <div className="mb-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Profile
            </h2>
            <p className="text-slate-500 text-sm">
              Manage your public identity and credentials.
            </p>
          </div>
          <button
            onClick={() => {
              if (edit) {
                // Logic to call your API here
                console.log("Saving to Database...");
              }
              setEdit(!edit);
            }}
            className={`px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
              edit
                ? "bg-green-600 text-white shadow-green-200"
                : "bg-indigo-600 text-white shadow-indigo-200"
            }`}
          >
            {edit ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          {/* Avatar Block with Preview */}
          <div className="relative">
            <div className="w-40 h-40 rounded-[3rem] overflow-hidden bg-slate-100 ring-8 ring-slate-50 shadow-inner">
              <img
                src={preview || form.avatar}
                alt="User"
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>
            {edit && (
              <label className="absolute -bottom-2 -right-2 p-3 bg-indigo-600 text-white rounded-2xl shadow-xl cursor-pointer hover:scale-110 transition active:scale-90 border-4 border-white">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
            )}
          </div>

          {/* Form Fields */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 w-full py-4">
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-focus-within:text-indigo-500 transition-colors">
                Full Name
              </label>
              <input
                disabled={!edit}
                value={form.name}
                className="w-full bg-transparent border-b-2 border-slate-100 py-2 text-xl font-bold text-slate-800 outline-none focus:border-indigo-500 transition-all disabled:text-slate-400"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-focus-within:text-indigo-500 transition-colors">
                Email Address
              </label>
              <input
                disabled={!edit}
                value={form.email}
                className="w-full bg-transparent border-b-2 border-slate-100 py-2 text-xl font-bold text-slate-800 outline-none focus:border-indigo-500 transition-all disabled:text-slate-400"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: EXPANDED PLANS --- */}
      <div className="mb-16">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Upgrade Plan
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Get more space for your growing collection of files.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`relative p-10 rounded-[3rem] border-2 transition-all duration-300 overflow-hidden ${
                p.current
                  ? "border-indigo-600 bg-white shadow-2xl shadow-indigo-100"
                  : "border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl"
              }`}
            >
              {p.id === "pro" && (
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-black px-6 py-2 rounded-bl-3xl uppercase tracking-tighter">
                  Best Value
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-black text-slate-900 mb-2">
                  {p.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">
                    ${p.price}
                  </span>
                  <span className="text-slate-400 font-bold text-sm">
                    / month
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-8 p-4 bg-slate-100 rounded-2xl">
                <span className="text-xl">📁</span>
                <span className="text-sm font-black text-slate-700">
                  {p.storage} Storage
                </span>
              </div>

              <ul className="space-y-4 mb-10">
                {p.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-medium text-slate-600"
                  >
                    <span className="text-green-500 font-bold">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>

              <button
                disabled={p.current}
                className={`w-full py-5 rounded-3xl font-black text-xs uppercase tracking-[0.15em] transition-all transform active:scale-95 ${
                  p.current
                    ? "bg-slate-100 text-slate-400 cursor-default"
                    : "bg-slate-900 text-white hover:bg-indigo-600 shadow-xl shadow-slate-200"
                }`}
              >
                {p.current ? "Active Now" : `Get ${p.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECTION 3: ACCOUNT DELETION --- */}
      <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-black text-slate-900">Delete Account</h3>
          <p className="text-sm text-slate-500">
            Permanently remove your account and all associated files.
          </p>
        </div>
        <button className="px-8 py-3 bg-red-50 text-red-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
          Delete Permanently
        </button>
      </div>
    </div>
  );
};

export default Setting;
