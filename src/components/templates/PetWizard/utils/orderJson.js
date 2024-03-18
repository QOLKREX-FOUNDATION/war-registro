import { dateNow, dateStringYear } from "../../../../utils/date";
import { objectUppercase } from "../../../../utils/helpers";

export const orderJson = ({
  getPet,
  account,
  update = false,
  image,
  pedigree,
  petInit,
}) => {
  try {
    const userData = JSON.parse(
      sessionStorage.getItem("user_" + String(account).toUpperCase())
    );
    console.log({ userData });
    const identity = sessionStorage.getItem(
      "idEntity_" + String(account).toUpperCase()
    );
    if (!identity) return false;

    image = typeof image == "string" ? image : "";
    pedigree = typeof pedigree == "string" ? pedigree : "";

    let info = {
      ...getPet(),
      image: image,
      pedigree: pedigree,
      addressEr: userData.registeringEntity,
      idRegisteringEntity: identity,
    };
    console.log({ getPet: getPet() });
    console.log({ update });

    if (update) {
      info.update_for = String(account).toUpperCase();
      info.image = image != "" ? image : petInit.image;
      info.pedigree = pedigree != "" ? pedigree : petInit.pedigree;
      info.dateIssue = dateStringYear(2, true);
      console.log(info.userName);
    } else {
      console.log("false");
      info.dateRegistring = dateNow();
      info.userAddress = String(account).toUpperCase();
      info.userName = userData.data.local
        ? `${userData.data.local}`
        : `${userData.data.name} ${userData.data.lastName}`;
    }
    info = objectUppercase(info, ["image", "pedigree"]);
    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};
