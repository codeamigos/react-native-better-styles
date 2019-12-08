"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Color = require("color");
const _ = require("lodash");
const RN = require("react-native");
const genericRemStyles = {
    m: 'margin',
    p: 'padding',
    mt: 'marginTop',
    mb: 'marginBottom',
    mr: 'marginRight',
    ml: 'marginLeft',
    mh: 'marginHorizontal',
    mv: 'marginVertical',
    pt: 'paddingTop',
    pb: 'paddingBottom',
    pr: 'paddingRight',
    pl: 'paddingLeft',
    ph: 'paddingHorizontal',
    pv: 'paddingVertical',
    h: 'height',
    w: 'width',
    minh: 'minHeight',
    minw: 'minWidth',
    maxh: 'maxHeight',
    maxw: 'maxWidth',
    r: 'right',
    l: 'left',
    t: 'top',
    b: 'bottom',
    br: 'borderRadius'
};
const genericPointStyles = {
    bw: 'borderWidth',
    btw: 'borderTopWidth',
    brw: 'borderRightWidth',
    bbw: 'borderBottomWidth',
    blw: 'borderLeftWidth'
};
const textRemStyles = {
    lh: 'lineHeight',
    fs: 'fontSize'
};
const textStaticStyles = {
    // Text
    i: {
        fontStyle: 'italic'
    },
    tl: {
        textAlign: 'left'
    },
    tc: {
        textAlign: 'center'
    },
    tr: {
        textAlign: 'right'
    }
};
const genericStaticStyles = {
    // No border radius
    br__bottom: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    br__top: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    br__left: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    br__right: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },
    // absolute
    absolute: {
        position: 'absolute'
    },
    absolute__fill: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    },
    // flexbox
    flx_i: {
        flex: 1
    },
    flx_grow: {
        flexGrow: 1
    },
    flx_row: {
        flexDirection: 'row'
    },
    flx_rr: {
        flexDirection: 'row-reverse'
    },
    flx_cr: {
        flexDirection: 'column-reverse'
    },
    flx_wrap: {
        flexWrap: 'wrap'
    },
    aifs: {
        alignItems: 'flex-start'
    },
    aic: {
        alignItems: 'center'
    },
    aife: {
        alignItems: 'flex-end'
    },
    asfs: {
        alignSelf: 'flex-start'
    },
    asc: {
        alignSelf: 'center'
    },
    asfe: {
        alignSelf: 'flex-end'
    },
    ass: {
        alignSelf: 'stretch'
    },
    jcfe: {
        justifyContent: 'flex-end'
    },
    jcc: {
        justifyContent: 'center'
    },
    jcsb: {
        justifyContent: 'space-between'
    },
    jcsa: {
        justifyContent: 'space-around'
    },
    // Image
    rm_contain: {
        resizeMode: 'contain'
    },
    rm_cover: {
        resizeMode: 'cover'
    },
    rm_stretch: {
        resizeMode: 'stretch'
    }
};
const multiplyStylesValues = (styles, multipliers) => {
    const resultStyles = {};
    Object.keys(styles).map(key => {
        Object.keys(multipliers).map(prefix => {
            const multiplierValue = multipliers[prefix];
            const styleName = styles[key];
            resultStyles[key + prefix] = {
                [styleName]: multiplierValue
            };
        });
    });
    return resultStyles;
};
const multiplyToRem = (remValue, multipliers) => {
    const multiplied = {};
    Object.keys(multipliers).map(prefix => {
        const multiplierValue = multipliers[prefix];
        multiplied[prefix] = Math.round(multiplierValue * remValue * 100) / 100;
    });
    return multiplied;
};
const generatePalette = (colors) => {
    const resultPalette = {};
    Object.keys(colors).map(name => {
        const color = colors[name];
        resultPalette[name] = color;
        for (let i = 5; i < 100; i += 5) {
            const rgbString = Color(color)
                .alpha(i / 100)
                .rgb()
                .string();
            resultPalette[`${name}_${i}`] = rgbString;
        }
    });
    return resultPalette;
};
const generateColorsPalette = (colors) => {
    const resultStyles = {};
    Object.keys(colors).map(name => {
        const color = colors[name];
        resultStyles[`bg_${name}`] = { backgroundColor: color };
        resultStyles[`b_${name}`] = { borderColor: color };
        for (let i = 5; i < 100; i += 5) {
            const rgbString = Color(color)
                .alpha(i / 100)
                .rgb()
                .string();
            resultStyles[`bg_${name}_${i}`] = { backgroundColor: rgbString };
            resultStyles[`b_${name}_${i}`] = { borderColor: rgbString };
        }
    });
    return resultStyles;
};
const generateTextColorsPalette = (colors) => {
    const resultStyles = {};
    Object.keys(colors).map(name => {
        const color = colors[name];
        resultStyles[name] = { color: color };
        for (let i = 5; i < 100; i += 5) {
            const rgbString = Color(color)
                .alpha(i / 100)
                .rgb()
                .string();
            resultStyles[`${name}_${i}`] = { color: rgbString };
        }
    });
    return resultStyles;
};
const generateOpacity = () => {
    const resultStyles = {};
    for (let i = 5; i < 100; i += 5) {
        const opacity = i / 100;
        resultStyles[`o_${i}`] = { opacity };
    }
    return resultStyles;
};
const generateFonts = (fonts) => {
    const resultStyles = {};
    Object.keys(fonts).map(name => {
        const fontFamily = fonts[name];
        resultStyles[`f_${name}`] = { fontFamily };
    });
    return resultStyles;
};
const generateFontWeights = (weights) => {
    const resultStyles = {};
    Object.keys(weights).map(name => {
        const fontWeight = weights[name];
        resultStyles[`${name}`] = { fontWeight };
    });
    return resultStyles;
};
exports.buildStyles = {
    s: {},
    sizes: {},
    colors: {},
    build: (defaultOptions = {}, callback = () => { }) => {
        const remSize = defaultOptions.remSize || 16;
        const multipliers = defaultOptions.multipliers || exports.defaultMultipliers;
        const headings = defaultOptions.headings || exports.defaultHeadings;
        const palette = defaultOptions.palette || exports.defaultPalette;
        const fonts = defaultOptions.fonts || {};
        const fontWeights = defaultOptions.fontWeights || exports.defaultFontWeights;
        _.assign(exports.buildStyles.colors, generatePalette(palette));
        _.assign(exports.buildStyles.sizes, multiplyToRem(remSize, multipliers));
        _.assign(exports.buildStyles.s, RN.StyleSheet.create(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, multiplyStylesValues(genericPointStyles, multipliers)), multiplyStylesValues(genericRemStyles, multiplyToRem(remSize, multipliers))), multiplyStylesValues(textRemStyles, multiplyToRem(remSize, multipliers))), multiplyStylesValues({ f: 'fontSize' }, multiplyToRem(remSize, headings))), generateColorsPalette(palette)), generateTextColorsPalette(palette)), generateFonts(fonts)), generateFontWeights(fontWeights)), generateOpacity()), genericStaticStyles), textStaticStyles)));
        callback();
    }
};
exports.defaultMultipliers = {
    '0': 0,
    '025': 0.25,
    '05': 0.5,
    '075': 0.75,
    '085': 0.85,
    '1': 1,
    '115': 1.15,
    '125': 1.25,
    '15': 1.5,
    '175': 1.75,
    '185': 1.85,
    '2': 2,
    '225': 2.25,
    '25': 2.5,
    '275': 2.75,
    '3': 3,
    '325': 3.25,
    '35': 3.5,
    '375': 3.75,
    '4': 4,
    '45': 4.5,
    '5': 5,
    '55': 5.5,
    '6': 6,
    '65': 6.5,
    '7': 7,
    '75': 7.5,
    '8': 8
};
exports.defaultHeadings = {
    '6': 0.875,
    '5': 1,
    '4': 1.25,
    '3': 1.75,
    '2': 2.35,
    '1': 3.25
};
exports.defaultPalette = {
    white: 'rgb(255,255,255)',
    black: 'rgb(0,0,0)'
};
exports.defaultFontWeights = {
    normal: 'normal',
    b: 'bold',
    fw1: '100',
    fw2: '200',
    fw3: '300',
    fw4: '400',
    fw5: '500',
    fw6: '600',
    fw7: '700',
    fw8: '800',
    fw9: '900'
};
exports.colors = exports.buildStyles.colors;
exports.sizes = exports.buildStyles.sizes;
exports.s = exports.buildStyles.s;
exports.build = exports.buildStyles.build;
//# sourceMappingURL=index.js.map