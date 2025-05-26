'use client'

import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';

export default function Home() {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  return (
    <>
      {openConnectModal && (
        <button onClick={openConnectModal} type="button" className='px-2 py-1 bg-yellow-100 rounded-full'>
          Open Connect Modal
        </button>
      )}

      {openAccountModal && (
        <button onClick={openAccountModal} type="button" className='px-2 py-1 bg-red-100 rounded-full'>
          Open Account Modal
        </button>
      )}

      {openChainModal && (
        <button onClick={openChainModal} type="button" className='px-2 py-1 bg-blue-100 rounded-full'>
          Open Chain Modal
        </button>
      )}
    </>
  );
}
