import "./App.css";
import AppLayout from "./components/AppLayout";
import AboutPage from "./pages/AboutPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryKeywordsPage from "./pages/CategoryKeywordsPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import TransactionCreatePage from "./pages/TransactionCreatePage";
import TransactionEditPage from "./pages/TransactionEditPage";
import TransactionsListPage from "./pages/TransactionsListPage";

function App() {
  return (
    <AppLayout >
      {/* <LandingPage /> */}
      {/* <AnalyticsPage /> */}
      {/* <CategoriesPage /> */}
      {/* <CategoryKeywordsPage /> */}
      {/* <LoginPage /> */}
      {/* <RegisterPage /> */}
      {/* <TransactionCreatePage /> */}
      {/* <TransactionEditPage /> */}
      {/* <TransactionsListPage /> */}
      {/* <AboutPage /> */}
      <ProfilePage />
    </AppLayout>
  )
}

export default App
