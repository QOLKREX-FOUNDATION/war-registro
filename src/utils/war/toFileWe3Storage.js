import { create } from "@web3-storage/w3up-client";
// import * as Delegation from "@ucanto/core/delegation";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { API } from "../../config";
// import { Web3Storage } from "web3.storage";
// import { API } from "../../config";

// const client = new Web3Storage({
//   token: API.ipfsToken,
//   endpoint: new URL(API.ipfs),
// });

// export const toFileWeb3Storage = async (file, name) => {
// 	const files = [new File([file], `${name}`)];
// 	const response = await client.put(files, {
// 		maxRetries: 3,
// 		wrapWithDirectory: false,
// 	});

// 	return response;
// };

const storage = new ThirdwebStorage({
  clientId: API.ipfsClientId,
  secretKey: API.ipfsSecretKey,
});
export const toFileWeb3Storage = async (file, name) => {
  const files = new File([file], `${name}`);
  const uri = await storage.upload(files);
  console.log(uri);
  const cid = uri.split("ipfs://")[1];
  console.log(cid);
  return cid;
};

// export async function toFileWeb3StorageWithBackend() {
//   try {
//     // Create a new client
//     const client = await Client.create();
//     console.log({ client });
//     // Fetch the delegation from the backend
//     const apiUrl = `/api/hello`;
//     // const resp2 = await fetch("/api/hello");
//     // console.log({ resp2 });
//     // const data2 = await resp2.json();
//     // console.log({ data2 });
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ did: client.did() }),
//     });
//     console.log({ response });
//     const data = await response.arrayBuffer();
//     console.log({ data });

//     // Deserialize the delegation
//     const delegation = await Delegation.extract(new Uint8Array(data));
//     if (!delegation.ok) {
//       throw new Error("Failed to extract delegation", {
//         cause: delegation.error,
//       });
//     }
//     console.log({ client });
//     return client;
//   } catch (error) {
//     console.log(error);
//   }

  // Add proof that this agent has been delegated capabilities on the space

  // READY to go!
// }
// export const uploadFile = async (file, name) => {
//   const client = await toFileWeb3StorageWithBackend();
//   const space = await client.addSpace(delegation.ok);
//   client.setCurrentSpace(space.did());

//   const cid = await client.uploadFile(
//     new File([new Blob(["Hello world!"])], "hello.txt")
//   );
//   console.log(cid);
//   return cid;
// };

// export const toFileWeb3Storage = async (file, name) => {
//   const client = await Client.create();
//   const space = await client.createSpace("my-first-space");
//   const myAccount = await client.login("puppy.petss@gmail.com");
//   while (true) {
//     const res = await myAccount.plan.get();
//     if (res.ok) break;
//     console.log("Waiting for payment plan to be selected...");
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//   }
//   await myAccount.provision(space.did());
//   await space.createRecovery(myAccount.did());
//   await space.save();
//   await client.setCurrentSpace(space.did());
//   const files = new File([file], `${name}`);
//   const directoryCid = await client.uploadFile(files);
//   const cidString = directoryCid.toString();
//   const ipfsLink = `https://${cidString}.ipfs.w3s.link/`;
//   return cidString;
// };
// export const toFileWeb3Storage = async (file, name) => {
//   const client = await create();
//   const space = await client.createSpace("my-first-space");
//   const myAccount = await client.login("puppy.petss@gmail.com");
//   while (true) {
//     const res = await myAccount.plan.get();
//     if (res.ok) break;
//     console.log("Waiting for payment plan to be selected...");
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//   }
//   await myAccount.provision(space.did());
//   await space.createRecovery(myAccount.did());
//   await space.save();
//   await client.setCurrentSpace(space.did());
//   const files = new File([file], `${name}`);
//   const directoryCid = await client.uploadFile(files);
//   const cidString = directoryCid.toString();
//   const ipfsLink = `https://${cidString}.ipfs.w3s.link/`;

//   console.log({space: space.did()})
//   console.log({myAccount: myAccount.did()})
//   console.log({cidString});
//   return cidString;
// };
