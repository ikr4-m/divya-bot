export interface IMenu {
  description: string
  whyGetPunishment: string
  counting: CountingMenu[]
}

export interface CountingMenu {
  counter: number
  fallback: string
}
