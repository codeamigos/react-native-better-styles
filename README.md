# Better Styles
### Build better styles for your react-native app (TypeScript friendly)

react-native-better-styles library generates you a set of functional styles, colors and sizes to use in your react-native components



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
Building better styles with custom options like _remSize_ or your custom colors _palette_ and _multiplicators_ is the best way to create the most suitable styles your design needs.

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

```
const { width: screenWidth } = ReactNative.Dimensions.get('window')
...
BS.build(
  {
    remSize: screenWidth > 340 ? 17 : 15
  } as BS.Options
)
```
In this example all styles will be scaled up if sreen with will be more than 340

