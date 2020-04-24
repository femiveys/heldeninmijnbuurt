import NextI18Next from 'next-i18next';

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'nl',
  otherLanguages: ['fr', 'en'],
  // browserLanguageDetection: false,
  // serverLanguageDetection: false,
  // detection: {
  //   lookupCookie: 'next-i18next',
  //   order: ['cookie', 'querystring', 'localStorage', 'path', 'subdomain'],
  //   caches: ['cookie'],
  // },
});

// https://github.com/isaachinman/next-i18next/issues/273
export default NextI18NextInstance;

export const {
  appWithTranslation,
  withTranslation,
  useTranslation,
} = NextI18NextInstance;
