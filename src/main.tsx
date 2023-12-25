import 'dayjs/locale/he';
import './index.css';

import React from 'react';

import { ConfigProvider } from 'antd';
import heIL from 'antd/locale/he_IL';
import dayjs from 'dayjs';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

document.addEventListener('DOMContentLoaded', () => {
  dayjs.locale('he');
  const root = document.getElementById('radical-subscription-form');
  if (root) {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <ConfigProvider direction='rtl' locale={heIL}>
          <App />
        </ConfigProvider>
      </React.StrictMode>
    );
  }
});
