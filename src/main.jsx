import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { StyledEngineProvider } from "@mui/material";
import { store } from "./entitis/store/store";
import './index.css';

const root = createRoot(document.getElementById("root"), {
  unstable_strictMode: false
});

root.render(
  <Provider store={store}>
    <StyledEngineProvider>
      <App />
    </StyledEngineProvider>
  </Provider>
);
