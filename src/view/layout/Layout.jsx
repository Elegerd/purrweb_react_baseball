import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "@view/layout/header/Header";
import Footer from "@view/layout/footer/Footer";
import Routes from "@view/pages/Routes";
import Spinner from "@commonComponents/spinner/Spinner";
import { getAuth, getAuthIsLoading } from "@selectors/authSelector";
import { getProfileIsLoading } from "@selectors/profileSelector";
import { tokenVerification } from "@routines/authRoutines";
import "./layout.css";

const Layout = () => {
  const dispatch = useDispatch();
  const auth = useSelector(getAuth);
  const isLoadingProfile = useSelector(getProfileIsLoading);

  useEffect(() => {
    dispatch(tokenVerification());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="main-content">
        {isLoadingProfile ? <Spinner /> : <Routes auth={auth} />}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
