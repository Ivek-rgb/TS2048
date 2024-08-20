
// redefine theese values and learn about hsl type of extracting colors

export type HslValue = {
    colorValue: number; 
    colorHue: number; 
    colorBrightness: number; 
    colorTransparency: number; 
}

// why do I like OOP so much, because overloading functions ofc 

export const hslColorVal = (colorVal : number) => {
    return `hsla(${colorVal}, 100%, 50%, 1)`; 
}

export const createHslValue = (values : HslValue = {colorValue: 0, colorHue: 100, colorBrightness: 50, colorTransparency: 1}) : string => {
    return `hsla(${values.colorValue}, ${values.colorHue}%, ${values.colorBrightness}%, ${values.colorTransparency})`; 
}


