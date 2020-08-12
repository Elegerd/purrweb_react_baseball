import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";
import Routes from "@commonComponents/routes/Routes";
import Spinner from "@commonComponents/spinner/Spinner";
import { getAuth, getAuthIsLoading } from "@selectors/authSelector";
import { tokenVerification } from "@routines/authRoutines";
import "./app.css";

const App = () => {
  const auth = useSelector(getAuth);
  const dispatch = useDispatch();
  const isLoading = useSelector(getAuthIsLoading);

  useEffect(() => {
    dispatch(tokenVerification());
  }, [dispatch]);

  return (
    <>
      <Header auth={isLoading ? null : auth} />
      <main>{isLoading ? <Spinner /> : <Routes auth={auth} />}</main>
      <Footer />
    </>
  );
};

export default App;
