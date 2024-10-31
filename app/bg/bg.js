// components/BackgroundImage.js
import React from 'react';
import Image from 'next/image';
import styles from './BackgroundImage.module.css'; // 假设你使用CSS Modules

const BackgroundImage = ({ src, alt, children }) => {
  return (
    <div className={styles.background}>
      <Image src={src} alt={alt} layout="fill" objectFit="cover" />
      {children}
    </div>
  );
};

export default BackgroundImage;