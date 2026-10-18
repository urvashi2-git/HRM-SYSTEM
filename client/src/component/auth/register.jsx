import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/component/ui/card";
import { Input } from "@/component/ui/input";
import { Label } from "@/component/ui/label";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Employee",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    console.log("Registration form submitted");

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        form,
      );

      console.log("Registration successful:", response.data);

      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);

      alert(
        err.response?.data?.message ||
          "Registration failed. Check the browser console and server.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <header className="flex justify-between items-center px-8 py-5 border-b border-slate-800 bg-slate-800/40">
        <h1 className="text-2xl font-bold text-blue-400">HRM Portal</h1>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
        >
          Login
        </button>
      </header>

      <div className="flex justify-center items-center grow p-4">
        <Card className="w-full max-w-md bg-slate-800/70 border border-slate-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white text-center">
              HRM Portal Register
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-slate-300">Name</Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="bg-slate-700/40 text-white border-slate-600"
                />
              </div>

              <div>
                <Label className="text-slate-300">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="bg-slate-700/40 text-white border-slate-600"
                />
              </div>

              <div>
                <Label className="text-slate-300">Password</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="bg-slate-700/40 text-white border-slate-600"
                />
              </div>

              <div>
                <Label className="text-slate-300">Role</Label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full p-2 bg-slate-700/40 text-white border border-slate-600 rounded-md"
                >
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white p-2 disabled:opacity-50"
              >
                {loading ? "Registering..." : "Register"}
              </button>

              <p className="text-slate-400 text-center mt-3">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-blue-400 hover:underline"
                >
                  Login
                </button>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
