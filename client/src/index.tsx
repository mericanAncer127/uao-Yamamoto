import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <App />
    </Provider>
);

registerServiceWorker();
