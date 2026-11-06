import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'fr' | 'en';
export type Page = 'home' | 'privacy';

const STORAGE_KEY = 'tessel-landing-lang';

interface Titled {
  title: string;
  text: string;
}

interface Faq {
  question: string;
  answer: string;
}

interface PolicyBlock {
  id: string;
  title: string;
  intro?: string;
  // "Label :: text" renders the label in bold.
  items?: string[];
  text?: string;
}

export interface Copy {
  documentTitle: string;
  description: string;
  navLabel: string;
  switchLabel: string;
  navFeatures: string;
  navHow: string;
  navPrivacy: string;
  navFaq: string;
  headerCta: string;

  // Hero
  kicker: string;
  heroLine1: string;
  heroLine2: string;
  heroText: string;
  getItOn: string;
  playStore: string;
  soon: string;
  iosLater: string;
  heroChecks: string[];

  // Phone mock
  mockDate: string;
  mockMonth: string;
  mockStats: string[];
  mockDows: string[];
  mockClients: string[];
  mockTraining: string;
  mockLeave: string;
  mockOnSite: string;
  mockDayTitle: string;
  mockDayMission: string;
  mockNotLogged: string;
  mockMorning: string;
  mockAfternoon: string;
  mockRemote: string;
  confirmDay: string;
  floatTapTitle: string;
  floatTapText: string;
  floatInvoiceTitle: string;
  floatInvoiceText: string;

  // Stat band
  stats: Titled[];

  // Features
  featuresEyebrow: string;
  featuresTitle: string;
  featuresLead: string;
  features: Titled[];

  // How it works
  howEyebrow: string;
  howTitle: string;
  steps: Titled[];
  stepClient: string;
  stepClientName: string;
  stepRate: string;
  stepMonthLabel: string;
  stepSplit: string;
  stepInvoices: { number: string; period: string; amount: string; status: string }[];

  // Privacy section
  privacyEyebrow: string;
  privacyTitle: string;
  privacyText: string;
  privacyLink: string;
  privacyCards: Titled[];

  // FAQ
  faqEyebrow: string;
  faqTitle: string;
  faqMore: string;
  faqContact: string;
  faq: Faq[];

  // Final CTA
  ctaTitle: string;

  // Footer
  privacyPolicy: string;
  contact: string;

  // Privacy policy page
  policyDocumentTitle: string;
  policyDescription: string;
  policyBack: string;
  policyKicker: string;
  policyTitle: string;
  policyEffective: string;
  policyApplies: string;
  policyOtherLang: string;
  policySummary: { label: string; value: string; text: string }[];
  policyToc: string;
  policyBlocks: PolicyBlock[];
  policyContactLabel: string;
}

const fr: Copy = {
  documentTitle: 'Tessel — Votre temps, tuile par tuile',
  description:
    'Tessel est un suivi de temps pour les freelances en mission longue. Saisissez chaque journée en un geste, voyez ce qu’il faut facturer. Sans compte, fonctionne hors ligne.',
  navLabel: 'Navigation principale',
  switchLabel: 'Passer en anglais',
  navFeatures: 'Fonctions',
  navHow: 'Comment ça marche',
  navPrivacy: 'Vie privée',
  navFaq: 'FAQ',
  headerCta: 'Obtenir l’app',

  kicker: 'Suivi de temps pour freelances',
  heroLine1: 'Votre temps,',
  heroLine2: 'tuile par tuile.',
  heroText:
    'Saisissez chaque journée en un geste, voyez exactement ce qu’il faut facturer en fin de mois et gardez toutes vos missions au même endroit. Sans compte. Vos données restent sur votre téléphone.',
  getItOn: 'Disponible sur',
  playStore: 'Google Play',
  soon: 'bientôt',
  iosLater: 'iOS · plus tard',
  heroChecks: ['Sans inscription', 'Fonctionne hors ligne', 'English & Français'],

  mockDate: 'Vendredi 25',
  mockMonth: 'Septembre 2026',
  mockStats: ['Jours facturables', 'Sur site', 'HT'],
  mockDows: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
  mockClients: ['Northwind', 'Lumen'],
  mockTraining: 'Formation',
  mockLeave: 'Congé',
  mockOnSite: 'Sur site',
  mockDayTitle: 'Ven. 25 sept.',
  mockDayMission: 'Northwind · Plateforme data',
  mockNotLogged: 'Non saisi',
  mockMorning: 'Matin',
  mockAfternoon: 'Après-midi',
  mockRemote: 'Remote',
  confirmDay: 'Valider la journée',
  floatTapTitle: '1 tap',
  floatTapText: 'pour un jour habituel',
  floatInvoiceTitle: 'Facture F-2026-09',
  floatInvoiceText: 'prête à enregistrer',

  stats: [
    { title: '1 tap', text: 'pour saisir un jour habituel, prérempli depuis votre mission' },
    { title: '3 taps', text: 'pour enregistrer la facture du mois, numéro compris' },
    { title: '0 compte', text: 'rien à créer, rien envoyé à un serveur' },
  ],

  featuresEyebrow: 'Ce que fait Tessel',
  featuresTitle: 'Pensé pour le mois du freelance, pas pour un chronomètre.',
  featuresLead:
    'Tessel compte les jours et demi-journées comme votre contrat client, puis les transforme en ce que vous facturez.',
  features: [
    {
      title: 'Saisissez le jour en un tap',
      text: 'Chaque jour arrive prérempli : mission active, sur site ou remote selon vos jours habituels, jours fériés déjà marqués. Il suffit de valider.',
    },
    {
      title: 'Le mois d’un coup d’œil',
      text: 'Chaque demi-journée est une tuile, colorée par client. Congés et formations se distinguent tout de suite, et les trous sautent aux yeux.',
    },
    {
      title: 'Sachez ce qu’il faut facturer',
      text: 'Jours × TJM, TVA comprise, prochain numéro de facture prêt. Suivez les factures impayées et en retard jusqu’au paiement.',
    },
    {
      title: 'Deux clients en même temps ? Aucun souci.',
      text: 'Chaque client a sa couleur. Une demi-journée partagée entre deux s’affiche en tuile scindée et se facture pour moitié à chacun.',
    },
    {
      title: 'Votre exercice fiscal, totalisé',
      text: 'Une vue annuelle avec jours facturables et chiffre d’affaires par mois, à partir du mois où commence votre exercice.',
    },
    {
      title: 'Exportez quand il le faut',
      text: 'Un CSV de toutes les saisies pour votre comptable, ou un relevé mensuel en PDF à faire signer par votre client.',
    },
  ],

  howEyebrow: 'Comment ça marche',
  howTitle: 'Configurez une fois. Saisissez chaque jour. Facturez chaque mois.',
  steps: [
    {
      title: 'Ajoutez votre mission',
      text: 'Client, TJM, date de début et jours habituels sur site. Moins d’une minute.',
    },
    {
      title: 'Validez chaque jour',
      text: 'Un tap pour un jour habituel. Touchez une demi-journée pour changer de client, la partager entre deux, ou marquer congé ou formation.',
    },
    {
      title: 'Facturez en fin de mois',
      text: 'Votre total est déjà calculé. Enregistrez la facture, puis marquez-la payée quand l’argent arrive.',
    },
  ],
  stepClient: 'Client',
  stepClientName: 'Northwind',
  stepRate: '600 €/jour',
  stepMonthLabel: 'Matin / Après-midi',
  stepSplit: 'Northwind + Lumen',
  stepInvoices: [
    {
      number: 'F-2026-09-014',
      period: 'Septembre · 19 jours',
      amount: '11 400 €',
      status: 'Impayée',
    },
    { number: 'F-2026-08-013', period: 'Août · 20 jours', amount: '12 000 €', status: 'Payée' },
  ],

  privacyEyebrow: 'Privé par conception',
  privacyTitle: 'Vos tarifs et vos clients ne regardent personne.',
  privacyText:
    'Tessel garde tout dans une base de données sur votre téléphone. Pas de compte requis, pas de pistage. Vous décidez quand quelque chose quitte l’appareil : en exportant vous-même, ou en activant la sauvegarde en ligne optionnelle, désactivée par défaut et protégée par un simple code de récupération.',
  privacyLink: 'Lire la politique de confidentialité',
  privacyCards: [
    { title: 'Stocké sur l’appareil', text: 'Base locale, fonctionne hors ligne' },
    { title: 'Aucun compte requis', text: 'Ni e-mail, ni mot de passe' },
    { title: 'Aucun pistage', text: 'Ni pub, ni analytics' },
    { title: 'Sauvegarde optionnelle', text: 'Désactivée par défaut, code de récupération' },
  ],

  faqEyebrow: 'FAQ',
  faqTitle: 'Vos questions, nos réponses.',
  faqMore: 'Autre chose ?',
  faqContact: 'Écrivez-nous',
  faq: [
    {
      question: 'Tessel est-il gratuit ?',
      answer: 'Oui, Tessel se télécharge et s’utilise gratuitement.',
    },
    {
      question: 'Ai-je besoin d’un compte ?',
      answer:
        'Non. Ouvrez l’app, configurez votre mission, commencez à saisir. Il n’y a rien à créer. Un compte n’est créé que si vous activez la sauvegarde en ligne.',
    },
    {
      question: 'Que se passe-t-il si je change de téléphone ?',
      answer:
        'Vos données vivent sur votre appareil. Activez la sauvegarde dans les réglages pour obtenir un code de récupération, puis saisissez-le sur le nouveau téléphone. Sinon, exportez un CSV avant de changer, ou appuyez-vous sur la sauvegarde Android si elle est activée.',
    },
    {
      question: 'Peut-on suivre des demi-journées, ou des heures ?',
      answer:
        'Des demi-journées et des journées entières pour l’instant. Le suivi horaire est prévu.',
    },
    {
      question: 'Connaît-il les jours fériés ?',
      answer:
        'Oui. Choisissez votre pays à la configuration et les jours fériés sont marqués automatiquement, calculés sur l’appareil.',
    },
    {
      question: 'Existe-t-il une version iPhone ?',
      answer: 'Tessel sort d’abord sur Android. iOS viendra plus tard.',
    },
  ],

  ctaTitle: 'Arrêtez de reconstituer votre mois de mémoire.',

  privacyPolicy: 'Politique de confidentialité',
  contact: 'Contact',

  policyDocumentTitle: 'Politique de confidentialité — Tessel',
  policyDescription:
    'Politique de confidentialité de Tessel : rien n’est collecté, tout reste sur votre téléphone sauf si vous activez la sauvegarde optionnelle.',
  policyBack: 'Retour à l’accueil',
  policyKicker: 'Mentions légales',
  policyTitle: 'Politique de confidentialité',
  policyEffective: 'En vigueur depuis le 6 novembre 2026',
  policyApplies: 'S’applique à l’app Android Tessel et à ce site',
  policyOtherLang: 'English version',
  policySummary: [
    {
      label: 'Collecté',
      value: 'Rien par défaut',
      text: 'Nous ne recevons aucune donnée tant que vous n’activez pas la sauvegarde.',
    },
    {
      label: 'Partagé',
      value: 'Avec personne',
      text: 'Ni pub, ni analytics, ni SDK tiers.',
    },
    {
      label: 'Stocké',
      value: 'Sur votre téléphone',
      text: 'Effacez tout en désinstallant l’app.',
    },
  ],
  policyToc: 'Sur cette page',
  policyBlocks: [
    {
      id: 'who',
      title: 'Qui sommes-nous',
      text: 'Tessel est développé et publié par YASD (« nous »). Nous sommes responsables de cette politique et de l’app Tessel.',
    },
    {
      id: 'data',
      title: 'Données que l’app manipule',
      intro:
        'Pour fonctionner, Tessel enregistre les informations que vous saisissez dans une base de données locale, sur votre appareil :',
      items: [
        'Clients et missions :: noms de clients, intitulés de mission, TJM, taux de TVA, dates de début et de fin, jours habituels sur site, délais de paiement.',
        'Saisies journalières :: pour chaque jour, le type de chaque demi-journée (mission, formation, congé, jour férié…), sur site ou remote, et la note éventuelle.',
        'Factures :: numéros, dates d’émission, montants et statut de paiement.',
        'Réglages :: langue, unité de suivi, pays des jours fériés, début de l’exercice fiscal.',
      ],
      text: 'Ces données ne quittent pas votre appareil, sauf si vous les exportez ou si vous activez la sauvegarde en ligne décrite ci-dessous.',
    },
    {
      id: 'backup-sync',
      title: 'Sauvegarde et synchronisation optionnelles',
      intro:
        'La sauvegarde en ligne est désactivée par défaut. Si vous l’activez dans Réglages › Sauvegarde et synchro :',
      items: [
        'Un compte est créé sans e-mail ni mot de passe. Il est identifié par un code de récupération que l’app vous affiche et conserve dans le trousseau sécurisé de l’appareil. Côté serveur, ce code n’est stocké que sous forme hachée.',
        'Vos clients, missions, saisies journalières, factures et réglages sont envoyés à notre serveur afin d’être restaurés sur un autre téléphone. Aucune autre donnée n’est transmise.',
        'Sans votre code de récupération, nous ne pouvons pas rétablir l’accès à votre sauvegarde.',
        'Vous pouvez à tout moment supprimer la sauvegarde en ligne depuis l’app : toutes les copies synchronisées sont alors effacées du serveur, et les données de votre téléphone sont conservées.',
      ],
      text: 'Nous n’utilisons ces données que pour assurer la sauvegarde et la synchronisation. Nous ne les vendons pas, ne les louons pas et ne les partageons pas.',
    },
    {
      id: 'not',
      title: 'Ce que nous ne faisons pas',
      items: [
        'Aucun compte, e-mail ou mot de passe n’est exigé pour utiliser l’app.',
        'Aucune publicité, aucun identifiant publicitaire.',
        'Aucun outil d’analyse, de rapport de plantage ou de pistage n’est inclus.',
        'Nous ne vendons, ne louons et ne partageons vos données avec personne.',
        'Les jours fériés sont calculés sur l’appareil ; aucune requête réseau n’est faite pour cela.',
      ],
    },
    {
      id: 'export',
      title: 'Exports et partage',
      text: 'Vous pouvez exporter vos saisies en CSV ou en relevé PDF. Les exports sont créés sur votre appareil puis confiés au menu de partage d’Android. La suite (e-mail, Google Drive, autre app) relève de votre choix, et la politique de confidentialité de la destination s’applique.',
    },
    {
      id: 'device-backup',
      title: 'Sauvegarde Android',
      text: 'Si la sauvegarde Android est activée dans les réglages de votre téléphone, Android peut inclure les données de Tessel dans la sauvegarde de votre compte Google afin de les restaurer sur un nouvel appareil. Cette sauvegarde est gérée par Google et peut être désactivée dans Paramètres › Système › Sauvegarde.',
    },
    {
      id: 'perms',
      title: 'Autorisations',
      text: 'Tessel ne demande aucune autorisation spéciale. Il n’accède ni à votre position, ni à vos contacts, ni à l’appareil photo, ni au micro, ni à vos fichiers au-delà de ceux que vous choisissez de partager.',
    },
    {
      id: 'delete',
      title: 'Supprimer vos données',
      text: 'Vos données sont sur votre appareil, vous gardez la main. Vous pouvez supprimer des saisies, missions et factures dans l’app, supprimer la sauvegarde en ligne depuis les réglages, ou désinstaller l’app, ce qui efface toutes ses données locales.',
    },
    {
      id: 'kids',
      title: 'Enfants',
      text: 'Tessel est un outil professionnel destiné aux indépendants. Il ne s’adresse pas aux enfants de moins de 13 ans (ou de moins de 16 ans lorsque la loi locale l’exige), et nous ne traitons pas sciemment de données d’enfants.',
    },
    {
      id: 'site',
      title: 'Ce site web',
      text: 'Ce site n’utilise ni cookies ni analytics. Son hébergeur, GitHub Pages, peut conserver des journaux techniques standard (adresse IP, type de navigateur) à des fins de sécurité, selon sa propre politique.',
    },
    {
      id: 'rights',
      title: 'Vos droits',
      text: 'Selon le RGPD et les lois comparables, vous disposez d’un droit d’accès, de rectification, d’effacement et de portabilité de vos données personnelles. Vous pouvez les exercer directement dans l’app (export, modification, suppression de la sauvegarde). En cas de question ou de souci, contactez-nous ; vous pouvez aussi saisir votre autorité de protection des données (en France, la CNIL).',
    },
    {
      id: 'changes',
      title: 'Modifications de cette politique',
      text: 'Si la manière dont Tessel traite les données change, nous mettrons à jour cette page et sa date d’entrée en vigueur avant la sortie du changement, et nous le mentionnerons dans les notes de version.',
    },
    {
      id: 'contact',
      title: 'Contact',
      text: 'Une question sur cette politique ou sur votre vie privée ? Ouvrez un ticket :',
    },
  ],
  policyContactLabel: 'Ouvrir un ticket sur GitHub',
};

const en: Copy = {
  documentTitle: 'Tessel — Your time, tile by tile',
  description:
    'Tessel is a time tracker for freelancers on long client missions. Log each day in one tap, see what to invoice. No account, works offline.',
  navLabel: 'Main navigation',
  switchLabel: 'Switch to French',
  navFeatures: 'Features',
  navHow: 'How it works',
  navPrivacy: 'Privacy',
  navFaq: 'FAQ',
  headerCta: 'Get the app',

  kicker: 'Time tracker for freelancers',
  heroLine1: 'Your time,',
  heroLine2: 'tile by tile.',
  heroText:
    'Log each day in one tap, see exactly what to invoice at month end, and keep every mission in one place. No account. Your data stays on your phone.',
  getItOn: 'Get it on',
  playStore: 'Google Play',
  soon: 'soon',
  iosLater: 'iOS · coming later',
  heroChecks: ['No sign-up', 'Works offline', 'English & Français'],

  mockDate: 'Friday 25',
  mockMonth: 'September 2026',
  mockStats: ['Billable days', 'On site', 'Ex VAT'],
  mockDows: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  mockClients: ['Northwind', 'Lumen'],
  mockTraining: 'Training',
  mockLeave: 'Leave',
  mockOnSite: 'On site',
  mockDayTitle: 'Fri 25 Sep',
  mockDayMission: 'Northwind · Data platform',
  mockNotLogged: 'Not logged',
  mockMorning: 'Morning',
  mockAfternoon: 'Afternoon',
  mockRemote: 'Remote',
  confirmDay: 'Confirm day',
  floatTapTitle: '1 tap',
  floatTapText: 'on a usual day',
  floatInvoiceTitle: 'Invoice F-2026-09',
  floatInvoiceText: 'ready to log',

  stats: [
    { title: '1 tap', text: 'to log a usual day, prefilled from your mission' },
    { title: '3 taps', text: 'to log the month’s invoice, number included' },
    { title: '0 accounts', text: 'nothing to sign up for, nothing sent to a server' },
  ],

  featuresEyebrow: 'What it does',
  featuresTitle: 'Built around the freelancer’s month, not a stopwatch.',
  featuresLead:
    'Tessel counts days and half-days the way your client contract does, then turns them into what you bill.',
  features: [
    {
      title: 'Log today in one tap',
      text: 'Each day comes prefilled: active mission, on-site or remote from your usual days, public holidays already marked. Just confirm.',
    },
    {
      title: 'See the month at a glance',
      text: 'Every half-day is a tile, coloured by client. Leave and training look different at a glance, and gaps stand out.',
    },
    {
      title: 'Know what to invoice',
      text: 'Days × rate, VAT included, next invoice number ready. Track unpaid and overdue invoices until they’re paid.',
    },
    {
      title: 'Two clients at once? Fine.',
      text: 'Each client gets its own colour. A half-day shared between two shows as a split tile and is billed half to each.',
    },
    {
      title: 'Your fiscal year, totalled',
      text: 'Year view with billable days and revenue per month, starting from the month your fiscal year does.',
    },
    {
      title: 'Export when you need it',
      text: 'A CSV of every entry for your accountant, or a monthly timesheet PDF for your client to sign.',
    },
  ],

  howEyebrow: 'How it works',
  howTitle: 'Set up once. Tap daily. Bill monthly.',
  steps: [
    {
      title: 'Add your mission',
      text: 'Client, daily rate, start date and the days you’re usually on site. Under a minute.',
    },
    {
      title: 'Confirm each day',
      text: 'One tap on a usual day. Tap a half-day to switch client, split it between two, or mark leave or training.',
    },
    {
      title: 'Invoice at month end',
      text: 'Your total is already computed. Log the invoice, then mark it paid when the money lands.',
    },
  ],
  stepClient: 'Client',
  stepClientName: 'Northwind',
  stepRate: '600 €/day',
  stepMonthLabel: 'Morning / Afternoon',
  stepSplit: 'Northwind + Lumen',
  stepInvoices: [
    { number: 'F-2026-09-014', period: 'September · 19 days', amount: '€11,400', status: 'Unpaid' },
    { number: 'F-2026-08-013', period: 'August · 20 days', amount: '€12,000', status: 'Paid' },
  ],

  privacyEyebrow: 'Private by design',
  privacyTitle: 'Your rates and clients are nobody’s business.',
  privacyText:
    'Tessel stores everything in a database on your phone. No account needed, no tracking. You decide when something leaves the device: by exporting it yourself, or by turning on the optional online backup, which is off by default and protected by a simple recovery code.',
  privacyLink: 'Read the privacy policy',
  privacyCards: [
    { title: 'Stored on device', text: 'Local database, works offline' },
    { title: 'No account needed', text: 'No email, no password' },
    { title: 'No tracking', text: 'No ads, no analytics' },
    { title: 'Optional backup', text: 'Off by default, recovery code' },
  ],

  faqEyebrow: 'FAQ',
  faqTitle: 'Questions, answered.',
  faqMore: 'Something else?',
  faqContact: 'Write to us',
  faq: [
    {
      question: 'Is Tessel free?',
      answer: 'Yes, Tessel is free to download and use.',
    },
    {
      question: 'Do I need an account?',
      answer:
        'No. Open the app, set up your mission, start logging. There’s nothing to sign up for. An account is only created if you turn on the online backup.',
    },
    {
      question: 'What happens if I change phones?',
      answer:
        'Your data lives on your device. Turn on backup in Settings to get a recovery code, then enter it on the new phone. Otherwise, export a CSV before switching, or rely on Android’s own backup if it’s on.',
    },
    {
      question: 'Can I track half-days, or hours?',
      answer: 'Half-days and full days today. Hourly tracking is planned.',
    },
    {
      question: 'Does it know public holidays?',
      answer:
        'Yes. Pick your country during setup and holidays are marked automatically, computed on the device.',
    },
    {
      question: 'Is there an iPhone version?',
      answer: 'Tessel launches on Android first. iOS will come later.',
    },
  ],

  ctaTitle: 'Stop rebuilding your month from memory.',

  privacyPolicy: 'Privacy policy',
  contact: 'Contact',

  policyDocumentTitle: 'Privacy policy — Tessel',
  policyDescription:
    'Tessel privacy policy: nothing collected, everything stays on your phone unless you turn on the optional backup.',
  policyBack: 'Back to home',
  policyKicker: 'Legal',
  policyTitle: 'Privacy policy',
  policyEffective: 'Effective 6 November 2026',
  policyApplies: 'Applies to the Tessel Android app and this website',
  policyOtherLang: 'Version française',
  policySummary: [
    {
      label: 'Collected',
      value: 'Nothing by default',
      text: 'We receive no data unless you turn on the backup.',
    },
    {
      label: 'Shared',
      value: 'With no one',
      text: 'No ads, analytics or third-party SDKs.',
    },
    {
      label: 'Stored',
      value: 'On your phone',
      text: 'Delete it anytime by uninstalling.',
    },
  ],
  policyToc: 'On this page',
  policyBlocks: [
    {
      id: 'who',
      title: 'Who we are',
      text: 'Tessel is developed and published by YASD (“we”, “us”). We are responsible for this policy and for the Tessel app.',
    },
    {
      id: 'data',
      title: 'Data the app handles',
      intro: 'To work, Tessel stores the information you enter in a local database on your device:',
      items: [
        'Clients and missions :: client names, mission titles, daily rates, VAT rates, start and end dates, usual on-site weekdays, payment terms.',
        'Day entries :: for each day, the type of each half-day (mission, training, leave, holiday…), on-site or remote, and any note you write.',
        'Invoices :: invoice numbers, issue dates, amounts, and whether they have been paid.',
        'Settings :: language, tracking unit, public-holiday country, fiscal-year start.',
      ],
      text: 'This data never leaves your device unless you export it yourself or turn on the online backup described below.',
    },
    {
      id: 'backup-sync',
      title: 'Optional backup and sync',
      intro: 'Online backup is off by default. If you turn it on in Settings › Backup & sync:',
      items: [
        'An account is created with no email or password. It is identified by a recovery code that the app shows you and keeps in your device’s secure keychain. On the server, this code is stored only as a hash.',
        'Your clients, missions, day entries, invoices and settings are sent to our server so they can be restored on another phone. No other data is transmitted.',
        'Without your recovery code, we cannot restore access to your backup.',
        'You can delete the online backup at any time from the app: every synced copy is then erased from the server, and the data on your phone is kept.',
      ],
      text: 'We use this data only to provide backup and sync. We don’t sell, rent or share it.',
    },
    {
      id: 'not',
      title: 'What we don’t do',
      items: [
        'No account, email address or password is required to use the app.',
        'No advertising, and no advertising identifiers are used.',
        'No analytics, crash-reporting or tracking tools are included.',
        'We don’t sell, rent or share your data with anyone.',
        'Public holidays are calculated on the device; no network request is made for them.',
      ],
    },
    {
      id: 'export',
      title: 'Exports & sharing',
      text: 'You can export your entries as a CSV file or a timesheet PDF. Exports are created on your device and handed to Android’s share sheet. Where the file goes next (email, Google Drive, another app) is your choice, and that destination’s own privacy policy applies.',
    },
    {
      id: 'device-backup',
      title: 'Android backups',
      text: 'If Android backup is turned on in your phone’s settings, Android may include Tessel’s data in your Google account backup so it can be restored on a new device. This is managed by Google and can be turned off in Settings › System › Backup.',
    },
    {
      id: 'perms',
      title: 'Permissions',
      text: 'Tessel requests no special permissions. It does not access your location, contacts, camera, microphone or files beyond those you choose to share.',
    },
    {
      id: 'delete',
      title: 'Deleting your data',
      text: 'You are in control. You can delete individual entries, missions and invoices in the app, delete the online backup from Settings, or uninstall the app, which removes all of its local data.',
    },
    {
      id: 'kids',
      title: 'Children',
      text: 'Tessel is a professional tool for self-employed workers and is not directed at children under 13 (or under 16 where local law requires). We do not knowingly process children’s data.',
    },
    {
      id: 'site',
      title: 'This website',
      text: 'This website uses no cookies and no analytics. Our hosting provider, GitHub Pages, may keep standard technical logs (such as IP address and browser type) for security, under its own policy.',
    },
    {
      id: 'rights',
      title: 'Your rights',
      text: 'Under the GDPR and similar laws, you have the right to access, correct, delete and export your personal data. You can exercise these rights directly in the app (export, edit, delete the backup). If you have a question or a concern, contact us; you may also lodge a complaint with your data protection authority (in France, the CNIL).',
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      text: 'If the way Tessel handles data changes, we will update this page and the effective date above before the change ships, and mention it in the app’s release notes.',
    },
    {
      id: 'contact',
      title: 'Contact',
      text: 'Questions about this policy or your privacy? Open an issue:',
    },
  ],
  policyContactLabel: 'Open an issue on GitHub',
};

const COPY: Record<Lang, Copy> = { fr, en };

// French for any French browser language, English for everything else.
const detectLang = (): Lang => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'fr' || saved === 'en') return saved;
  } catch {
    // Storage can be blocked; fall through to the browser language.
  }
  const languages = navigator.languages.length > 0 ? navigator.languages : [navigator.language];
  return languages.some((l) => l.toLowerCase().startsWith('fr')) ? 'fr' : 'en';
};

interface I18n {
  lang: Lang;
  t: Copy;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const Context = createContext<I18n | null>(null);

export const I18nProvider: React.FC<{ page: Page; children: React.ReactNode }> = ({
  page,
  children,
}) => {
  const [lang, setLangState] = useState<Lang>(detectLang);
  const t = COPY[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = page === 'privacy' ? t.policyDocumentTitle : t.documentTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', page === 'privacy' ? t.policyDescription : t.description);
  }, [lang, t, page]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not persisted; the choice still applies for this visit.
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === 'fr' ? 'en' : 'fr');
  }, [lang, setLang]);

  const value = useMemo(() => ({ lang, t, setLang, toggle }), [lang, t, setLang, toggle]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useI18n = (): I18n => {
  const value = useContext(Context);
  if (!value) throw new Error('useI18n must be used inside I18nProvider');
  return value;
};
