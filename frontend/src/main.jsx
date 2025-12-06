import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import AppRoutes from './AppRoutes'
import "@fontsource/inter";       // 400 weight
import "@fontsource/inter/500.css"; // Medium
import "@fontsource/inter/700.css"; // Bold
import "./index.css";
import { Provider } from 'react-redux'
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <AppRoutes />
    </Provider>
  </StrictMode>,
)
