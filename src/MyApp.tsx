import {App} from "konsta/react";
import LoginPage from "./pages/LoginPage.tsx";
import { useNetworkSync } from "./hooks/useNetworkSync.ts";
import { PWAInstallBanner } from "./components/PWAInstallBanner.tsx";
import {authLocalService} from "./services/local/authService.ts";
import {useEffect, useState} from "react";
import {useTheme} from "./hooks/useTheme.ts";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./storage/firebase/firebaseConfig.ts";
import TasksPage from "./pages/TasksPage.tsx";
import {ReloadPrompt} from "./components/ReloadPrompt.tsx";


function MyApp() {
    const [userId, setUserId] = useState<string | null>(authLocalService.getUserId());

    useTheme();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                authLocalService.saverUserId(user.uid);
                if (userId !== user.uid) setUserId(user.uid);
            } else {
                authLocalService.clearUserId();
                setUserId(null);
            }
        });

        return () => unsubscribe();
    }, [userId]);

    const {isOnline} = useNetworkSync();
    return (
          <App safeAreas theme="ios" className="k-ios" dark>
              {!isOnline && (
                  <div className="bg-red-500 text-white text-xs text-center py-1 absolute top-0 w-full z-50">
                      Você está offline. Alterações serão salvas localmente.
                  </div>
          )}
              <PWAInstallBanner />
              {userId ? <TasksPage userId={userId} /> : <LoginPage />}
              <ReloadPrompt />
          </App>
    )
}

export default MyApp
