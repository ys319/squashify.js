import { performant_style_apply } from "./utils.ts"

const prefix_size = ["min", "max"] as const

export const Squashify = (
    element: HTMLElement,
    [preferred_width, preferred_height]: [number, number],
    options: {
        expand?: boolean
        onUpdate?: (width: number, height: number, scale: number) => void
    } = {},
) => () => {
    // Get screen size
    // MEMO: Use the value of window to work properly in some browsers such as Safari.
    const body_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    const body_height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

    // No expanding
    if (!(options.expand ?? false) && body_width > preferred_width && body_height > preferred_height) {
        performant_style_apply(element.style, "transform", `none`)
        performant_style_apply(element.style, "width", `${body_width}px`, prefix_size)
        performant_style_apply(element.style, "height", `${body_height}px`, prefix_size)
        return
    }

    // Base size
    const base_width = preferred_width / preferred_height * body_height
    const base_height = preferred_height / preferred_width * body_width

    // Scale factor
    const scale_width = body_width / preferred_width
    const scale_height = body_height / preferred_height

    // Using scale
    let scale = 1
    if (body_width < base_width) scale = scale_width
    if (body_height < base_height) scale = scale_height

    // Using width
    const result_width = scale_width < scale_height
        ? Math.floor(preferred_width)
        : Math.floor(body_width / scale)

    // Using height
    const result_height = scale_width > scale_height
        ? Math.floor(preferred_height)
        : Math.floor(body_height / scale)

    // Apply scale
    performant_style_apply(element.style, "width", `${Math.floor(result_width)}px`, prefix_size)
    performant_style_apply(element.style, "height", `${Math.floor(result_height)}px`, prefix_size)
    performant_style_apply(element.style, "transform", `scale(${scale})`)

    // Call onUpdate callback
    if (typeof options.onUpdate === "function") options.onUpdate(result_width, result_height, scale)
}
