import { useState, useEffect } from "react";

export const useInit = () => {
  const [initialized, setInitialized] = useState(true);
  useEffect(() => setInitialized(false));

  return initialized;
};
