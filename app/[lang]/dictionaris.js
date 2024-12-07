import 'server-only'

const dictionaries = {
    en: () => import('../../public/locales/en.json').then((module) => module.default),
    bn: () => import('../../public/locales/bn.json').then((module) => module.default),
}

export const getDictionary = async (locale) => dictionaries[locale]()