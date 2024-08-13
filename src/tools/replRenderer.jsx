import React from "react";
import { createRoot } from "react-dom/client";
import { CodeCell } from "@betteridea/codecell";

const ReplRenderer = ({ id, code }) => (
  <CodeCell
    appName="Cookbook"
    cellId={id}
    code={code}
    nowallet={true}
    height="169px"
    enableToasts={true}
  />
);

export const renderRepl = (containerId, code) => {
  const container = document.getElementById(containerId);
  if (container) {
    createRoot(container).render(<ReplRenderer id={containerId} code={code} />);
  }
};
