import {App} from "konsta/react";
import LoginPage from "./pages/LoginPage.tsx";
import { useNetworkSync } from "./hooks/useNetworkSync.ts";


function MyApp() {
    const {isOnline} = useNetworkSync();
  return (
      <App safeAreas theme="ios" className="k-ios" dark>
          {!isOnline && (
              <div className="bg-red-500 text-white text-xs text-center py-1 absolute top-0 w-full z-50">
                  Você está offline. Alterações serão salvas localmente.
              </div>
          )}
          <LoginPage />
      </App>
  )
}

export default MyApp
