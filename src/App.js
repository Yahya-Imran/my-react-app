import React, { useState, useEffect } from 'react';
import {
  Container,
  Button,
  Heading,
  VStack,
  Text,
  Box,
  useColorModeValue,
  useBreakpointValue
} from '@chakra-ui/react';
import axios from 'axios';
import Confetti from 'react-confetti';
import { FaMagic, FaRandom } from 'react-icons/fa';
import ParticlesBackground from './components/ParticlesBackground';

function App() {
  // State management
  const [result, setResult] = useState('');
  const [category, setCategory] = useState('');
  const [isDeciding, setIsDeciding] = useState(false);
  const [funnyMessage, setFunnyMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [useFancyBg, setUseFancyBg] = useState(false);

  // All hooks called unconditionally at the top
  const boxBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.50');
  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });
  const headingSize = useBreakpointValue({ base: 'xl', md: '2xl' });
  
  const colors = useColorModeValue(
    {
      eat: '#FF6B6B',
      do: '#48BB78',
      wear: '#4299E1',
      decide: '#9F7AEA',
      bgGradient: 'linear(to-br, #6C63FF, #FF6584)',
      headingGradient: 'linear(to-r, #6C63FF, #FF6584)',
      cardBg: 'whiteAlpha.900',
      bg: 'gray.50'
    },
    {
      eat: '#E53E3E',
      do: '#38A169',
      wear: '#3182CE',
      decide: '#805AD5',
      bgGradient: 'linear(to-br, #2D3748, #805AD5)',
      headingGradient: 'linear(to-r, #FBD38D, #FEB2B2)',
      cardBg: 'gray.800',
      bg: 'gray.800'
    }
  );

  // Funny messages
  const funnyMessages = [
    "Consulting the Oracle...",
    "Rolling cosmic dice...",
    "Asking a magic 8-ball...",
    "Divining your future...",
    "Tossing a coin in another dimension..."
  ];

  // Track window size
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const decide = async () => {
    setIsDeciding(true);
    setFunnyMessage(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
    
    try {
      const response = await axios.get(`http://localhost:5000/api/decide/${category}`);
      setTimeout(() => {
        setResult(response.data.result);
        setShowConfetti(true);
        setIsDeciding(false);
        setTimeout(() => setShowConfetti(false), 3000);
      }, 1500);
    } catch (error) {
      setFunnyMessage("Connection failed. Try again!");
      setIsDeciding(false);
    }
  };

  return (
    <Container
      maxW="container.lg"
      centerContent
      p={4}
      minH="100vh"
      position="relative"
    >
      {/* Background */}
      {useFancyBg ? <ParticlesBackground /> : (
        <Box
          position="fixed"
          inset={0}
          bg={colors.bg}
          zIndex={-1}
          transition="all 0.3s ease"
        />
      )}

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          colors={[colors.eat, colors.do, colors.wear, colors.decide]}
        />
      )}

      {/* Toggle Button */}
      <Button
        size="sm"
        position="absolute"
        top={4}
        right={4}
        onClick={() => setUseFancyBg(!useFancyBg)}
        zIndex={1}
        bg={useColorModeValue('whiteAlpha.600', 'blackAlpha.600')}
        backdropFilter="blur(10px)"
        _hover={{
          bg: useColorModeValue('whiteAlpha.800', 'blackAlpha.800')
        }}
      >
        {useFancyBg ? "🌃 Simple BG" : "🌈 W BG"}
      </Button>

      {/* Main Content */}
      <Box
        bg={colors.cardBg}
        p={8}
        borderRadius="2xl"
        boxShadow="2xl"
        w="full"
        maxW="md"
        backdropFilter={useFancyBg ? "blur(10px)" : "none"}
        borderWidth="1px"
        borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
        transition="all 0.3s ease"
        _hover={{
          boxShadow: useFancyBg ? '2xl' : 'xl'
        }}
      >
        <VStack spacing={6}>
          <Heading
            size={headingSize}
            bgGradient={colors.headingGradient}
            bgClip="text"
            textAlign="center"
            lineHeight="tall"
          >
            What Should I...
          </Heading>

          {/* Category Buttons */}
          <VStack spacing={4} w="full">
            {[
              { type: 'eat', label: 'Eat', emoji: '🍔' },
              { type: 'do', label: 'Do', emoji: '🎯' },
              { type: 'wear', label: 'Wear', emoji: '👕' }
            ].map(({ type, label, emoji }) => (
              <Button
                key={type}
                leftIcon={<FaRandom />}
                size={buttonSize}
                w="full"
                bg={colors[type]}
                color="white"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                  filter: 'brightness(1.1)'
                }}
                _active={{ transform: 'scale(0.98)' }}
                onClick={() => setCategory(type)}
                isLoading={isDeciding && category === type}
                boxShadow="md"
              >
                {emoji} {label}
              </Button>
            ))}
          </VStack>

          {/* Decision Button */}
          {category && (
            <Button
              rightIcon={<FaMagic />}
              size={buttonSize}
              w="full"
              mt={4}
              bg={colors.decide}
              color="white"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(159, 122, 234, 0.4)',
                filter: 'brightness(1.1)'
              }}
              onClick={decide}
              isLoading={isDeciding}
              loadingText={funnyMessage}
              boxShadow="0 4px 6px rgba(159, 122, 234, 0.3)"
            >
              ✨ Decide for Me!
            </Button>
          )}

          {/* Result Display */}
          {result && !isDeciding && (
  <Box 
    textAlign="center" 
    mt={6}
    p={6}
    borderRadius="xl"
    bg={boxBg}
    w="full"
  >
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                You should:
              </Text>
              <Text
                fontSize="3xl"
                fontWeight="extrabold"
                bgGradient={colors.headingGradient}
                bgClip="text"
                textShadow="0 2px 4px rgba(0,0,0,0.1)"
              >
                {result}
              </Text>
            </Box>
          )}
        </VStack>
      </Box>
    </Container>
  );
}

export default App;