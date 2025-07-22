// client/src/components/Logo.js
export default function Logo() {
  return (
    <svg width="120" height="120" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="90" fill="#3B82F6" />
      <text 
        x="100" y="110" 
        textAnchor="middle" 
        fill="white"
        fontFamily="Comic Sans MS"
        fontSize="40"
      >
        ?
      </text>
    </svg>
  );
}