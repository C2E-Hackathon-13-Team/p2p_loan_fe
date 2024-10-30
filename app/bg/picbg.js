import React from 'react';

const ImageBackground = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(/7-1.jpg)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: -1,
        filter: 'brightness(8) contrast(0.2)' // 增加亮度，1.5是倍数，可以根据需要调整

      }}
    ></div>
  );
};

export default ImageBackground;