import {App} from "konsta/react";
import LoginPage from "./pages/LoginPage.tsx";

function MyApp() {
  return (
      <App theme="ios" className="k-ios" dark>
          <LoginPage />
      </App>
  )
}

export default MyApp
