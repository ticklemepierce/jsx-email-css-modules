export namespace inlinePlugin {
    export let name: string;
    export function process(): Promise<() => (tree: any) => null | undefined>;
    export { pluginSymbol as symbol };
}
export const config: Promise<import("jsx-email/config").JsxEmailConfig>;
import { pluginSymbol } from 'jsx-email';
//# sourceMappingURL=jsx-email.config.d.ts.map