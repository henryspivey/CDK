export interface EventWithPath extends EventTarget {
    target: {
        path?: string
    }
}