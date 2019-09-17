declare module '*.png';
declare var google: any;
declare global {
    interface window {
        GoogleAutocompleteService: any;
        __REDUX_DEVTOOLS_EXTENSION__: any;
    }
}
