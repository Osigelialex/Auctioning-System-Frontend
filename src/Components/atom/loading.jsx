import { React } from 'react';
import { BallTriangle } from 'react-loader-spinner';

export default function Loading() {
  return (
    <div className="grid place-items-center min-h-screen">
      <BallTriangle
        height="100"
        width="100"
        color="#8b5cf6"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}