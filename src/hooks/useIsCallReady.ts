import { RootState } from 'modules';
import { useSelector } from 'react-redux';

const useIsCallReady = (): boolean => {
  const { socket, myMediaStream, myPeer } = useSelector(
    (state: RootState) => state.call
  );

  if (socket !== null && myMediaStream !== null && myPeer !== null) return true;
  return false;
};

export default useIsCallReady;
