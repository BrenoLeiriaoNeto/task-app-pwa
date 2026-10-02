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
import ProfilePage from "./pages/ProfilePage.tsx";
import {ReloadPrompt} from "./components/ReloadPrompt.tsx";
import QuestionnairePage from "./pages/QuestionnairePage.tsx";


function MyApp() {
    const [userId, setUserId] = useState<string | null>(authLocalService.getUserId());
    const [showQuestionnaire, setShowQuestionnaire] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                authLocalService.saveUserId(user.uid);
                if (userId !== user.uid) setUserId(user.uid);
            } else {
                authLocalService.clearUserId();
                setUserId(null);
                setShowProfile(false);
            }
        });

        return () => unsubscribe();
    }, [userId]);

    const {isOnline} = useNetworkSync();
    const {isDark} = useTheme();

    return (
          <App safeAreas theme="ios" className="k-ios min-h-screen flex flex-col" dark={isDark}>
              {!isOnline && (
                  <div className="bg-red-500 text-white text-xs font-medium text-center py-1.5 px-4 w-full shrink-0 z-50 shadow-xs">
                      Você está offline. Alterações serão salvas localmente.
                  </div>
              )}
              <PWAInstallBanner />
              {showQuestionnaire ? (
                  <QuestionnairePage onBack={() => setShowQuestionnaire(false)} />
              ) : !userId ? (
                  <LoginPage onOpenQuestionnaire={() => setShowQuestionnaire(true)} />
              ) : showProfile ? (
                  <ProfilePage userId={userId} onBack={() => setShowProfile(false)} />
              ) : (
                  <TasksPage userId={userId} onOpenProfile={() => setShowProfile(true)} />
              )}
              <ReloadPrompt />
          </App>
    )
}

export default MyApp
