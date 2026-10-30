
import Experience from "../Experience/Experience";
import LoadingButton from "../LoadingButton/LoadingButton";

import "./LoadingCube.css";

const LoadingCube = () => {
  // Works on localhost and GitHub Pages
  const backgroundImage = `${import.meta.env.BASE_URL}CubeBaked.webp`;

  return (
    <div
      className="loading-cube"
      style={{
        backgroundImage: `url("${backgroundImage}")`,
      }}
    >
      <Experience />
      <LoadingButton />
    </div>
  );
};

export default LoadingCube;
