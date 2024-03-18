export const Web3Reducer = (state, action) => {
  switch (action.type) {
    case "provider":
      return {
        ...state,
        wallet: action.payload.web3,
        provider: action.payload.provider,
        providerString: action.payload.providerString,
      };
    case "account":
      return {
        ...state,
        account: action.payload,
      };

    case "chainId":
      return {
        ...state,
        chainId: action.payload,
      };
    case "token":
      return {
        ...state,
        authToken: action.payload.authToken,
        authTimeOut: action.payload.authTimeOut,
        rol:action.payload.rol,
      };
    default:
      return state;
  }
};
