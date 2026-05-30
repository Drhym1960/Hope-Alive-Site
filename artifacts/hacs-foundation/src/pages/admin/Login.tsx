import { useState } from "react";
import { useLocation } from "wouter";
import Seo from "@/components/Seo";
import { useAdminLogin } from "@workspace/api-client-react";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAdminLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login.mutateAsync({ data: { username, password } });
      if (res.success) {
        navigate("/admin");
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center hero-gradient px-4">
      <Seo title="Admin Login" description="Administrator login." path="/admin/login" noindex />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="font-bold text-secondary-foreground">HACS</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-primary-foreground/70 text-sm mt-1">Hope Alive Children Spring Foundation</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 shadow-xl">
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3 text-destructive text-sm mb-6">
              {error}
            </div>
          )}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={login.isPending}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {login.isPending ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="/" className="text-primary-foreground/60 text-sm hover:text-primary-foreground">
            Back to website
          </a>
        </div>
      </div>
    </div>
  );
}
