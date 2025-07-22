import { motion } from 'framer-motion';
import { useColorModeValue } from '@chakra-ui/react';

export default function AnimatedBackground() {
  const colors = useColorModeValue(
    ['#6C63FF', '#FF6584', '#9F7AEA', '#48BB78'],
    ['#2D3748', '#805AD5', '#9F7AEA', '#4299E1']
  );

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(-45deg, ${colors.join(', ')})`,
        backgroundSize: '400% 400%',
        zIndex: -1,
        opacity: 0.8
      }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{
        duration: 20,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'reverse'
      }}
    />
  );
}
