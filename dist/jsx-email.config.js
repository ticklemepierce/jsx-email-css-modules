import { defineConfig } from 'jsx-email/config';
import { pluginSymbol } from 'jsx-email';
import { parse } from '@adobe/css-tools';
import { sassPlugin } from 'esbuild-sass-plugin';
import { decodeHTML } from 'entities';
/**
 * This is a copy of the jsx-email inline plugin but
 * with a few key changes.
 *
 * 1. Doesn't remove style tag
 * 2. Doesn't get rid of class names
 * 3. swallows error for unknown pseudo-selector
 *
 * https://github.com/shellscape/jsx-email/blob/main/packages/plugin-inline/src/index.ts
 *
 */
export const inlinePlugin = {
    name: 'inlinePlugin',
    process: async () => {
        const { selectAll } = await import('hast-util-select');
        const { toString } = await import('hast-util-to-string');
        const { visit } = await import('unist-util-visit');
        return function inlineCssPlugin() {
            return function inline(tree) {
                if (!tree)
                    return null;
                const stylesheet = selectAll('style', tree).map(toString).join('\n');
                const cast = parse(decodeHTML(stylesheet));
                for (const rule of cast.stylesheet?.rules ?? []) {
                    if ('selectors' in rule) {
                        for (const selector of rule.selectors ?? []) {
                            try {
                                const elems = selectAll(selector, tree);
                                for (const elem of elems) {
                                    for (const declaration of rule.declarations ?? []) {
                                        if ('property' in declaration) {
                                            elem.properties ??= {};
                                            elem.properties.style ??= '';
                                            if (/[^;]\s*$/.test(elem.properties.style)) {
                                                elem.properties.style += ';';
                                            }
                                            elem.properties.style += `${declaration.property}:${declaration.value};`;
                                        }
                                    }
                                }
                            }
                            catch (e) {
                                if (!e.message.includes('Unknown pseudo-selector')) {
                                    throw e;
                                }
                            }
                        }
                    }
                }
                return visit(tree, 'element', () => { });
            };
        };
    },
    symbol: pluginSymbol,
};
export const config = defineConfig({
    render: { minify: false },
    plugins: [inlinePlugin],
    esbuild: {
        write: false, // Prevent writing intermediate files to disk
        plugins: [
            sassPlugin({
                filter: /\.global\.scss$/,
                type: 'css-text', // Outputs the compiled CSS as a string
                // inject: true,
            }),
            // sassPlugin({
            //   filter: /\.module\.scss$/,
            //   transform: postcssModules({
            //     getJSON: (cssFileName, json, outputFileName) => {
            //       // Map styles but avoid emitting the `.css` file
            //       console.log(cssFileName, json, outputFileName);
            //     },
            //     write: false,
            //   }),
            //   // type: 'local-css', // Avoid CSS file output
            //   inject: true, // Automatically inject styles into a <style> tag
            //   // type: 'local-css'
            // }),
        ],
        loader: {
            '.css': 'text'
            // '.scss': 'css', 
        },
    },
});
