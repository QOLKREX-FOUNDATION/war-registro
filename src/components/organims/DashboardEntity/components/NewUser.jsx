import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { ListUsers } from "./userTabs/listUsers/ListUsers";
import { InformationTab } from "./userTabs/userinfo/Information";
import { Web3Context } from "../../../../contexts/Web3/Web3Context";
import { useEffect } from "react";
import { Users, getAccessAll } from "../../../../utils/war/UsersSystem";
import { useSelection } from "../../../../hooks/useSelection";
import { setData } from "../../../../utils/war/crud";
import {
  initAccessValuesReset,
  initModuleValues,
} from "../../../atoms/Wallet/utils";
import { CHAIN_ID } from "../../../../config";
import { getAccess, registeringEntity } from "../../../../utils/war/RegisteringEntities";
import { RegisterUser } from "./userTabs/registerUser/RegisterUser";
import { timeStamp } from "../../../../utils/date";

export const NewUser = () => {
  const [value, setValue] = useState(0);
  const { web3 } = useContext(Web3Context);
  const [permit, setPermit] = useState(false);
  const [data, setData] = useState({})
  const [access, setAccess] = useState(initAccessValuesReset());
  const [accessUser, setAccessUser] = useState(initAccessValuesReset());
  const [countryER, setCountryER] = useState("")

  const { selection, handleSelection } = useSelection(
    {
      register: false,
      list: false,
      user: false,
    },
    () => false
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const countryBySessionStorage = sessionStorage.getItem('entity_' + String(web3.account).toUpperCase());
    if(countryBySessionStorage) { 
      const entityInfo = JSON.parse(countryBySessionStorage);
      setCountryER(entityInfo.country)
    } else {
      setCountryER("PE")
    }
  }, [])
  

  useEffect(() => {
    web3.account != "" &&
      web3.wallet !== null &&
      web3.chainId === CHAIN_ID &&
      registeringEntity(web3.wallet, web3.account)
        .then((resolve) => {
          if (resolve.permission && resolve.time > timeStamp()) {
            setPermit(true);
            handleSelection("register");
            const temp = initAccessValuesReset();
            for (let i = 0; i < initModuleValues.length; i++) {
              getAccess(web3.wallet, web3.account, i)
                .then((resolve2) => {
                  for (let index = 0; index < resolve2.length; index++) {
                    temp[i][resolve2[index]] = resolve2[index];
                    setAccess([...temp]);
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          } else {
            setAccess(initAccessValuesReset());
            setPermit(false);
          }
        })
        .catch((e) => {
          console.log(e);
        });
  }, [web3.wallet, web3.account, web3.chainId]);

  useEffect(() => {
    Users(web3.wallet, web3.account)
      .then((resolve2) => {
        if (resolve2.data != "") {
          setData(resolve2);
          handleSelection("user");
          let temp = [...access];
          for (let i = 0; i < initModuleValues.length; i++) {
            getAccessAll(web3.wallet, web3.account, i)
              .then((resolve2) => {
                for (let index = 0; index < resolve2.length; index++) {
                  temp[i][resolve2[index]] = resolve2[index];
                  setAccessUser([...temp]);
                }
              })
              .catch((e) => {
                console.log(e);
              });
          }
        } else {
          setData({});
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [web3.wallet, web3.account, web3.chainId]);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Registro" {...a11yProps(0)} />
          <Tab label="Lista de Usuarios" {...a11yProps(1)} />
          <Tab label="Información" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {
          countryER && <RegisterUser country={countryER} />
        }
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ListUsers />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <InformationTab info={data} access={accessUser} />
      </CustomTabPanel>
    </>
  );
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
