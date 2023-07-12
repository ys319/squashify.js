const cache: { [key: string]: string } = {}

export const performant_style_apply = (
    style: CSSStyleDeclaration,
    property: string,
    value: string,
    prefixes: (Readonly<string[]> | string[]) = [],
) => [
    property,
    ...prefixes.map(prefix => `${prefix}-${property}`)
].forEach(item => {
    if (cache[item] === value) return
    cache[item] = value
    style.setProperty(item, value)
})
