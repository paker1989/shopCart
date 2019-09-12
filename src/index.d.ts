declare module '*.png';
declare var google: any;
declare global {
  interface Window { GoogleAutocompleteService: any; }
}