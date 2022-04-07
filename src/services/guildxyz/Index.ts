import { guild, role, user } from "@guildxyz/sdk";
import { ethers } from "ethers";
const ethersWallet =
  ethers.Wallet.createRandom() || ethers.Wallet.fromMnemonic("");
const walletAddress = ethersWallet.address;
const signerFunction = (signableMessage: string) =>
  ethersWallet.signMessage(signableMessage);
declare type Theme = {
  mode: "DARK" | "LIGHT";
  color?: any;
  backgroundImage?: string;
  backgroundCss?: any;
};
console.time("guild create");

console.timeEnd("guild create"); //Prints something like that-> test: 11374.004ms

async function test() {
  const myGuild = await guild.create(
    {
      name: "My New Guild",
      description: "Cool stuff", // Optional
      imageUrl: "", // Optional
      roles: [
        {
          name: "My First Role",
          logic: "AND",
          requirements: [
            {
              type: "ALLOWLIST",
              data: {
                addresses: ["0x304C6479a657A073DaaB19Ff37E1641d766083A9"],
              },
            },
          ],
        },
        {
          name: "My Second Role",
          logic: "OR",
          requirements: [
            {
              type: "ERC20",
              chain: "ETHEREUM",
              address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
              data: {
                amount: 1,
              },
            },
            {
              type: "ERC721",
              chain: "ETHEREUM",
              address: "0x734AA2dac868218D2A5F9757f16f6f881265441C",
              data: {
                amount: 1,
              },
            },
          ],
        },
      ],
    },
    ethersWallet
  );
  console.log(myGuild);
}

// test()
async function main() {
  const guildId = 3011;
  // const guildId = 1898

  await guild.get(guildId); // Get Guild by ID (detailed)
  guild.delete(guildId, ethersWallet)
  //   await guild.get(urlName); // Get Guild by url name (detailed) - for example "our-guild"
  //   await guild.getAll(); // Get All Guilds basic information
  const access = await guild.getUserAccess(
    guildId,
    "0x304C6479a657A073DaaB19Ff37E1641d766083A9"
  ); // Access checking for an address for a specific Guild
  console.log(access)
  console.timeEnd("check access"); //Prints something like that-> test: 11374.004ms
  //   await guild.getUserMemberships(guildId, userAddress); // User current memberships for the given Guild
  //   await guild.create(walletAddress, signerFunction, createGuildParams); // Create a guild with specific params - check the example below
  //   await guild.update(guildId, walletAddress, signerFunction, updateGuildParams); // Update a guild with the given params
  //   await guild.delete(guildId, walletAddress, signerFunction); // Remove a guild by ID
  //   await guild.join(guildId, walletAddress, signerFunction); // Enables to join a user to the accessible roles in a Guild

  //   await role.get(roleId); // Get Role by ID
  //   await role.create(walletAddress, signerFunction, createRoleParams); // Create a role for an existing Guild
  //   await role.update(roleId, walletAddress, signerFunction, updateRoleParams); // Update a role with the given params
  //   await role.delete(roleId, walletAddress, signerFunction); // Remove a role by ID

  //   await user.getMemberships(userAddress); // Returns every Guild and Role of a given user
}
main()