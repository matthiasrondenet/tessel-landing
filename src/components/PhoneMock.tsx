import React from 'react';
import {
  BatteryHighIcon,
  BuildingsIcon,
  CellSignalHighIcon,
  CheckIcon,
  GearSixIcon,
  HandTapIcon,
  HouseLineIcon,
  ReceiptIcon,
  WifiHighIcon,
} from '@phosphor-icons/react';
import { useI18n } from '../i18n.tsx';

type Fill = 'a' | 'b' | 'ab' | 'c' | 't' | 'x';

const FILL: Record<Fill, string> = {
  a: 'var(--client-a)',
  b: 'var(--client-b)',
  ab: 'linear-gradient(to right, var(--client-a) 0 calc(50% - 1px), transparent calc(50% - 1px) calc(50% + 1px), var(--client-b) calc(50% + 1px))',
  c: 'var(--color-neutral-300)',
  t: 'repeating-linear-gradient(135deg, var(--color-neutral-300) 0 1.5px, var(--color-neutral-700) 1.5px 4px)',
  x: 'var(--color-neutral-800)',
};

// September 2026, Monday first: 31 Aug to 4 Oct. Tuesdays and Thursdays are on-site days.
const SITE_DAYS = [1, 3];
const SPECIAL: Partial<Record<number, [Fill, Fill]>> = {
  9: ['a', 'ab'],
  10: ['b', 'b'],
  14: ['c', 'c'],
  15: ['c', 'a'],
  17: ['ab', 'ab'],
  22: ['t', 't'],
};

interface Cell {
  d: number;
  opacity: number;
  today: boolean;
  onSite: boolean;
  am: string;
  pm: string;
  dashed: boolean;
  delay: number;
}

const buildCells = (): Cell[] =>
  Array.from({ length: 35 }, (_, i) => {
    const dow = i % 7;
    const inMonth = i >= 1 && i <= 30;
    const d = i === 0 ? 31 : i <= 30 ? i : i - 30;
    const weekend = dow >= 5;
    let am: Fill = 'x';
    let pm: Fill = 'x';
    let logged = true;
    const special = SPECIAL[d];
    if (!inMonth || weekend) {
      // empty tiles
    } else if (d > 24) {
      logged = false;
    } else if (special) {
      [am, pm] = special;
    } else {
      am = 'a';
      pm = 'a';
    }
    const today = inMonth && d === 25;
    const open = !logged || today;
    const worked = [am, pm].some((h) => h === 'a' || h === 'ab');
    return {
      d,
      opacity: inMonth ? (weekend ? 0.45 : 1) : 0.25,
      today,
      onSite: inMonth && !open && worked && SITE_DAYS.includes(dow),
      am: open ? 'transparent' : FILL[am],
      pm: open ? 'transparent' : FILL[pm],
      dashed: open,
      delay: i * 0.035,
    };
  });

const CELLS = buildCells();

export const PhoneMock: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="phone-wrap">
      <div className="phone-glow" />
      <div className="phone" aria-hidden="true">
        <div className="phone__status">
          <span>9:41</span>
          <span>
            <CellSignalHighIcon size={13} />
            <WifiHighIcon size={13} />
            <BatteryHighIcon size={13} />
          </span>
        </div>
        <div className="phone__body">
          <div className="phone__head">
            <div>
              <small>{t.mockDate}</small>
              <strong>{t.mockMonth}</strong>
            </div>
            <GearSixIcon size={17} />
          </div>
          <div className="phone__stats">
            {['15.5', '5.5', '€9,475'].map((value, i) => (
              <div key={t.mockStats[i]}>
                <strong>{value}</strong>
                <span>{t.mockStats[i]}</span>
              </div>
            ))}
          </div>
          <div className="cal">
            {t.mockDows.map((dw, i) => (
              <div key={i} className="cal__dow">
                {dw}
              </div>
            ))}
            {CELLS.map((c, i) => (
              <div key={i} className="cell" data-today={c.today} style={{ opacity: c.opacity }}>
                <span className="cell__head">
                  <span>{c.d}</span>
                  {c.onSite && <BuildingsIcon size={7} weight="fill" />}
                </span>
                {[c.am, c.pm].map((bg, k) => (
                  <div
                    key={k}
                    className="tile"
                    style={{
                      background: bg,
                      border: c.dashed ? '1px dashed var(--color-neutral-700)' : 0,
                      animationDelay: `${(c.delay + k * 0.06).toFixed(2)}s`,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="legend">
            <span>
              <i style={{ background: FILL.a }} />
              {t.mockClients[0]}
            </span>
            <span>
              <i style={{ background: FILL.b }} />
              {t.mockClients[1]}
            </span>
            <span>
              <i style={{ background: FILL.t }} />
              {t.mockTraining}
            </span>
            <span>
              <i style={{ background: FILL.c }} />
              {t.mockLeave}
            </span>
            <span>
              <BuildingsIcon size={9} weight="fill" style={{ color: 'var(--color-neutral-300)' }} />
              {t.mockOnSite}
            </span>
          </div>
        </div>
        <div className="sheet">
          <div className="sheet__grab" />
          <div className="sheet__title">
            <strong>{t.mockDayTitle}</strong>
            <span>{t.mockDayMission}</span>
            <span>{t.mockNotLogged}</span>
          </div>
          <div className="sheet__row">
            <div className="half">
              <small>{t.mockMorning}</small>
              <span>Northwind</span>
            </div>
            <div className="half">
              <small>{t.mockAfternoon}</small>
              <span>Northwind</span>
            </div>
            <div className="remote">
              <HouseLineIcon size={15} />
              {t.mockRemote}
            </div>
          </div>
          <div className="confirm">
            <CheckIcon size={14} />
            {t.confirmDay}
          </div>
        </div>
      </div>
      <div className="float float--left hide-m" aria-hidden="true">
        <span>
          <HandTapIcon size={14} />
        </span>
        <span>
          <strong>{t.floatTapTitle}</strong>
          <small>{t.floatTapText}</small>
        </span>
      </div>
      <div className="float float--right hide-m" aria-hidden="true">
        <span>
          <ReceiptIcon size={14} />
        </span>
        <span>
          <strong>{t.floatInvoiceTitle}</strong>
          <small>{t.floatInvoiceText}</small>
        </span>
      </div>
    </div>
  );
};
