'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = (e: React.MouseEvent, email: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-root">
      <div className="footer-container">
        {/* Main Dual Inquiries Section */}
        <div className="footer-hero">
          <span className="footer-label">Initiate Dialogue</span>
          <div className="footer-dual-channels">
            {/* DAVLabs Channel */}
            <div className="footer-channel">
              <span className="footer-channel-tag">DAVLabs &bull; Systems &amp; Engineering</span>
              <div className="footer-cta-wrapper">
                <a
                  href="mailto:contact@davlabs.in"
                  onClick={(e) => handleCopyEmail(e, 'contact@davlabs.in')}
                  className="footer-email-link group"
                  title="Click to copy contact@davlabs.in"
                >
                  <span className="footer-email-text">contact@davlabs.in</span>
                  <span className="footer-email-arrow transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </a>
                {copiedEmail === 'contact@davlabs.in' && (
                  <span className="footer-copied-toast">Copied to clipboard</span>
                )}
              </div>
            </div>

            {/* Sparsh Design Channel */}
            <div className="footer-channel">
              <span className="footer-channel-tag">Sparsh Design &bull; Digital &amp; Tactile Craft</span>
              <div className="footer-cta-wrapper">
                <a
                  href="mailto:contact@sparshdesign.com"
                  onClick={(e) => handleCopyEmail(e, 'contact@sparshdesign.com')}
                  className="footer-email-link group"
                  title="Click to copy contact@sparshdesign.com"
                >
                  <span className="footer-email-text">contact@sparshdesign.com</span>
                  <span className="footer-email-arrow transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </a>
                {copiedEmail === 'contact@sparshdesign.com' && (
                  <span className="footer-copied-toast">Copied to clipboard</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Navigation & Details Grid */}
        <div className="footer-grid">
          {/* Brand & Ethos */}
          <div className="footer-col-brand">
            <div className="footer-brand-title">
              <span>DAVLabs</span>
              <span className="footer-brand-cross">&times;</span>
              <span className="opacity-75">Sparsh</span>
            </div>
            <p className="footer-brand-desc">
              Systems Engineering &amp; Sensory Design. Creating high-throughput architectures and tactile digital products.
            </p>
            <div className="footer-status">
              <span className="footer-status-dot" />
              <span className="footer-status-text">Available for select collaborations</span>
            </div>
          </div>

          {/* Disciplines Column */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Disciplines</h4>
            <ul className="footer-links">
              <li><span>Distributed Topologies</span></li>
              <li><span>Cloud Infrastructure</span></li>
              <li><span>Tactile Interfaces</span></li>
              <li><span>Design Systems</span></li>
            </ul>
          </div>

          {/* Navigation Column */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Index</h4>
            <ul className="footer-links">
              <li><a href="#hero">Hero</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#approach">Approach</a></li>
              <li><a href="#philosophy">Philosophy</a></li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Inquiries</h4>
            <ul className="footer-links">
              <li>
                <a href="mailto:contact@davlabs.in" title="DAVLabs Engineering">
                  contact@davlabs.in <span className="footer-link-sub">↗</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@sparshdesign.com" title="Sparsh Design">
                  contact@sparshdesign.com <span className="footer-link-sub">↗</span>
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  GitHub <span className="footer-link-sub">↗</span>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  LinkedIn <span className="footer-link-sub">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; 2026 DAVLabs &times; Sparsh Design. All rights reserved.
          </div>

          <div className="footer-location">
            <span>Engineering &amp; Craft</span>
          </div>

          <Button
            onClick={scrollToTop}
            variant="push"
            size="sm"
            className="!bg-zinc-900 border-zinc-700/80 gap-1.5 font-mono text-xs shadow-[0_3px_0_0_#000000]"
            aria-label="Back to top"
          >
            <span>Top</span>
            <span className="transition-transform duration-300 group-hover/button:-translate-y-0.5">↑</span>
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
