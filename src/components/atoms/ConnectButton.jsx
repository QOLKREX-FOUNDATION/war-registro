import { Connect } from "./Wallet/Connect";

export const ConnectButton = ({ open, setOpen }) => {
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer text-slate-700 font-bold text-center duration-500 hover:text-amber-600 dark:text-white dark:hover:text-amber-600"
      >
        Ingresar
        {/* {web3.account && `${web3.account.substring(0, 10)}...`}
        {!web3.account && "Ingresar"} */}
      </div>
      {open && <Connect handleClose={() => setOpen(false)} />}

      {/* {open && web3.account && <Session handleClose={() => setOpen(false)} />} */}
    </>
  );
};
