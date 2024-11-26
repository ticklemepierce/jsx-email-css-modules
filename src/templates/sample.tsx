import { Html, Head, Preview, Text } from 'jsx-email';
// import { Footer } from '../components/footer/index.js';
// import { Header } from '../components/header/index.js';
// import css from './static/styles.global.scss';

/**
 * WOTD template.
 */
export const Template = ({}) => {
  return (
    <Html lang={'en'}>
      <Head>
        {/* hack to allow us to refresh on scss changes  - increment number to force refresh */}
        <meta content="2" />
        {/* <style>{css}</style> */}
      </Head>
      <Preview>{'previewText'}</Preview>
      {/* <Header /> */}
      <Text>Body</Text>
      {/* <Footer/> */}
    </Html>
  );
};
