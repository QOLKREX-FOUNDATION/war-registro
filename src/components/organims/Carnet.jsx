import { useRef, useState } from "react";
import { useEffect } from "react";
import { API } from "../../config";
import { imageURI } from "../../config/constants/endpoints";
import { usePreloaderContext } from "../../contexts";
import { useStateContext } from "../../contexts/ContextProvider";
import { downloadImage } from "../../utils/download";
import { Front } from "../molecules/Carnet/Front";
import { Reverse } from "../molecules/Carnet/Reverse";

export const Carnet = ({ petValues, adopter, entityRegister }) => {
  const [imageReader, setImgReader] = useState(null);
  const { handlePreloader } = usePreloaderContext();
  const { currentColor } = useStateContext();
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const imp = () => {
    handlePreloader(true);
    downloadImage(ref1, "front.jpeg", 649, 1003, 1);
    downloadImage(ref2, "reverse.jpeg", 649, 1003, 1);
    setTimeout(() => {
      handlePreloader(false);
    }, 3000);
  };

  useEffect(() => {
    // setImgReader(
    // 	`${API.warPublic}public/images/image/${
    // 		petValues?.chip
    // 	}.jpg?${Math.random()}`
    // );
    setImgReader(`${imageURI}/${petValues?.chip}.png?v=${Date.now()}`);
  }, [petValues?.chip]);

  return (
    <>
      <div className={`${!petValues?.chip && "opacity-0"}`}>
        <div className="flex justify-center mt-10">
          <button
            onClick={imp}
            type="submit"
            className="w-2/6 py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md rounded-lg "
            style={{ backgroundColor: currentColor }}
          >
            Descargar Carnet
          </button>
        </div>

        <br />
        <div className="mb-2 w-full flex justify-center">
          <div
            className="bg-black "
            style={{
              width: "45rem",
              height: "30rem",
            }}
          >
            <Front getPet={petValues} image={imageReader} />
          </div>
        </div>

        <div className="mb-2 w-full flex justify-center">
          <div
            className="bg-black "
            style={{
              width: "45rem",
              height: "30rem",
            }}
          >
            <Reverse
              getPet={petValues}
              adopter={adopter}
              entityRegister={entityRegister}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          overflow: "hidden",
          height: "0",
        }}
      >
        <div
          ref={ref1}
          style={{
            display: "block",
            height: "649px",
            width: "1003px",
          }}
        >
          <Front
            getPet={petValues}
            // image={`${ API.warPublic }public/images/image/${ petValues?.chip
            image={`${imageURI}/${petValues?.chip}.png?v=${Date.now()}`}
            imp={true}
            styles={{ height: "649px", width: "1003px" }}
          />
        </div>
        <div
          ref={ref2}
          style={{
            display: "block",
            height: "649px",
            width: "1003px",
          }}
        >
          <Reverse
            getPet={petValues}
            adopter={adopter}
            entityRegister={entityRegister}
            imp={true}
            styles={{ height: "649px", width: "1003px" }}
          />
        </div>
      </div>
    </>
  );
};
