import { useEffect, useRef } from 'react';

interface RTCVideoProps {
  mediaStream: MediaStream | null;
}

export default function RTCVideo({ mediaStream }: RTCVideoProps) {
  const viewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!viewRef.current) return;
    viewRef.current.srcObject = mediaStream;
  }, [mediaStream]);

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video ref={viewRef} autoPlay controls />;
}
