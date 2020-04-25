import React from "react";

export const DebugData = (data: any = {}) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
