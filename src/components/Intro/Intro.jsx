import "./style.css";
import { GrVirtualMachine } from "react-icons/gr";
const Intro = () => {
  return (
    <section
      id="nft-machinegun-introduction"
      className="container intro__container animate-fadein"
    >
      <div className="logo">
        <h3>
          <span className="logo__icon">
            <GrVirtualMachine />
          </span>
          <span>NFT MachineGun</span>
        </h3>
      </div>
      <h1>
        Start Your
        <br />
        NFT Project Now
      </h1>
      <p className="text">
        Turn image layers into thousands of uniquely code generated artworks.
      </p>
      <a href="/service" className="btn btn-primary">
        Start Now
      </a>
    </section>
  );
};

export default Intro;
