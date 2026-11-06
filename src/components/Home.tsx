import React from 'react';
import {
  AppleLogoIcon,
  ArrowRightIcon,
  BriefcaseIcon,
  CalendarBlankIcon,
  ChartBarIcon,
  CheckIcon,
  CloudArrowUpIcon,
  DeviceMobileIcon,
  EyeSlashIcon,
  ExportIcon,
  HardDrivesIcon,
  PlusIcon,
  ReceiptIcon,
  SunHorizonIcon,
  TranslateIcon,
  UserCircleDashedIcon,
  UserCircleMinusIcon,
} from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';
import { BASE, ISSUES_URL } from '../constants.ts';
import { useI18n } from '../i18n.tsx';
import { Layout } from './Layout.tsx';
import { Logo } from './Logo.tsx';
import { PhoneMock } from './PhoneMock.tsx';
import { PlayStoreButton } from './Store.tsx';

const HERO_ICONS: Icon[] = [UserCircleDashedIcon, DeviceMobileIcon, TranslateIcon];
const FEATURE_ICONS: Icon[] = [
  SunHorizonIcon,
  CalendarBlankIcon,
  ReceiptIcon,
  BriefcaseIcon,
  ChartBarIcon,
  ExportIcon,
];
const PRIVACY_ICONS: Icon[] = [HardDrivesIcon, UserCircleMinusIcon, EyeSlashIcon, CloudArrowUpIcon];

const pad = (n: number) => String(n).padStart(2, '0');

export const Home: React.FC = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <main>
        <section className="hero" id="top">
          <div className="wrap hero__inner">
            <div className="hero__text">
              <span className="kicker">
                <span className="kicker__dot" />
                {t.kicker}
              </span>
              <h1>
                {t.heroLine1}
                <span>{t.heroLine2}</span>
              </h1>
              <p className="hero__lead">{t.heroText}</p>
              <div className="hero__stores" id="download">
                <PlayStoreButton />
                <span className="store-later">
                  <AppleLogoIcon size={20} aria-hidden="true" />
                  {t.iosLater}
                </span>
              </div>
              <ul className="checks">
                {t.heroChecks.map((check, i) => {
                  const Ico = HERO_ICONS[i] ?? CheckIcon;
                  return (
                    <li key={check}>
                      <Ico size={16} aria-hidden="true" />
                      {check}
                    </li>
                  );
                })}
              </ul>
            </div>
            <PhoneMock />
          </div>
        </section>

        <section className="stats">
          <div className="wrap stats__inner">
            {t.stats.map((s) => (
              <div key={s.title}>
                <strong>{s.title}</strong>
                <span>{s.text}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="features">
          <div className="wrap section__inner section__inner--first">
            <div className="heading">
              <span className="kicker">{t.featuresEyebrow}</span>
              <h2 className="h2">{t.featuresTitle}</h2>
              <p>{t.featuresLead}</p>
            </div>
            <div className="cards">
              {t.features.map((f, i) => {
                const Ico = FEATURE_ICONS[i] ?? CheckIcon;
                return (
                  <article className="card" key={f.title}>
                    <div className="ico">
                      <Ico size={20} aria-hidden="true" />
                    </div>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="how">
          <div className="wrap section__inner">
            <div className="heading">
              <span className="kicker">{t.howEyebrow}</span>
              <h2 className="h2">{t.howTitle}</h2>
            </div>
            <div className="steps">
              {t.steps.map((step, i) => (
                <article className="step" key={step.title}>
                  <div className="step__demo" aria-hidden="true">
                    {i === 0 && (
                      <>
                        <div className="field">
                          <small>{t.stepClient}</small>
                          <div className="input">{t.stepClientName}</div>
                        </div>
                        <div className="row">
                          <div className="input">{t.stepRate}</div>
                          <div className="days">
                            {['M', 'T', 'W', 'T'].map((d, k) => (
                              <span key={k} data-on={k % 2 === 1}>
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                    {i === 1 && (
                      <>
                        <div className="sheet__row">
                          <div className="half">
                            <small>{t.mockMorning}</small>
                            <span>Northwind</span>
                          </div>
                          <div className="half half--split">
                            <small>{t.mockAfternoon}</small>
                            <span>{t.stepSplit}</span>
                          </div>
                        </div>
                        <div className="confirm">
                          <CheckIcon size={14} />
                          {t.confirmDay}
                        </div>
                      </>
                    )}
                    {i === 2 &&
                      t.stepInvoices.map((inv, k) => (
                        <div className="invoice" key={inv.number} data-paid={k === 1}>
                          <div>
                            <strong>{inv.number}</strong>
                            <small>{inv.period}</small>
                          </div>
                          <span>{inv.amount}</span>
                          <span className={k === 1 ? 'tag tag--paid' : 'tag'}>
                            {k === 1 && <CheckIcon size={11} />}
                            {inv.status}
                          </span>
                        </div>
                      ))}
                  </div>
                  <div className="step__text">
                    <span className="mono">{pad(i + 1)}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="privacy">
          <div className="wrap section__inner">
            <div className="privacy">
              <div className="privacy__text">
                <span className="kicker">{t.privacyEyebrow}</span>
                <h2>{t.privacyTitle}</h2>
                <p>{t.privacyText}</p>
                <a className="link-arrow" href={`${BASE}privacy/`}>
                  {t.privacyLink}
                  <ArrowRightIcon size={16} aria-hidden="true" />
                </a>
              </div>
              <div className="privacy__grid">
                {t.privacyCards.map((c, i) => {
                  const Ico = PRIVACY_ICONS[i] ?? CheckIcon;
                  return (
                    <div className="mini" key={c.title}>
                      <Ico size={22} aria-hidden="true" />
                      <strong>{c.title}</strong>
                      <span>{c.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="faq">
          <div className="wrap faq">
            <div className="faq__head">
              <span className="kicker">{t.faqEyebrow}</span>
              <h2>{t.faqTitle}</h2>
              <p>
                {t.faqMore} <a href={ISSUES_URL}>{t.faqContact}</a>.
              </p>
            </div>
            <div className="faq__list">
              {t.faq.map((item, i) => (
                <details key={item.question} open={i === 0}>
                  <summary>
                    {item.question}
                    <PlusIcon size={18} aria-hidden="true" />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="wrap final">
            <Logo size="lg" />
            <h2>{t.ctaTitle}</h2>
            <PlayStoreButton />
          </div>
        </section>
      </main>
    </Layout>
  );
};
