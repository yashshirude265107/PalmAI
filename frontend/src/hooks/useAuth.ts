"use client";

import { useCallback, useEffect, useState } from "react";
import { User } from "@/types";

/**
 * Lightweight auth hook backed by localStorage. For a larger app this would
 * live in a React Context provider, but a hook is enough for this scaffold.
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("palmai_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("palmai_user");
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback((token: string, userData: User) => {
    localStorage.setItem("palmai_token", token);
    localStorage.setItem("palmai_user", JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("palmai_token");
    localStorage.removeItem("palmai_user");
    setUser(null);
    window.location.href = "/login";
  }, []);

  return { user, loading, login, logout, isAuthenticated: !!user };
}
