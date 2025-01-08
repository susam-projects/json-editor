import React from "react";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { theme } from "./theme.ts";
import { store } from "./store";
import { EditorPage } from "../editor";

import "antd/dist/reset.css";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <EditorPage />
      </ConfigProvider>
    </Provider>
  );
};
