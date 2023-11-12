import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import {AuthContextProvider} from "./Context/AuthProvider";
import {ProductProvider} from "./Context/ProductProvider"

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
