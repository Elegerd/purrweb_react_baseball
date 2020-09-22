import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "@view/layout/header/Header";
import Footer from "@view/layout/footer/Footer";
import Routes from "@view/pages/Routes";
import Spinner from "@commonComponents/spinner/Spinner";
import { getAuth } from "@ducks/auth/selector";
import { getProfile, getProfileIsLoading } from "@ducks/profile/selector";
import { tokenVerification } from "@ducks/auth/routines";
import "./layout.css";

const Layout = () => {
  const dispatch = useDispatch();
  const auth = useSelector(getAuth);
  const profile = useSelector(getProfile);
  const isLoadingProfile = useSelector(getProfileIsLoading);

  useEffect(() => {
    dispatch(tokenVerification());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="main-content">
        {!profile || isLoadingProfile ? <Spinner /> : <Routes auth={auth} />}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
