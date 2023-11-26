import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App.tsx";
import heIL from "antd/locale/he_IL";
import "dayjs/locale/he";
import dayjs from "dayjs";
import "./index.css";

dayjs.locale("he");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider direction='rtl' locale={heIL}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
