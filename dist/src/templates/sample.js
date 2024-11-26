import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Html, Head, Preview, Text } from 'jsx-email';
import { Footer } from '../components/footer/index.js';
import { Header } from '../components/header/index.js';
import css from './static/styles.global.scss';
/**
 * WOTD template.
 */
export const Template = ({}) => {
    return (_jsxs(Html, { lang: 'en', children: [_jsxs(Head, { children: [_jsx("meta", { content: "2" }), _jsx("style", { children: css })] }), _jsx(Preview, { children: 'previewText' }), _jsx(Header, {}), _jsx(Text, { children: "Body" }), _jsx(Footer, {})] }));
};
