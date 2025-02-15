"use client";

import { initMocks } from "@/lib/msw/setup";
import type { ComponentProps } from "react";
import { createContext, useState, useEffect } from "react";

const MSWContext = createContext("");

type Props = Omit<ComponentProps<typeof MSWContext.Provider>, "value">;

export const MSWClientConfig = ({ children }: Props) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await initMocks();
      setTimeout(() => {
        setLoaded(true);
      }, 100);
    };

    getData();
  }, []);

  return (
    <MSWContext.Provider value={""}>
      {loaded ? children : <>hhhh</>}
    </MSWContext.Provider>
  );
};
