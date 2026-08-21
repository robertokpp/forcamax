import { createContext, useEffect, type ReactNode } from "react";
import { useState } from "react";
import { api } from "../services/api";

type AuthContext = {
  isLoading: boolean;
  session: null | UserAPIResponse;
  save: (data: UserAPIResponse) => void;
  remove: () => void;
};

const LOCAL_STORAGE_KEY = "@ForçaMax";

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<null | UserAPIResponse>(null);
  const [isLoading, setIsLoading] = useState(true);

  function save(data: UserAPIResponse) {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}:user`,
      JSON.stringify(data.user),
    );
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token);

    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    setSession(data);
  }

  function remove() {
    setSession(null);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);

    window.location.assign("/");
  }

 async function loadUser() {
  const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);
  const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);

  if (!token || !user) {
    setIsLoading(false);
    return;
  }

  try {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    await api.get("/session/validate");

    setSession({
      token,
      user: JSON.parse(user),
    });
  } catch {
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);
    setSession(null);
  } finally {
    setIsLoading(false);
  }
}

useEffect(() => {
  loadUser()
}, [])

  return (
    <AuthContext.Provider value={{ session, save, isLoading, remove }}>
      {children}
    </AuthContext.Provider>
  );
}
