import { useState, useEffect } from "react";
import LayerInput from "./LayerInput";
import { GrClose } from "react-icons/gr";
import { BsDownload } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import Fast from "../../fast_js/fast";
import "./style.css";

const process = function (e) {
  e.preventDefault();
  const worker = new Worker("workers/allPossibleCasesWorker.js");

  const outputImagesCn = document.getElementById("outputImagesCn");
  //Get the layers from inputs
  const INPUT_LAYERS = document.querySelectorAll(".layersInput > *");
  const LAYERS = [...INPUT_LAYERS]
    .filter((layer) => layer.hasAttribute("data-layer"))
    .map((layer) => {
      return [...layer.files];
    })
    .filter((layer) => layer.length > 0);

  //Check: if the Layer is empty Close the function

  if (LAYERS.length === 0) return;

  //Make an Object of Images
  //This will return a promise for every file - that promise contain array of image
  const IMAGES_LAYERS = Fast.map(LAYERS, (fileList) => {
    return Fast.map(fileList, async (file) => {
      let image;

      const reader = new FileReader();

      const getImg = new Promise((resolve) => {
        reader.addEventListener("load", () => {
          resolve(reader.result);
        });
        reader.readAsDataURL(file);
      });

      await getImg.then((result) => {
        image = result;
      });
      return image;
    });
  });

  //Sending images src to worker for get all possibilities
  let arr = [];
  Fast.map(IMAGES_LAYERS, async (promiseImg, index, x) => {
    arr.push(await Promise.all(promiseImg));
    let src = Fast.map(arr, (ImgSources) => {
      return Fast.map(ImgSources, (src) => {
        return src;
      });
    });

    if (index === x.length - 1) {
      worker.postMessage(src);
    }
  });

  worker.addEventListener("message", (e) => {
    //MAPPING EVERY POSSIBILITY TO A NEW IMAGE USING CANVAS
    let allPossibleCases = Fast.map(e.data, (imgGroup) => {
      return Fast.map(imgGroup, (img) => {
        let createImage = new Image();
        createImage.src = img;
        return createImage;
      });
    });
    const allPossibleImages = Fast.map(allPossibleCases, (image) => {
      return Promise.all(image);
    });

    // Create Canvas Images

    const drawImage = (imgCombinations) => {
      return Fast.map(imgCombinations, async (imgComb) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { alpha: false });
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
    function appendToImgContainer(img, index) {
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
    }

    Fast.forEach(drawImage(allPossibleImages), (c, index) => {
      setTimeout(() => {
        c.then((r) => {
          appendToImgContainer(r, index);
        }, 0);
      });
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
