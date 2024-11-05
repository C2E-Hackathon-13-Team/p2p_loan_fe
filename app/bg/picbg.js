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
        // backgroundImage: `url(/7-2.jpg),url(/7-1.jpg)`,
        backgroundImage: `url(/7-1.jpg),url(/7-2.jpg)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: -1,
        opacity: 0.5,
        //multiply（正片叠底）：这种模式会将两个背景图片的颜色值相乘，得到一个较暗的混合效果，使两张图片都能呈现，并且颜色会根据图片自身的颜色深浅而相互影响。
        // 其他常见的混合模式还有screen（滤色）、overlay（叠加）、soft - light（柔光）等，每种模式都有不同的视觉效果，可以根据需要进行试验。例如，screen模式会产生一种加亮的混合效果，与multiply相反
        backgroundBlendMode: "overlay", // 设置混合模式，这里使用正片叠底模式
        filter: 'brightness(8) contrast(0.2)' // 增加亮度，1.5是倍数，可以根据需要调整
      }}
    ></div>
  );
};

export default ImageBackground;