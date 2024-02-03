import type { Component } from "solid-js";
import { GlobalDataProvider } from "./Providers/GlobalDataProvider";
import World from "./Containers/World";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const App: Component = () => {
  return (
    <>
      <Header />
      <GlobalDataProvider>
        <World />
      </GlobalDataProvider>
      <Footer />
    </>
  );
};

export default App;
