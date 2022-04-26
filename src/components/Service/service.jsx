import { useState, useEffect } from "react";
import LayerInput from "./LayerInput";
import { GrClose } from "react-icons/gr";
import { BsDownload } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import "./style.css";
const process = function (e) {
  e.preventDefault();
  const outputImagesCn = document.getElementById("outputImagesCn");
  //Get the layers from input
  const INPUT_LAYERS = document.querySelectorAll(".layersInput > *");
  const LAYERS = [...INPUT_LAYERS]
    .filter((layer) => layer.hasAttribute("data-layer"))
    .map((layer) => {
      return [...layer.files];
    })
    .filter((layer) => layer.length > 0);

  //Check if the Layer is empty Close the function

  if (LAYERS.length === 0) return;
  //Make an Object of Images
  //This will return a promise for every file - that promise contain array of image
  const IMAGES_LAYERS = LAYERS.map((fileList) => {
    //Mapping The SubArrays To Image
    return fileList.map(async (file) => {
      let image;

      const reader = new FileReader();

      const getImg = new Promise((resolve, reject) => {
        reader.addEventListener("load", () => {
          const img = new Image();
          img.src = reader.result;
          resolve(img);
        });
        reader.readAsDataURL(file);
      });

      await getImg.then((result) => {
        image = result;
      });
      return image;
    });
  });

  //GET ALL POSSIBLE COMBINATION FUNCTION

  function allPossibleCases(array, result, index) {
    if (!result) {
      result = [];
      index = 0;
      array = array.map(function (element) {
        return element.push ? element : [element];
      });
    }
    if (index < array.length) {
      array[index].forEach(function (element) {
        var a = array.slice(0);
        a.splice(index, 1, [element]);
        allPossibleCases(a, result, index + 1);
      });
    } else {
      result.push(array.flat());
    }

    return result;
  }

  //MAPPING EVERY POSSIBILITY TO A NEW IMAGE USING CANVAS

  const allPossibleImages = allPossibleCases(IMAGES_LAYERS).map((image) => {
    return Promise.all(image);
  });

  // Create Canvas Images

  const drawImage = (imgCombinations) => {
    return imgCombinations.map(async (imgComb) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const _img = await imgComb;

      canvas.width = _img[0].width;
      canvas.height = _img[0].height;

      for (let img of await imgComb) {
        ctx.drawImage(img, 0, 0, _img[0].width, _img[0].height);
      }

      return canvas;
    });
  };
  //Append images to imageContainer
  Promise.all(drawImage(allPossibleImages)).then((images) => {
    images.forEach((img, index) => {
      const outputImages = document.querySelector(".outputImages");
      const IMAGE = document.createElement("div");
      const DOWNLOAD = document.createElement("div");
      const BUTTON = document.createElement("button");
      IMAGE.classList.add("Image");
      IMAGE.append(img);
      IMAGE.append(DOWNLOAD);

      BUTTON.innerHTML = `<a href="${img.toDataURL()}" download="Art-${index}.png">Download</a>`;
      BUTTON.classList.add("btn");

      DOWNLOAD.classList.add("download");
      DOWNLOAD.append(BUTTON);
      outputImages.append(IMAGE);
    });
  });
  outputImagesCn.classList.add("active");
};
const Service = () => {
  useEffect(() => {
    [...document.querySelectorAll(".outputDimentions input")].forEach((inp) => {
      inp.addEventListener("focus", focusedInput);
      inp.addEventListener("blur", focusedInput);
    });
  });
  function focusedInput(e) {
    const targetId = e.target.id;
    const targetLabel = document.querySelector(`label[for="${targetId}"]`);

    if (e.type === "focus" || e.target.value.length !== 0) {
      targetLabel.classList.add("active");
    } else {
      targetLabel.classList.remove("active");
    }
  }
  const [layers, setLayers] = useState(new Array(4).fill().map((e, i) => i));
  const CloseOutputImgs = () => {
    const outputImagesCn = document.getElementById("outputImagesCn");
    const outputImages = document.getElementById("outputImages");
    outputImages.innerHTML = "";
    outputImagesCn.classList.remove("active");
  };
  const downloadAll = () => {
    const LINKS = [...document.querySelectorAll("#outputImages a")];

    LINKS.forEach((link) => link.click());
  };
  return (
    <section
      id="nft-layers-creator-tool"
      className="container service__container animate-fadein"
    >
      <h1>Import Layers</h1>
      <div className="service__content">
        <p>
          Make sure that all layers you have been imported have the same
          resolution for best result.
        </p>
        <form id="serviceForm">
          <div className="layersInput">
            {layers.map((num) => {
              return <LayerInput key={num} num={num} />;
            })}
            <button
              className="btn btn-primary add-layer__btn"
              onClick={(e) => {
                e.preventDefault();
                setLayers(new Array(layers.length + 1).fill().map((e, i) => i));
              }}
            >
              <FaPlus /> <span>Add Layer</span>
            </button>
          </div>
          <div className="add-layer"></div>
          <div className="processing">
            <button className="btn process_btn" onClick={process}>
              Make it now
            </button>
            <input
              style={{ border: "1px solid" }}
              className="btn"
              type="reset"
              value="Clear Layers"
            />
          </div>
        </form>
      </div>
      <div id="outputImagesCn" className="outputImagesCn">
        <div className="closeButton">
          <button className="btn close-btn" onClick={CloseOutputImgs}>
            <GrClose />
          </button>
          <button className="btn" title="Download all" onClick={downloadAll}>
            <BsDownload />
          </button>
        </div>
        <div id="outputImages" className="outputImages"></div>
      </div>
    </section>
  );
};

export default Service;
