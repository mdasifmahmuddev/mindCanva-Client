import React from 'react';
import { Link } from 'react-router';
import { Tooltip } from 'react-tooltip';
import { Palette, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import './Footer.css'

const Footer = () => {
  return (
    <footer className="relative bg-neutral text-neutral-content mt-16 overflow-hidden">
       

      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute w-64 h-64 bg-primary opacity-30 rounded-full blur-3xl top-0 -left-10 footer-animated"></div>
        <div className="absolute w-52 h-52 bg-accent opacity-30 rounded-full blur-3xl bottom-0 -right-10 footer-animated-reverse"></div>
        <div className="absolute w-48 h-48 bg-secondary opacity-30 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 footer-animated"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold text-primary">mindCanva</h3>
            </div>
            <p className="text-neutral-content opacity-80 text-sm leading-relaxed">
              A creative artwork showcase platform where artists share their masterpieces and connect with art lovers worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="footer-link text-neutral-content opacity-80 hover:opacity-100 text-sm block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="footer-link text-neutral-content opacity-80 hover:opacity-100 text-sm block">
                  Explore Artworks
                </Link>
              </li>
              <li>
                <Link to="/add-artwork" className="footer-link text-neutral-content opacity-80 hover:opacity-100 text-sm block">
                  Add Artwork
                </Link>
              </li>
              <li>
                <Link to="/my-gallery" className="footer-link text-neutral-content opacity-80 hover:opacity-100 text-sm block">
                  My Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-accent">Contact Info</h4>
            <ul className="space-y-3 text-neutral-content opacity-80 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@mindcanva.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-accent">Follow Us</h4>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-button"
                data-tooltip-id="facebook-tooltip"
                data-tooltip-content="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <Tooltip id="facebook-tooltip" place="top" />

              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-button"
                data-tooltip-id="x-tooltip"
                data-tooltip-content="X (Twitter)"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <Tooltip id="x-tooltip" place="top" />

              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-button"
                data-tooltip-id="instagram-tooltip"
                data-tooltip-content="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <Tooltip id="instagram-tooltip" place="top" />

              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-button"
                data-tooltip-id="linkedin-tooltip"
                data-tooltip-content="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <Tooltip id="linkedin-tooltip" place="top" />
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-content border-opacity-20 mt-8 pt-8 text-center">
          <p className="text-neutral-content opacity-70 text-sm">
            &copy; {new Date().getFullYear()} mindCanva. All rights reserved. Crafted with 
            <span className="text-error mx-1">❤</span> 
            for artists worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;