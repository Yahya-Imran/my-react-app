// client/src/components/ShareButton.js
export default function ShareButton({ result }) {
  const share = async () => {
    try {
      await navigator.share({
        title: 'My Decision',
        text: `The app decided I should ${result}! Try it:`,
        url: window.location.href,
      });
    } catch (err) {
      // Fallback
      navigator.clipboard.writeText(`I'm going to ${result}! Try the app: ${window.location.href}`);
      alert('Copied to clipboard!');
    }
  };

  return (
    <Button 
      onClick={share}
      colorScheme="twitter"
      leftIcon={<FaShareAlt />}
      mt={4}
    >
      Share Your Decision
    </Button>
  );
}