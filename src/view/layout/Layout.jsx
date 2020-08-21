import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "@view/layout/header/Header";
import Footer from "@view/layout/footer/Footer";
import Routes from "@view/pages/Routes";
import Spinner from "@commonComponents/spinner/Spinner";
import { getAuth, getAuthIsLoading } from "@selectors/authSelector";
import { tokenVerification } from "@routines/authRoutines";
import "./layout.css";
import { getProfileIsLoading } from "@selectors/profileSelector";

const Layout = () => {
  const dispatch = useDispatch();
  const auth = useSelector(getAuth);
  const isLoadingAuth = useSelector(getAuthIsLoading);
  const isLoadingProfile = useSelector(getProfileIsLoading);

  useEffect(() => {
    dispatch(tokenVerification());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="main-content">
        {isLoadingAuth || isLoadingProfile ? (
          <Spinner />
        ) : (
          <Routes auth={auth} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
