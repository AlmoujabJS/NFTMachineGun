import "./style.css";

const About = () => {
  return (
    <section
      id="about-nft-creators-tool"
      className="container about__container animate-fadein"
    >
      <h3>NFT MachineGun</h3>
      <p>
        Now you can make your nft project wihtout knowning programming or using
        diffuclte steps.
      </p>
      <p>
        NFT MachineGun is a free tools from{" "}
        <a
          rel="noreferrer"
          href="https://github.com/AlmoujabJS/NFTMachineGun"
          target="_blank"
          style={{
            color: "black",
            textDecoration: "underline",
            fontWeight: 300
          }}
        >
          Almoujab
        </a>{" "}
        you can check my portfolio for more
      </p>
      <p>
        Made with{" "}
        <span role="img" aria-label="love">
          💖
        </span>{" "}
        by{" "}
        <span role="img" aria-label="coffee">
          ☕
        </span>
      </p>
    </section>
  );
};

export default About;
