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

Better documentation with description of all options and list of styles is coming
