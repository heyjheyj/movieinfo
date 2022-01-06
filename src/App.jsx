import styles from "./App.module.css";
import Footer from "./Components/views/Footer/Footer";
import LandingPage from "./Components/views/LandingPage/LandingPage";
import Navbar from "./Components/views/Navbar/Navbar";

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <LandingPage />
      <Footer />
    </div>
  );
}

export default App;
