
declare module '*.global.scss' {
  const css: string;
  export default css;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
