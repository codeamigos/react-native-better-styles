import * as RN from 'react-native';
export interface Multipliers {
    [key: string]: number;
}
export interface Palette {
    [key: string]: string;
}
export declare type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export declare type NumericStyleKey = 'margin' | 'padding' | 'marginTop' | 'marginBottom' | 'marginRight' | 'marginLeft' | 'marginHorizontal' | 'marginVertical' | 'paddingTop' | 'paddingBottom' | 'paddingRight' | 'paddingLeft' | 'paddingHorizontal' | 'paddingVertical' | 'height' | 'width' | 'minHeight' | 'minWidth' | 'maxHeight' | 'maxWidth' | 'right' | 'left' | 'top' | 'bottom' | 'borderRadius' | 'borderWidth' | 'borderTopWidth' | 'borderRightWidth' | 'borderBottomWidth' | 'borderLeftWidth' | 'lineHeight' | 'fontSize';
export interface FontWeightPalette {
    [key: string]: FontWeight;
}
export interface NumericStyle {
    [key: string]: NumericStyleKey;
}
export interface TextStyleResult {
    [key: string]: RN.TextStyle;
}
export interface ViewStyleResult {
    [key: string]: RN.ViewStyle;
}
export interface ImageStyleResult {
    [key: string]: RN.ImageStyle;
}
export declare type StyleResult = ImageStyleResult | ViewStyleResult | ImageStyleResult;
export interface Options {
    remSize?: number;
    multipliers?: Multipliers;
    headings?: Multipliers;
    palette?: Palette;
    fonts?: Palette;
    fontWeights?: FontWeightPalette;
}
export interface BuildStyles {
    s: StyleResult;
    sizes: Multipliers;
    colors: Palette;
    build: (defaultOptions: Options, callback?: () => any) => void;
}
export declare const buildStyles: BuildStyles;
export declare const defaultMultipliers: Multipliers;
export declare const defaultHeadings: Multipliers;
export declare const defaultPalette: Palette;
export declare const defaultFontWeights: FontWeightPalette;
export declare const colors: Palette;
export declare const sizes: Multipliers;
export declare const s: StyleResult;
export declare const build: (defaultOptions: Options, callback?: (() => any) | undefined) => void;
