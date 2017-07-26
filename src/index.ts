import * as Color from 'color'
import * as _ from 'lodash'
import * as RN from 'react-native'

export interface Multiplicators {
  [key: string]: number
}

export interface Palette {
  [key: string]: string
}

type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'

type NumericStyleKey =
  | 'marginTop'
  | 'marginBottom'
  | 'marginRight'
  | 'marginLeft'
  | 'paddingTop'
  | 'paddingBottom'
  | 'paddingRight'
  | 'paddingLeft'
  | 'height'
  | 'width'
  | 'minHeight'
  | 'minWidth'
  | 'maxHeight'
  | 'maxWidth'
  | 'right'
  | 'left'
  | 'top'
  | 'bottom'
  | 'borderRadius'
  | 'borderWidth'
  | 'borderTopWidth'
  | 'borderRightWidth'
  | 'borderBottomWidth'
  | 'borderLeftWidth'
  | 'lineHeight'
  | 'fontSize'

export interface FontWeightPalette {
  [key: string]: FontWeight
}

export interface NumericStyle {
  [key: string]: NumericStyleKey
}

export interface TextStyleResult {
  [key: string]: RN.TextStyle
}
export interface ViewStyleResult {
  [key: string]: RN.ViewStyle
}
export interface ImageStyleResult {
  [key: string]: RN.ImageStyle
}

type StyleResult = ImageStyleResult | ViewStyleResult | ImageStyleResult

const genericRemStyles: NumericStyle = {
  mt: 'marginTop',
  mb: 'marginBottom',
  mr: 'marginRight',
  ml: 'marginLeft',
  pt: 'paddingTop',
  pb: 'paddingBottom',
  pr: 'paddingRight',
  pl: 'paddingLeft',
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
}

const genericPointStyles: NumericStyle = {
  bw: 'borderWidth',
  btw: 'borderTopWidth',
  brw: 'borderRightWidth',
  bbw: 'borderBottomWidth',
  blw: 'borderLeftWidth'
}

const textRemStyles: NumericStyle = {
  lh: 'lineHeight',
  fs: 'fontSize'
}

const textStaticStyles: TextStyleResult = {
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
}

const genericStaticStyles: StyleResult = {
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
}

const multiplyStylesValues = (styles: NumericStyle, multiplicators: Multiplicators): ViewStyleResult => {
  const resultStyles: ViewStyleResult = {}
  Object.keys(styles).map(key => {
    Object.keys(multiplicators).map(prefix => {
      const multiplicatorValue: number = multiplicators[prefix]
      const styleName: NumericStyleKey = styles[key]
      resultStyles[key + prefix] = {
        [styleName]: multiplicatorValue
      }
    })
  })
  return resultStyles
}

const multiplyToRem = (remValue: number, multiplicators: Multiplicators): Multiplicators => {
  const multiplied: Multiplicators = {}
  Object.keys(multiplicators).map(prefix => {
    const multiplicatorValue: number = multiplicators[prefix]
    multiplied[prefix] = Math.round(multiplicatorValue * remValue * 100) / 100
  })
  return multiplied
}

const generatePalette = (colors: Palette): Palette => {
  const resultPalette: Palette = {}
  Object.keys(colors).map(name => {
    const color: string = colors[name]
    resultPalette[name] = color

    for (let i: number = 5; i < 100; i += 5) {
      const rgbString: string = Color(color).alpha(i / 100).rgb().string()
      resultPalette[`${name}_${i}`] = rgbString
    }
  })
  return resultPalette
}

const generateColorsPalette = (colors: Palette): ImageStyleResult | ImageStyleResult => {
  const resultStyles: ImageStyleResult | ImageStyleResult = {}
  Object.keys(colors).map(name => {
    const color: string = colors[name]
    resultStyles[`bg_${name}`] = { backgroundColor: color }
    resultStyles[`b_${name}`] = { borderColor: color }
    for (let i: number = 5; i < 100; i += 5) {
      const rgbString: string = Color(color).alpha(i / 100).rgb().string()
      resultStyles[`bg_${name}_${i}`] = { backgroundColor: rgbString }
      resultStyles[`b_${name}_${i}`] = { borderColor: rgbString }
    }
  })
  return resultStyles
}

const generateTextColorsPalette = (colors: Palette): TextStyleResult => {
  const resultStyles: TextStyleResult = {}
  Object.keys(colors).map(name => {
    const color: string = colors[name]
    resultStyles[name] = { color: color }
    for (let i: number = 5; i < 100; i += 5) {
      const rgbString: string = Color(color).alpha(i / 100).rgb().string()
      resultStyles[`${name}_${i}`] = { color: rgbString }
    }
  })
  return resultStyles
}

const generateOpacity = (): StyleResult => {
  const resultStyles: StyleResult = {}
  for (let i: number = 5; i < 100; i += 5) {
    const opacity: number = i / 100
    resultStyles[`o_${i}`] = { opacity }
  }
  return resultStyles
}

const generateFonts = (fonts: Palette): TextStyleResult => {
  const resultStyles: TextStyleResult = {}
  Object.keys(fonts).map(name => {
    const fontFamily: string = fonts[name]
    resultStyles[`f_${name}`] = { fontFamily }
  })
  return resultStyles
}

const generateFontWeights = (weights: FontWeightPalette): TextStyleResult => {
  const resultStyles: TextStyleResult = {}
  Object.keys(weights).map(name => {
    const fontWeight: FontWeight = weights[name]
    resultStyles[`${name}`] = { fontWeight }
  })
  return resultStyles
}

export interface Options {
  remSize?: number
  multiplicators?: Multiplicators
  headings?: Multiplicators
  palette?: Palette
  fonts?: Palette
  fontWeights?: FontWeightPalette
}

export interface BuildStyles {
  s: StyleResult
  sizes: Multiplicators
  colors: Palette
  build: (defaultOptions: Options, callback?: () => any) => void
}

const buildStyles: BuildStyles = {
  s: {},
  sizes: {},
  colors: {},

  build: (defaultOptions: Options = {}, callback = () => {}) => {
    const remSize = defaultOptions.remSize || 16
    const multiplicators = defaultOptions.multiplicators || defaultMultiplicators
    const headings = defaultOptions.headings || defaultHeadings
    const palette = defaultOptions.palette || defaultPalette
    const fonts = defaultOptions.palette || defaultPalette
    const fontWeights = defaultOptions.fontWeights || defaultFontWeights
    _.assign(buildStyles.colors, generatePalette(palette))
    _.assign(buildStyles.sizes, multiplyToRem(remSize, multiplicators))
    _.assign(
      buildStyles.s,
      RN.StyleSheet.create({
        ...multiplyStylesValues(genericPointStyles, multiplicators),
        ...multiplyStylesValues(genericRemStyles, multiplyToRem(remSize, multiplicators)),
        ...multiplyStylesValues(textRemStyles, multiplyToRem(remSize, multiplicators)),
        ...multiplyStylesValues({ f: 'fontSize' }, multiplyToRem(remSize, headings)),
        ...generateColorsPalette(palette),
        ...generateTextColorsPalette(palette),
        ...generateFonts(fonts),
        ...generateFontWeights(fontWeights),
        ...generateOpacity(),
        ...genericStaticStyles,
        ...textStaticStyles
      })
    )
    callback()
  }
}

export const defaultMultiplicators: Multiplicators = {
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
}

export const defaultHeadings: Multiplicators = {
  '6': 0.875,
  '5': 1,
  '4': 1.25,
  '3': 1.75,
  '2': 2.35,
  '1': 3.25
}

export const defaultPalette: Palette = {
  white: 'rgb(255,255,255)',
  black: 'rgb(0,0,0)'
}

export const defaultFontWeights: FontWeightPalette = {
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
}

export default buildStyles
export const { colors, s, sizes } = buildStyles
