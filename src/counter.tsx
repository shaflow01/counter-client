import { useSignAndExecuteTransactionBlock, useSuiClient } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';

import { COUNTER_PACKAGE_ID } from './constant';

export function CreateCounter(props: { onCreated: (id: string) => void }) {
    const suiClient = useSuiClient();
    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
    return (
        <div>
            <button
                onClick={() => {
                    create();
                }}
            >
                Create Counter
            </button>
        </div>
    );

    function create() {
        const txb = new TransactionBlock();
        txb.moveCall({
            arguments: [],
            target: `${COUNTER_PACKAGE_ID}::counter::create`,
        });

        signAndExecute(
            {
                transactionBlock: txb,
                options: {
                    showEffects: true,
                },
            },
            {
                onSuccess: async (tx) => {

                    await suiClient.waitForTransactionBlock({
                        digest: tx.digest,
                    });

                    const objectId = tx.effects?.created?.[0]?.reference?.objectId;
                    if (objectId) {
                        props.onCreated(objectId);
                    }

                },
                onError: (e) => {
                    alert("config error");
                    console.log(e);
                }
            },
        );
    }
}
