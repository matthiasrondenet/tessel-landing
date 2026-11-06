import React from 'react';
import { GooglePlayLogoIcon } from '@phosphor-icons/react';
import { PLAY_STORE_URL } from '../constants.ts';
import { useI18n } from '../i18n.tsx';

// Renders a link once PLAY_STORE_URL is set, otherwise a non-clickable "soon" badge.
export const PlayStoreButton: React.FC = () => {
  const { t } = useI18n();
  const inner = (
    <>
      <GooglePlayLogoIcon size={28} weight="fill" aria-hidden="true" />
      <span className="store__text">
        <span className="store__small">{t.getItOn}</span>
        <span className="store__big">
          {t.playStore}
          {PLAY_STORE_URL === '' && <> · {t.soon}</>}
        </span>
      </span>
    </>
  );
  return PLAY_STORE_URL === '' ? (
    <span className="store store--soon">{inner}</span>
  ) : (
    <a className="store" href={PLAY_STORE_URL}>
      {inner}
    </a>
  );
};
