import React from 'react';
import { 
  FiGithub, 
  FiTwitter, 
  FiMail, 
  FiExternalLink,
  FiCodepen,
  FiLinkedin as FiLinkedInIcon
} from 'react-icons/fi';
import { 
  FaLinkedin, 
  FaFacebook, 
  FaInstagram, 
  FaDribbble, 
  FaBehance,
  FaQrcode
} from 'react-icons/fa';

import { SiTiktok } from 'react-icons/si';

// Individual icon components with consistent styling
export const GithubIcon = ({ className = "" }) => (
  <FiGithub className={`w-5 h-5 ${className}`} />
);

export const LinkedInIcon = ({ className = "" }) => (
  <FaLinkedin className={`w-5 h-5 ${className}`} />
);

export const TwitterIcon = ({ className = "" }) => (
  <FiTwitter className={`w-5 h-5 ${className}`} />
);

export const FacebookIcon = ({ className = "" }) => (
  <FaFacebook className={`w-5 h-5 ${className}`} />
);

export const InstagramIcon = ({ className = "" }) => (
  <FaInstagram className={`w-5 h-5 ${className}`} />
);

export const TikTokIcon = ({ className = "" }) => (
  <SiTiktok className={`w-5 h-5 ${className}`} />
);

export const EmailIcon = ({ className = "" }) => (
  <FiMail className={`w-5 h-5 ${className}`} />
);

export const ExternalLinkIcon = ({ className = "" }) => (
  <FiExternalLink className={`w-5 h-5 ${className}`} />
);

export const QRCodeIcon = ({ className = "" }) => (
  <FaQrcode className={`w-5 h-5 ${className}`} />
);

// Social link types for type safety
type SocialLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
};

// Reusable social link component
export const SocialLink = ({ href, icon, label, className = "" }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${className}`}
    aria-label={label}
  >
    {icon}
    <span className="font-medium text-sm">{label}</span>
  </a>
);

// Social icons component with multiple presets
const SocialIcons = ({ className = "" }) => {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      <SocialLink
        href="https://github.com/developer-khadim"
        icon={<GithubIcon />}
        label="GitHub"
        className="bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900"
      />
      <SocialLink
        href="https://www.linkedin.com/in/khadim-ali12/"
        icon={<LinkedInIcon />}
        label="LinkedIn"
        className="bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-900"
      />
    </div>
  );
};

// Smaller social icons without text, for more compact layouts
export const SocialIconsCompact = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a
        href="https://github.com/developer-khadim"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="GitHub"
      >
        <GithubIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/khadim-ali12/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 transition-colors"
        aria-label="LinkedIn"
      >
        <LinkedInIcon />
      </a>
    </div>
  );
};

// Footer social icons with different styling
export const FooterSocialIcons = () => {
  return (
    <div className="flex items-center justify-center gap-6">
      <a
        href="https://github.com/developer-khadim"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
        aria-label="GitHub"
      >
        <GithubIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/khadim-ali12/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors"
        aria-label="LinkedIn"
      >
        <LinkedInIcon />
      </a>
    </div>
  );
};

export default SocialIcons;
