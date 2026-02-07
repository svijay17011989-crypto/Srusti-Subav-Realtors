import { useState } from "react";
import axios from "../../api/axiosAdmin";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/auth/admin/login", {
        email,
        password,
      });

      if (res.data?.token) {
        localStorage.setItem("adminToken", res.data.token);
        navigate("/admin");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0b1220] to-black px-6">
      {/* LOGIN CARD */}
      <div className="w-full max-w-md lux-card p-10 shadow-2xl">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-playfair lux-accent mb-2">
            Admin Login
          </h1>
          <p className="lux-muted text-sm">
            Secure access to management panel
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 text-center text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* EMAIL */}
          <div>
            <label className="block text-sm mb-1 lux-muted">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full px-4 py-3 border rounded-md
                bg-white text-black
                focus:outline-none focus:ring-2 focus:ring-[#d6b25e]
              "
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm mb-1 lux-muted">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full px-4 py-3 border rounded-md
                bg-white text-black
                focus:outline-none focus:ring-2 focus:ring-[#d6b25e]
              "
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="
              w-full py-3 rounded-full
              bg-[var(--accent)]
              text-black font-semibold
              hover:opacity-90 transition
            "
          >
            Sign In
          </button>
        </form>

        {/* FOOTER */}
        <div className="text-center mt-8 text-xs lux-muted">
          © {new Date().getFullYear()} Srusti Subav Realtors
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
