import type { Component } from "solid-js";
import { GlobalDataProvider } from "./Providers/GlobalDataProvider";
import World from "./Containers/World";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const App: Component = () => {
  return (
    <div style={"display:flex;flex-direction:column;justify-content:space-around;"}>
      <Header />
      <GlobalDataProvider>
        <World />
      </GlobalDataProvider>
      <Footer />
    </div>
  );
};

export default App;
