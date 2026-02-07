import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ✅ USE EXISTING SERVICE */
import { adminLogin } from "../../services/adminApi";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await adminLogin(email, password);

      /* ✅ SAVE TOKEN */
      localStorage.setItem("adminToken", data.token);

      /* ✅ REDIRECT TO ACTUAL ADMIN PAGE (FIXES BLACK SCREEN) */
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f2933] via-[#2a2f36] to-[#1b1f24]">
      <div className="bg-[#faf9f7] p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-playfair text-center mb-8">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="
              w-full px-4 py-3 border rounded-md
              bg-white text-black
              placeholder-gray-500 caret-black
              focus:outline-none focus:ring-2 focus:ring-[#d6b25e]
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="
              w-full px-4 py-3 border rounded-md
              bg-white text-black
              placeholder-gray-500 caret-black
              focus:outline-none focus:ring-2 focus:ring-[#d6b25e]
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-[#d6b25e] hover:bg-[#c7a64f] py-3 rounded-md font-medium transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
