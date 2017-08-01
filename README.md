# Better Styles
### Build better styles for your react-native app (TypeScript friendly)

react-native-better-styles library generates you a set of functional styles, colors and sizes to use in your react-native components. This approach of using styles is related to approach of using functional css styles in web applications, if you don't familiar with it just look at this article [Functional CSS](https://github.com/chibicode/react-functional-css-protips) 


## Getting started

Install package

```javascript
npm i --save react-native-better-styles
```


Import and build
```javascript
import * as BS from 'react-native-better-styles'
...

const palette: BS.Palette = {
  grey: '#8a949d',
  white: '#ffffff',
  black: '#000000',
  blue: '#2c5cff',
}

BS.build(
  {
    remSize: 15, // default font-size
    palette,
  } as BS.Options
)

```

Use functional styles in your app
```javascript
....
import * as BS from 'react-native-better-styles'
const {s} = BS
// or import {s} from 'react-native-better-styles'

<Text style={[s.black, s.tc, s.mt05 s.bg_grey]}>
  Some centered black text with grey background and marginTop 0.5 * 15 (remSize)
</Text>

```



## Predefined styles
List of styles not affected by build options, use them as `s.absolute` to get `position: 'absolute'` result


### Border-radius modificators
```javascript
  br__bottom            borderTopLeftRadius: 0,
                        borderTopRightRadius: 0

  br__top               borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0
                        
  br__left              borderTopRightRadius: 0,
                        borderBottomRightRadius: 0

  br__right             borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0

```


### Text
```javascript
  i                     fontStyle: 'italic'
  
  tl                    textAlign: 'left'

  tc                    textAlign: 'center'

  tr                    textAlign: 'right'

```


### Position
```javascript
  absolute              position: 'absolute'
    
  absolute__fill        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0

```


### Flexbox
```javascript
  flx_i                 flex: 1

  flx_grow              flexGrow: 1

  flx_row               flexDirection: 'row'

  flx_rr                flexDirection: 'row-reverse'

  flx_cr                flexDirection: 'column-reverse'

  flx_wrap              flexWrap: 'wrap'

  aifs                  alignItems: 'flex-start'

  aic                   alignItems: 'center'

  aife                  alignItems: 'flex-end'

  asfs                  alignSelf: 'flex-start'

  asc                   alignSelf: 'center'

  asfe                  alignSelf: 'flex-end'

  ass                   alignSelf: 'stretch'

  jcfe                  justifyContent: 'flex-end'

  jcc                   justifyContent: 'center'

  jcsb                  justifyContent: 'space-between'

  jcsa                  justifyContent: 'space-around'

```


### Image Resize Mode
```javascript
  rm_contain            resizeMode: 'contain'

  rm_cover              resizeMode: 'cover'

  rm_stretch            resizeMode: 'stretch'

```

### Opaciry
```javascript
  o_95                  opacity: 0.95

  o_90                  opacity: 0.9

  o_85                  opacity: 0.85
  
  ...
  
  o_5                  opacity: 0.05

```



## Build Options
Building better styles with custom options like _remSize_ or your custom colors _palette_ and _multipliers_ is the best way to create the most suitable styles your design needs.

First of all, let's have a look what params could be passed as `Options` to react-native-better-styles `build()` function (as you can see, every property is optional)

```javascript
export interface Options {
  remSize?: number
  multipliers?: Multipliers
  palette?: Palette
  headings?: Multipliers
  fonts?: Palette
  fontWeights?: FontWeightPalette
}
```

Ok, now let's figure out what every option affects to

### `remSize` Option

`remSize` is the main multiplier for calculation all variable styles like paddings, margins, font sizes, etc... Usually `remSize` is equal to base font size. Also it's a good practice to set different `remSize` for different viewport/screen sizes, to automatically scale all other styles and make your components look same on different devices.

```javascript
const { width: screenWidth } = ReactNative.Dimensions.get('window')
...
BS.build(
  {
    remSize: screenWidth > 340 ? 17 : 15
  } as BS.Options
)
```
In this example all styles will be scaled up if sreen with will be more than 340


### `multipliers` Option

With `multipliers` you can define how many different variants of variable styles will be generated. Here is the simple example.

```javascript
const { width: screenWidth } = ReactNative.Dimensions.get('window')
...

const multipliers: BS.Multipliers = {
  '_sm': 0.5,
  '_med': 1,
  '_lg': 2,
}

BS.build(
  {
    remSize: 15,
    multipliers,
  } as BS.Options
)
```

With this set of options react-native-better-styles generates _margins, paddings, lineHeights, fontSizes, heights, witdths ..._ in three variants *_sm, _med, _lg*. The result will be something like this

```javascript
{
  ...
  m_sm:   { margin: 7.5 },  /// multiplier * remSize = 0.5 * 15 = 7.5
  m_med:  { margin: 15 },   /// multiplier * remSize = 1 * 15 = 15
  m_lg:   { margin: 30 },   /// multiplier * remSize = 2 * 15 = 30
  ...
}

```
So you can use them as `<View style={[s.m_med]}>...</View>`



#### Here is the list of all variables styles which depends on `remSize` and `multipliers`

```javascript

  // margins
  m:            'margin',
  
  mt:           'marginTop',
  
  mb:           'marginBottom',
  
  mr:           'marginRight',
  
  ml:           'marginLeft',
  
  mh:           'marginHorizontal',
  
  mv:           'marginVertical',
  
  
  // paddings
  p:            'padding',
  
  pt:           'paddingTop',
  
  pb:           'paddingBottom',
  
  pr:           'paddingRight',
  
  pl:           'paddingLeft',
  
  ph:           'paddingHorizontal',
  
  pv:           'paddingVertical',
  
  
  // size
  h:            'height',
  
  w:            'width',
  
  // min and max size
  minh:         'minHeight',
  
  minw:         'minWidth',
  
  maxh:         'maxHeight',
  
  maxw:         'maxWidth',
  
  // position
  r:            'right',
  
  l:            'left',
  
  t:            'top',
  
  b:            'bottom',
  
  // border-radius
  br:           'borderRadius'
  
  // text
  lh:           'lineHeight',
  
  fs:           'fontSize'

```

... and if you will not define any multipliers in `build()` function `defaultMultiplies` will be applyed

```javascript

export const defaultMultipliers = {
  '0':          0,
  '025':        0.25,
  '05':         0.5,
  '075':        0.75,
  '085':        0.85,
  '1':          1,
  '115':        1.15,
  '125':        1.25,
  '15':         1.5,
  '175':        1.75,
  '185':        1.85,
  '2':          2,
  '225':        2.25,
  '25':         2.5,
  '275':        2.75,
  '3':          3,
  '325':        3.25,
  '35':         3.5,
  '375':        3.75,
  '4':          4,
  '45':         4.5,
  '5':          5,
  '55':         5.5,
  '6':          6,
  '65':         6.5,
  '7':          7,
  '75':         7.5,
  '8':          8
} as Multipliers

```
So you can use better-styles by default like
```javascript
  ...
  //remSize = 16
  <View style={[s.ph2, s.mb05, s.mt025, s.jcc, s.aic]}>...</View>
  
  /*
    This View will have 
    {
      paddingHorizontal: 32,
      marginBottom: 8,
      marginTop: 4,
      justifyContent: 'center',
      alightItems: 'center'
    }
  */
  
```

### Heads up! `borderWidth` styles are not multiplied to `remSize`

```javascript

  bw:       'borderWidth',
  
  btw:      'borderTopWidth',
  
  brw:      'borderRightWidth',
  
  bbw:      'borderBottomWidth',
  
  blw:      'borderLeftWidth'

```
Here is an example

```javascript
const multipliers: BS.Multipliers = {
  '_sm': 0.5,
  '_med': 1,
  '_lg': 2,
}
BS.build(...)

/* result

{
  ...
  bw_sm:   { borderWidth: 0.5 },  /// multiplier = 0.5
  bw_med:  { borderWidth: 1 },   /// multiplier = 1
  bw_lg:   { borderWidth: 1 },   /// multiplier = 2
  ...
}

*/
```

### Result of calculation `remSize` * `multipliers` will be exported as `sizes` object, so you can use it in your components

```javascript
import {sizes} from 'react-native-better-styles'

<ComponentWithWidthAndHeightProp
  width={sizes[05]} // width = remSize * '05' multiplier = 15 * 0.5 = 7.5
  height={sizes[2]} // width = remSize * '2' multiplier = 15 * 2 = 30
/>

```

### `palette` Option

Palette option gives your an oppotunity to define custom set of color styles for backgrounds `s.bg_*colorName*`, text colors `s.*colorName*` and border colors `s.b_*colorName*` with different opacity `s.*colorName*_*opacity*` (opacity step is 5, so you can use it like `s.*colorName*_65`, `s.b_*colorName*_10`, `s.bg_*colorName*_5`).

Here is an example
```javascript

const palette: BS.Palette = {
  t: 'transparent',
  grey: '#8a949d',
  white: '#ffffff',
  black: '#000000',
  blue: '#2c5cff',
}

BS.build(
  {
    palette,
  } as BS.Options
)
<View style={[s.p2, s.bw1, s.b_blue_10, s.bg_blue_5]}>
  /*
    padding 30, borderWidth: 1, border `rgba(#2c5cff, 0.1)`, background `rgba(#2c5cff, 0.05)`
   */
  <Text style={[s.black_80, s.tc, s.bg_t]}>
    Some centered black 80% opacity text
  </Text>
</View>

```

Default palette is pretty simple
```javascript

export const defaultPalette = {
  white: 'rgb(255,255,255)',
  black: 'rgb(0,0,0)'
} as Palette

```

### Generated `palette` will be exported as `colors` object, so you can use it in your components

```javascript
import {colors} from 'react-native-better-styles'

<ComponentWithColorsProp
  color={colors.black} // black color
  background={colors.blue_10} // blue background with 0.1 opacity
/>

```


### `headings` option

With `headings` option you can define different set of multipliers from `multipliers` option to generate `f*multiplier*` styles for headings `fontSize`, it's better to use this option if your design/ui has defined set of Headings sizes.

Usage
```javascript

const headings: BS.Multipliers = {
  '7': 0.75,
  '6': 0.85,
  '5': 1,
  '4': 1.2,
  '3': 1.6,
  '2': 2,
  '1': 3
}

BS.build(
  {
    headings
  } as BS.Options
)

<Text style={[s.f1]}>Heading 1</Text> // fontSize: 45
<Text style={[s.f4]}>Heading 4</Text> // fontSize: 18

```

Default headings are

```javascript
export const defaultHeadings = {
  '6': 0.875,
  '5': 1,
  '4': 1.25,
  '3': 1.75,
  '2': 2.35,
  '1': 3.25
} as Multipliers
```

### `fonts` option

With `fonts` option you can generate `{fontFamily: *name*}` styles. Use this option if you neet to use custom fonts in your react-native app.

Simply define list of shortcuts to your fontFamily names

```javascript

const fonts: BS.Palette = {
  'pl':   'Proxima Light',
  'p':    'Proxima Normal',
  'pb':   'Proxima Bold',
}

BS.build(
  {
    fonts
  } as BS.Options
)

<Text style={[s.f1, s.f_pl]}>Proxima Light Heading 1</Text> // fontSize: 45, fontFamily: 'Proxima Light'
<Text style={[s.f4, s.f_pb]}>Proxima Bold Heading 4</Text> // fontSize: 18, fontFamily: 'Proxima Bold'

```

The default list of fonts is empty.


### `fontWeights` option
In react-native-better-styles we automatically generates set of styles to define `fontWeight` in text component. 

```javascript

export const defaultFontWeights = {
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
} as FontWeightPalette

```

...so you can use them by default in component

```javascript

<Text style={[s.f1, s.fw3]}>Heading 1</Text> // fontSize: 45, fontWeight: '300'

```

You can override default set, but as font weight you can use only `FontWeight` type
```javascript

export declare type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'

```

Example

```javascript

const fontWeights: BS.FontWeightPalette = {
  'bold':   'bold',
  'light':    '300',
  'extrabold':   '600',
}

BS.build(
  {
    fontWeights
  } as BS.Options
)

<Text style={[s.f1, s.light]}>Heading 1</Text> // fontSize: 45, fontWeight: '300'

```


That's all, folks!

