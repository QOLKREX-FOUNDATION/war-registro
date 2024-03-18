import { statusSelect } from "./status";
// import { GoChevronRight } from "react-icons/go";
// import { racesJson } from "../../../../../config/constants/races";
// import specieJson from "../../../../../../public/Json/species.json";
import { API } from "../../../../../config";
import { useStateContext } from "../../../../../contexts/ContextProvider";
// import { imageURI } from "../../../../../config/constants/endpoints";
// import { useRaces } from "../../../Cpanel/components/PetForm/hooks/useRaces";
import { PetItem } from "../PetItem/PetItem";

export const PetsData = ({ records, changePet }) => {
  const { currentColor } = useStateContext();
  // const { getRace, race } = useRaces()

  return (
    <>
      <div>
        <h2
          className="text-3xl xl:text-4xl font-extrabold w-3/4 xl:w-2/4 text-center m-auto mt-40"
          style={{ color: `${ currentColor }` }}
        >
          Seleccione una mascota para ver sus datos
        </h2>
      </div>

      <div className="container flex flex-col mx-auto w-full items-center justify-center mt-14">
        <ul className="grid grid-cols-1 xl:grid-cols-2 gap-x-8 grid-flow-row-dense mb-4">
          {/* <PetItem key={pet._id} pet={pet} changePet={changePet} /> */}
          {records?.pets?.map((pet) => {
            return (
              // <h1 key={pet._id}>pet</h1>
              <PetItem key={pet._id} pet={pet} changePet={changePet} />
            )
          })
          }
          {/* // <li
            //   key={pet.chip}
            //   className="border-gray-400 flex flex-row mb-4"
            //   onClick={() => changePet(pet)}
            // >
            //   <div className="shadow dark:border border-gray-500 select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 flex-col md:flex-row items-center p-4">
            //     <div className="flex flex-col w-16 h-16 justify-center items-center mr-4">
            //       <a href="#" className="block relative">
            //         <img
            //           // src={`${API.warPublic}public/images/image/${
            //           //   pet.chip
            //           // }.jpg?${Math.random()}`}
            //           src={`${ imageURI }/${ pet.chip }.png`}
            //           className="mx-auto object-cover rounded-full h-16 w-16 "
            //           onError={({ currentTarget }) => {
            //             currentTarget.onerror = null;
            //             currentTarget.src = `/img/error/${ pet.type }.png`;
            //           }}
            //         />
            //       </a>
            //     </div>
            //     <div className="flex-1 pl-1 md:mr-16">
            //       <div className="font-medium dark:text-white">{pet.name}</div>
            //       <div className="text-gray-600 dark:text-gray-400 text-xs">
            //         {specieJson.map(
            //           (specie) => specie.value == pet.type && specie["es-Es"]
            //         )}{" "}
            //         -{" "}
            //         {racesJson[pet.type].map(
            //           (race) => race.value == pet.race && race["es-Es"]
            //         )}
            //         -{""}
            //         {
            //           getRace(pet)
            //         }
            //       </div>
            //     </div>

            //     <div className="flex items-center w-24">
            //       <div
            //         className={`w-3 h-3 
            //           ${ pet.status == "ACTIVE" && "bg-green-500" }
            //           ${ pet.status == "ADOPTION" && "bg-blue-500" }
            //           ${ pet.status == "GALLERY" && "bg-blue-200" }
            //           ${ pet.status == "LOST" && "bg-yellow-500" }
            //           ${ pet.status == "STOLEN" && "bg-red-500" }
            //           ${ pet.status == "DEAD" && "bg-black-500" }
            //           rounded-full`}
            //       ></div>
            //       <small
            //         className={`ml-1 
            //           ${ pet.status == "ACTIVE" && "text-green-500" }
            //           ${ pet.status == "ADOPTION" && "text-blue-500" }
            //           ${ pet.status == "GALLERY" && "text-green-200" }
            //           ${ pet.status == "LOST" && "text-yellow-500" }
            //           ${ pet.status == "STOLEN" && "text-red-500" }
            //           ${ pet.status == "DEAD" && "text-black-500" }
            //         `}
            //       >
            //         {statusSelect["es-Es"][pet.status]}
            //       </small>
            //     </div>
            //     <button
            //       className="w-24 text-right flex justify-end"
            //       style={{ color: `${ currentColor }` }}
            //     >
            //       <GoChevronRight />
            //     </button>
            //   </div>
            // </li> */}
        </ul>
      </div>
    </>
  );
};
