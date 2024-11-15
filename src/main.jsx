// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobalStyles from "./styles/GlobalStyles.jsx";
import AppRoutes from "./AppRoutes.jsx";

createRoot(document.getElementById("root")).render(
    <>
        <GlobalStyles />
        <AppRoutes />
    </>
    // <StrictMode>
    //     <GlobalStyles />
    //     <AppRoutes />
    // </StrictMode>
);
