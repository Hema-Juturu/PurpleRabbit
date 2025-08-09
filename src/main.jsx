import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import AppRoutes from './AppRoutes'
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
