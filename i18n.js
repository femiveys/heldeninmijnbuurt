import NextI18Next from 'next-i18next';

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'nl',
  otherLanguages: ['fr', 'en'],
});

// https://github.com/isaachinman/next-i18next/issues/273
export default NextI18NextInstance;

export const {
  appWithTranslation,
  withTranslation,
  useTranslation,
} = NextI18NextInstance;
