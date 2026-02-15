import { Route, Routes } from "react-router-dom";
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
import { useState } from "react";
import { UserContext } from "./context/UserContext";
import Logout from "./components/Logout";

function App() {
  const [authData, setAuthData] = useState({})

  const userLoginHandler = (resultData) => {
    setAuthData(resultData)
  }

  const userLogoutHandler = () => {
    setAuthData({})
  }

  return (
    <UserContext.Provider value={{ ...authData, userLoginHandler, userLogoutHandler }}>
      <Routes>
        <Route path="/welcome" element={<LandingPage />}/>
        <Route path="/login" element={<LoginPage onLogin={userLoginHandler} />}/>
        <Route path="/register" element={<RegisterPage />}/>
  
        <Route element={ <AppLayout />}>
          <Route path="/dashboard" element={<AnalyticsPage />}/>
          <Route path="/categories" element={<CategoriesPage />}/>
          <Route path="/category-keywords" element={<CategoryKeywordsPage />}/>
          <Route path="/transactions/create" element={<TransactionCreatePage />}/>
          <Route path="/transactions/update" element={<TransactionEditPage />}/>
          <Route path="/transactions/list" element={<TransactionsListPage />}/>
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/logout" element={<Logout />}/>
        </Route>
      </Routes>
    </UserContext.Provider>
  )
}

export default App
