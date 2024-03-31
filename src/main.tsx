import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css"
// import PeriodicTable from "./PeriodicTable/PeriodicTable.tsx";
// import ProjectileMotion from "./ProjectileMotion/ProjectileMotion.tsx";
import Canvas from "./ProjectileMotion/Canvas.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Canvas/>
  </React.StrictMode>,
)
