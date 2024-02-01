import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { isValidSuiObjectId } from '@mysten/sui.js/utils';
import { useState } from 'react';
import { CreateCounter } from './counter';
import { Counter } from "./view";

export default function App() {
  const currentAccount = useCurrentAccount();

  const [counterId, setCounter] = useState(() => {
    const hash = window.location.hash.slice(1);
    console.log('Hash:', hash);
    const isValid = isValidSuiObjectId(hash);
    console.log('IsValid:', isValid);
    return isValid ? hash : null;
  });
  console.log(counterId);


  return (
    <div style={{ position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <section style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {!currentAccount ? (
          <div>Please connect your wallet</div>
        ) : counterId ? (
          <Counter id={counterId} />
        ) : (
          <CreateCounter
            onCreated={(id) => {
              window.location.hash = id;
              setCounter(id);
            }}
          />
        )}
      </section>
      <div style={{ position: 'fixed', top: '10px', right: '10px' }}>
        <ConnectButton />
      </div>
    </div>
  );
}
