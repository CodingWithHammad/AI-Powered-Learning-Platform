// import { VapiClient } from '@vapi-ai/web'
// import { useRef,useEffect } from 'react'

// const vapi = useRef(null)

// useEffect(() => {
//   if (!vapi.current) {
//     vapi.current = new VapiClient(import.meta.env.VITE_VAPI_API_KEY)
//   }
// }, [])
// src/components/ui/vapi.tsx














import { Mic, MicOff, Phone, PhoneOff } from "lucide-react";

interface VapiControlsProps {
  isConnected: boolean;
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
}

export const VapiControls = ({
  isConnected,
  isListening,
  onStart,
  onStop,
}: VapiControlsProps) => {
  return (
    <div className="relative flex justify-center mt-6">
      {!isConnected ? (
        <button
          onClick={onStart}
          className="bg-green-600 text-white p-6 rounded-full hover:scale-105 transition"
        >
          <Phone className="w-8 h-8" />
        </button>
      ) : (
        <button
          onClick={onStop}
          className="bg-red-600 text-white p-6 rounded-full hover:scale-105 transition"
        >
          <PhoneOff className="w-8 h-8" />
        </button>
      )}
      {isListening && (
        <div className="absolute -inset-2 border-4 border-green-400 rounded-full animate-ping"></div>
      )}
    </div>
  );
};
