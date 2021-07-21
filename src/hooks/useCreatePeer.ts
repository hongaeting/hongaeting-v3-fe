import Peer from 'peerjs';
import { useEffect, useState } from 'react';

const useCreatePeer = (): [Peer | null] => {
  const [peer, setPeer] = useState<Peer | null>(null);

  useEffect(() => {
    setPeer(
      new Peer(undefined, {
        host: process.env.REACT_APP_PEER_SERVER_HOST,
        port: parseInt(process.env.REACT_APP_PEER_SERVER_PORT || '', 10),
      })
    );
  }, []);

  return [peer];
};

export default useCreatePeer;
