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
      "AI Search",
    ],
  },
];

const Setting = () => {
  const [edit, setEdit] = useState(false);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    name: "Baljeet Singh",
    email: "baljeet@clouddrop.io",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Baljeet",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3 py-8 space-y-10 text-white">
      {/* ================= PROFILE ================= */}
      <div className="space-y-5">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Profile</h2>
            <p className="text-xs text-slate-400">
              Manage your identity & account details
            </p>
          </div>

          <button
            onClick={() => setEdit(!edit)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              edit
                ? "bg-green-500/20 text-green-300"
                : "bg-cyan-500/20 text-cyan-300"
            }`}
          >
            {edit ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        {/* CARD */}
        <div className="flex flex-col md:flex-row gap-6 p-6 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl">
          {/* AVATAR */}
          <div className="relative mx-auto md:mx-0">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#111827] ring-2 ring-white/10">
              <img
                src={preview || form.avatar}
                className="w-full h-full object-cover"
              />
            </div>

            {edit && (
              <label className="absolute -bottom-2 -right-2 w-8 h-8 flex items-center justify-center bg-cyan-500 rounded-lg cursor-pointer shadow-lg">
                📷
                <input type="file" hidden onChange={handleImageChange} />
              </label>
            )}
          </div>

          {/* FIELDS */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* NAME */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">Full Name</label>
              <input
                disabled={!edit}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                placeholder="Name"
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">
                Email Address
              </label>
              <input
                disabled={!edit}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                placeholder="Email"
              />
            </div>

            {/* EXTRA INFO (NEW - no removal, just enhancement) */}
            <div className="md:col-span-2 grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-slate-400">Status</p>
                <p className="text-xs text-green-300">Active</p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-slate-400">Plan</p>
                <p className="text-xs text-cyan-300">Basic</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PLANS ================= */}
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold">Upgrade Plan</h2>
          <p className="text-xs text-slate-400">
            Unlock more storage & premium features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`relative p-5 rounded-3xl border transition backdrop-blur-2xl ${
                p.current
                  ? "bg-cyan-500/10 border-cyan-500/30"
                  : "bg-white/10 border-white/10 hover:bg-white/15"
              }`}
            >
              {p.id === "pro" && (
                <div className="absolute top-2 right-2 text-[10px] px-2 py-1 rounded-lg bg-purple-500/20 text-purple-300">
                  Best
                </div>
              )}

              <h3 className="text-sm font-bold">{p.name}</h3>

              <div className="text-2xl font-bold mt-2">
                ${p.price}
                <span className="text-xs text-slate-400">/mo</span>
              </div>

              <div className="mt-3 text-xs text-slate-400">📁 {p.storage}</div>

              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                {p.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>

              <button
                disabled={p.current}
                className={`mt-5 w-full py-2 rounded-xl text-xs font-semibold transition ${
                  p.current
                    ? "bg-white/10 text-slate-400"
                    : "bg-cyan-500 text-white hover:bg-cyan-400"
                }`}
              >
                {p.current ? "Active Plan" : "Upgrade Now"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ================= DELETE ================= */}
      <div className="flex items-center justify-between p-4 rounded-2xl border border-red-500/20 bg-red-500/10">
        <div>
          <h3 className="text-sm font-bold">Delete Account</h3>
          <p className="text-xs text-slate-400">
            Permanently remove all data & files
          </p>
        </div>

        <button className="px-4 py-2 text-xs rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Setting;
