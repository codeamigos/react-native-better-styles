# Better Styles
### Build better styles for your react-native app (TypeScript friendly)

react-native-better-styles library generates you a set of functional styles, colors and sizes to use in your react-native components. This approach of using styles is related to approach of using functional css styles in web applications, if you don't familiar with it just look at this article [link to Functional CSS](https://github.com/chibicode/react-functional-css-protips) 


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



## Build Options
Building better styles with custom options like _remSize_ or your custom colors _palette_ and _multipliers_ is the best way to create the most suitable styles your design needs.

First of all, let's have a look what params could be passed as `Options` to react-native-better-styles `build()` function (as you can see, every property is optional)

```javascript
export interface Options {
  remSize?: number
  multipliers?: Multipliers
  headings?: Multipliers
  palette?: Palette
  fonts?: Palette
  fontWeights?: FontWeightPalette
}
```

Ok, now let's figure out what every option affects to

### remSize Option

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


### multipliers Option

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

```javacript

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
```javacript
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

### Heads up! `borderWidth` styles will not be multiplied to `remSize`

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
