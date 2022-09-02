// index.js
import { createI18n } from 'vue-i18n'
import enUS from './element/zh-CN'
import zhCN from './element/en-US'
import frFR from './element/fr-FR'

const language = (navigator.language || 'en').toLocaleLowerCase() // 这是获取浏览器的语言
const LOCALE = 'this_locale'
export const setLocale = lang => localStorage.setItem(LOCALE, lang);

const ELEMENT_LANG = {
  "en-US": enUS,
  "zh-CN": zhCN,
  "fr-FR": frFR
};

function loadLocaleMessages() {
  const locales = import.meta.globEager('./project/*.json')
  const messages = {};
  Object.keys(locales).forEach(key =>{
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = {
        ...locales[key],
        ...ELEMENT_LANG[locale]
      };
    }
  })
  return messages;
}


const i18n = createI18n({
  silentTranslationWarn: true, //To suppress the first warning(Not found key...),
  silentFallbackWarn: true, //To suppress the second warning(Fall back to...)
  legacy: false, //修复Uncaught SyntaxError: Not available in legacy mode
  locale: localStorage.getItem('this_locale') || language.split('-')[0] || 'en', // 首先从缓存里拿，没有的话就用浏览器语言，
  fallbackLocale: 'en', // 设置备用语言
  messages: loadLocaleMessages(), 
})

export default i18n
