import getLocaleByPath from './getLocaleByPath'
import getLocaleByUrl from './getLocaleByUrl'
import getLocaleUrlList from './getLocaleUrlList'
import getUrlWithoutLocale from './getUrlWithoutLocale'
import i18n, { i18nFactory } from './i18n'
import { defaultLocale } from './type'

export default i18n

export {
	defaultLocale,
	i18nFactory,
	getLocaleByPath,
	getLocaleByUrl,
	getUrlWithoutLocale,
	getLocaleUrlList,
}
