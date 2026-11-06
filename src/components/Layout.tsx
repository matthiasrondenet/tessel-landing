import React from 'react';
import { DownloadSimpleIcon } from '@phosphor-icons/react';
import { BASE, DEVELOPER, ISSUES_URL } from '../constants.ts';
import { useI18n } from '../i18n.tsx';
import { Logo } from './Logo.tsx';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang, t, toggle } = useI18n();

  return (
    <div className="page">
      <header className="site-header">
        <div className="wrap site-header__inner">
          <a className="brand" href={BASE}>
            <Logo size="sm" />
            <span>Tessel</span>
          </a>
          <nav className="nav hide-m" aria-label={t.navLabel}>
            <a href={`${BASE}#features`}>{t.navFeatures}</a>
            <a href={`${BASE}#how`}>{t.navHow}</a>
            <a href={`${BASE}#privacy`}>{t.navPrivacy}</a>
            <a href={`${BASE}#faq`}>{t.navFaq}</a>
          </nav>
          <button type="button" className="lang" onClick={toggle} aria-label={t.switchLabel}>
            <span className="lang__chip" data-active={lang === 'en'}>
              EN
            </span>
            <span className="lang__chip" data-active={lang === 'fr'}>
              FR
            </span>
          </button>
          <a className="cta-small" href={`${BASE}#download`}>
            <DownloadSimpleIcon size={16} aria-hidden="true" />
            <span className="hide-m">{t.headerCta}</span>
          </a>
        </div>
      </header>

      {children}

      <footer className="site-footer">
        <div className="wrap">
          <div className="rule" />
        </div>
        <div className="wrap site-footer__inner">
          <span className="site-footer__about">
            Tessel
            <span>
              © {new Date().getFullYear()} {DEVELOPER}
            </span>
          </span>
          <a href={`${BASE}privacy/`}>{t.privacyPolicy}</a>
          <a href={ISSUES_URL}>{t.contact}</a>
          <a href={`${BASE}#download`}>{t.playStore}</a>
        </div>
      </footer>
    </div>
  );
};
