import en from './en'
import cn from './cn'
import VueI18n from 'vue-i18n'
import Vue from 'vue'
import { getItem } from '@/utils/$storage'
Vue.use(VueI18n)

const messages = {
  en: en,
  cn: cn
}
let storeageLocale = getItem('vue.locale')
const i18n = new VueI18n({
  locale: storeageLocale || 'cn',
  messages
})

export default i18n
