import React from 'react';
import { motion } from 'framer-motion';

const TypingEffect = ({ text }) => {
  const charArray = text.split('');
  return (
    <motion.div>
      {charArray.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: index * 0.02, // 根据字符索引设置延迟，实现逐个出现的效果
            duration: 0.02,
            ease: "easeOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TypingEffect;