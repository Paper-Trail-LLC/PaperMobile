import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import merge from 'deepmerge';
import {color} from './'

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export const DefaultTheme = {
    ...CombinedDefaultTheme,
    colors: {
        ...CombinedDefaultTheme.colors,
        primary: color.palette.indigo,
        accent: color.palette.orangeDarker,
    },
};

export const DarkTheme = {
    ...CombinedDarkTheme,
    colors:{
        ...CombinedDarkTheme.colors,
        primary: color.palette.burgundy
    }
}