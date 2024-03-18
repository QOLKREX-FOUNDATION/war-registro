import Image from "next/image";
// import { FormRegister } from "../../components/organims/Dashboard/components/Forms/FormRegister";
// import Script from "next/script";
import { FormRegisterContent } from "../../components/organims/Dashboard/components/Forms/FormRegisterContent";

export default function Solicitud() {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center py-12 dark:bg-gray-800 dark:text-white">
        <div className="flex flex-col max-w-4xl">
          <FormRegisterContent />
        </div>
      </div>
    </>
  );
}
