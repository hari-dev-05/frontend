import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/917299515354"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-lg hover:scale-110 transition-smooth glow-primary group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white group-hover:animate-float" />
    </a>
  );
};

export default WhatsAppButton;
