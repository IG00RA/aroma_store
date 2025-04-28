import React, { useState, useEffect } from "react";
import { Instagram, Phone, Mail, ExternalLink } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export type FooterConfig = {
  showSocials: boolean;
  socials: {
    instagram?: string;
    tiktok?: string;
  };
  contacts: {
    email: string;
    phone: string;
  };
  policies: {
    privacy: string;
    terms: string;
    shipping: string;
  };
  messengers: {
    telegram?: string;
    viber?: string;
    whatsapp?: string;
  };
};

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4c5 0 5 8 9 8" />
    </svg>
  );
};

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m22 2-7 20-4-9-9-4 20-7Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const ViberIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 4h16v16H4V4z" />
    <path d="M12 4v16" />
    <path d="M4 12h16" />
  </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 1 1 0c0 .97.96 1.5 2 1.5a.5.5 0 0 1 0 1c-1.5 0-3-1.07-3-2.5Z" />
    <path d="M8.5 8.5c0-2.35 1.95-3.5 3.5-3.5 1.55 0 3.5 1.15 3.5 3.5 0 1.4-.97 2.67-2.29 3.28-.43.26-.71.72-.71 1.22 0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-.95.53-1.81 1.36-2.24A3.18 3.18 0 0 0 14.5 8.5c0-1.81-1.46-2.5-2.5-2.5S9.5 6.69 9.5 8.5V9c0 .28-.22.5-.5.5S8.5 9.28 8.5 9v-.5Z" />
  </svg>
);

const Footer = () => {
  const [config, setConfig] = useState<FooterConfig>({
    showSocials: true,
    socials: {
      instagram: "#",
      tiktok: "#",
    },
    contacts: {
      email: "info@lovable.dev",
      phone: "+380 (XXX) XXX-XX-XX",
    },
    policies: {
      privacy: "#",
      terms: "#",
      shipping: "#",
    },
    messengers: {
      telegram: "#",
      viber: "#",
      whatsapp: "#",
    },
  });

  useEffect(() => {
    // Load footer configuration from localStorage
    const savedConfig = localStorage.getItem("footerConfig");
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (error) {
        console.error("Failed to parse footer config", error);
      }
    }
  }, []);

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container-section py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакти</h3>
            <div className="space-y-2">
              <a
                href={`mailto:${config.contacts.email}`}
                className="flex items-center text-gray-600 hover:text-product transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                {config.contacts.email}
              </a>
              <a
                href={`tel:${config.contacts.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center text-gray-600 hover:text-product transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                {config.contacts.phone}
              </a>
            </div>

            {(config.messengers.telegram ||
              config.messengers.viber ||
              config.messengers.whatsapp) && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Зв'язатися з нами:</h4>
                <div className="flex space-x-3">
                  {config.messengers.telegram && (
                    <a
                      href={config.messengers.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-product hover:text-white transition-colors"
                      aria-label="Telegram"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </a>
                  )}
                  {config.messengers.viber && (
                    <a
                      href={config.messengers.viber}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-product hover:text-white transition-colors"
                      aria-label="Viber"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </a>
                  )}
                  {config.messengers.whatsapp && (
                    <a
                      href={config.messengers.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-product hover:text-white transition-colors"
                      aria-label="WhatsApp"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Інформація</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={config.policies.privacy}
                  className="flex items-center text-gray-600 hover:text-product transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Політика конфіденційності
                </a>
              </li>
              <li>
                <a
                  href={config.policies.terms}
                  className="flex items-center text-gray-600 hover:text-product transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Умови використання
                </a>
              </li>
              <li>
                <a
                  href={config.policies.shipping}
                  className="flex items-center text-gray-600 hover:text-product transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Доставка та оплата
                </a>
              </li>
            </ul>
          </div>

          {config.showSocials && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Ми в соцмережах</h3>
              <div className="flex space-x-4">
                {config.socials.instagram && (
                  <a
                    href={config.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-product hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {config.socials.tiktok && (
                  <a
                    href={config.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-product hover:text-white transition-colors"
                    aria-label="TikTok"
                  >
                    <TiktokIcon className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
          © 2025 Mustage.dev. Усі права захищені.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
