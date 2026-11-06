import React from 'react';
import {
  ArrowLeftIcon,
  CalendarCheckIcon,
  CloudSlashIcon,
  DeviceMobileIcon,
  EnvelopeSimpleIcon,
  HardDrivesIcon,
  ShareNetworkIcon,
  TranslateIcon,
} from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';
import { BASE, ISSUES_URL } from '../constants.ts';
import { useI18n } from '../i18n.tsx';
import { Layout } from './Layout.tsx';

const SUMMARY_ICONS: Icon[] = [CloudSlashIcon, ShareNetworkIcon, HardDrivesIcon];

// "Label :: text" renders the label in bold.
const renderItem = (item: string) => {
  const sep = item.indexOf(' :: ');
  return sep === -1 ? (
    item
  ) : (
    <>
      <strong>{item.slice(0, sep)}</strong> : {item.slice(sep + 4)}
    </>
  );
};

export const Privacy: React.FC = () => {
  const { lang, t, setLang } = useI18n();
  const other = lang === 'fr' ? 'en' : 'fr';

  return (
    <Layout>
      <main>
        <section className="policy-head">
          <div className="wrap policy-head__inner">
            <span className="kicker">{t.policyKicker}</span>
            <h1>{t.policyTitle}</h1>
            <div className="meta">
              <span>
                <CalendarCheckIcon size={16} aria-hidden="true" />
                {t.policyEffective}
              </span>
              <span>
                <DeviceMobileIcon size={16} aria-hidden="true" />
                {t.policyApplies}
              </span>
              <a
                href={BASE}
                onClick={(e) => {
                  e.preventDefault();
                  setLang(other);
                }}
              >
                <TranslateIcon size={16} aria-hidden="true" />
                {t.policyOtherLang}
              </a>
            </div>
            <div className="summary">
              {t.policySummary.map((s, i) => {
                const Ico = SUMMARY_ICONS[i] ?? HardDrivesIcon;
                return (
                  <div key={s.label}>
                    <span className="summary__label">
                      <Ico size={20} aria-hidden="true" />
                      {s.label}
                    </span>
                    <strong>{s.value}</strong>
                    <p>{s.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="wrap policy">
          <nav className="toc hide-m" aria-label={t.policyToc}>
            <span className="toc__label">{t.policyToc}</span>
            {t.policyBlocks.map((b) => (
              <a key={b.id} href={`#${b.id}`}>
                {b.title}
              </a>
            ))}
            <a href={BASE}>
              <ArrowLeftIcon size={12} aria-hidden="true" /> {t.policyBack}
            </a>
          </nav>

          <article className="policy__main">
            {t.policyBlocks.map((b, i) => (
              <section key={b.id} id={b.id} className="block">
                <h2>
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  {b.title}
                </h2>
                {b.intro && <p>{b.intro}</p>}
                {b.items && (
                  <ul>
                    {b.items.map((item) => (
                      <li key={item}>{renderItem(item)}</li>
                    ))}
                  </ul>
                )}
                {b.text && <p>{b.text}</p>}
                {b.id === 'contact' && (
                  <a className="mailbox" href={ISSUES_URL}>
                    <EnvelopeSimpleIcon size={18} aria-hidden="true" />
                    {t.policyContactLabel}
                  </a>
                )}
              </section>
            ))}
          </article>
        </div>
      </main>
    </Layout>
  );
};
