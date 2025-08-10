import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import AppRoutes from './AppRoutes'
import "@fontsource/inter";       // 400 weight
import "@fontsource/inter/500.css"; // Medium
import "@fontsource/inter/700.css"; // Bold
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
