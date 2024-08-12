import logo from "./assets/images/kstkv_logo.png";
import "./Preloader.css";

interface PreloaderProps {
    startGame: () => void;
}

const Preloader = ({startGame}: PreloaderProps) => {
    return (
        <div className="Preloader">
            <img
                onClick={() => startGame()}
                src={logo}
                className="Preloader-logo"
                alt="Kes tahab saada kasvatajaks logo"
            />
        </div>
    );
};

export default Preloader;
