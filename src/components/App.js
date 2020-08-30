import React, { useEffect, useState } from 'react';
import "../utils";
import Layout from './layout/Layout';
import Landing from './pages/Landing/index';
import { TodosProvider, AccountProvider, NoficationsProvider } from '../context';
import todosContractArtifact from "../smart_contracts/build/contracts/Todos.json";
import TruffleContract from "truffle-contract";
import ScaleLoader from "react-spinners/ScaleLoader";
import { COLOR_PALETTE } from '../constants';
import Web3 from "web3";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Set up the Web3 singleton and get the todos smart contract instance.
  useEffect(() => {
    console.log("aaa")
    // TODO: Can handle other cases here, but most common case is window.ethereum,
    // so this is sufficient for demo purposes.
    if (window.ethereum) {
      console.log("hello there")
      const web3Provider = window.ethereum;
      window.ethereum.enable() // Request account access.
          .then(() => {
              const todosSmartContract = TruffleContract(todosContractArtifact);
              todosSmartContract.setProvider(web3Provider);
              window.todosSmartContract = todosSmartContract;
              window.web3 = new Web3(web3Provider);
              setIsLoading(false);
          })
          .catch(e => console.error("User denied account access"))
    }
  }, []);

  return (
    <div className="App">
      {
        isLoading ?
            <div style={{ position: "absolute", left: "50%", top: "40%", transform: "translate(-50%, -50%)"}}>
              <ScaleLoader color={COLOR_PALETTE.primary}/>
            </div>
          :
            <NoficationsProvider>
              <TodosProvider>
                <AccountProvider>
                  <Layout>
                    <Landing/>
                  </Layout>
                </AccountProvider>
              </TodosProvider>
            </NoficationsProvider>
      }
    </div>
  );
}

export default App;
