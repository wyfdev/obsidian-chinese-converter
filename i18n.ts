// Based on https://github.com/oleglviv/obsidian-custom-js/blob/master/src/i18n.ts
import { moment } from "obsidian";

const translations = {
  en: {
    'Chinese Converter Settings': 'Chinese Converter Settings',
    'Enable conversion': 'Enable {{conversion}} conversion',
    'Simplified to Traditional': 'Simplified to Traditional',
    'Traditional to Simplified': 'Traditional to Simplified',
    'Simplified to Traditional (Taiwan)': 'Simplified to Traditional (Taiwan)',
    'Traditional (Taiwan) to Simplified': 'Traditional (Taiwan) to Simplified',
    'Simplified to Traditional (Hong Kong)': 'Simplified to Traditional (Hong Kong)',
    'Traditional (Hong Kong) to Simplified': 'Traditional (Hong Kong) to Simplified',
    'Simplified to Traditional (Taiwan, with phrases)': 'Simplified to Traditional (Taiwan, with phrases)',
    'Traditional (Taiwan) to Simplified (with phrases)': 'Traditional (Taiwan) to Simplified (with phrases)',
    'Traditional to Traditional (Taiwan)': 'Traditional to Traditional (Taiwan)',
    'Traditional to Traditional (Hong Kong)': 'Traditional to Traditional (Hong Kong)',
  },
  'zh-cn': {
    'Chinese Converter Settings': '简繁转换设置',
    'Enable conversion': '启用 {{conversion}} 转换',
    'Simplified to Traditional': '简体到繁体',
    'Traditional to Simplified': '繁体到简体',
    'Simplified to Traditional (Taiwan)': '简体到繁体（台湾）',
    'Traditional (Taiwan) to Simplified': '繁体（台湾）到简体',
    'Simplified to Traditional (Hong Kong)': '简体到繁体（香港）',
    'Traditional (Hong Kong) to Simplified': '繁体（香港）到简体',
    'Simplified to Traditional (Taiwan, with phrases)': '简体到繁体（台湾，带词组）',
    'Traditional (Taiwan) to Simplified (with phrases)': '繁体（台湾）到简体（带词组）',
    'Traditional to Traditional (Taiwan)': '繁体到繁体（台湾）',
    'Traditional to Traditional (Hong Kong)': '繁体到繁体（香港）',
  },
  'zh-tw': {
    'Chinese Converter Settings': '簡繁轉換設定',
    'Enable conversion': '啟用 {{conversion}} 轉換',
    'Simplified to Traditional': '簡體到繁體',
    'Traditional to Simplified': '繁體到簡體',
    'Simplified to Traditional (Taiwan)': '簡體到繁體（台灣）',
    'Traditional (Taiwan) to Simplified': '繁體（台灣）到簡體',
    'Simplified to Traditional (Hong Kong)': '簡體到繁體（香港）',
    'Traditional (Hong Kong) to Simplified': '繁體（香港）到簡體',
    'Simplified to Traditional (Taiwan, with phrases)': '簡體到繁體（台灣，帶詞組）',
    'Traditional (Taiwan) to Simplified (with phrases)': '繁體（台灣）到簡體（帶詞組）',
    'Traditional to Traditional (Taiwan)': '繁體到繁體（台灣）',
    'Traditional to Traditional (Hong Kong)': '繁體到繁體（香港）',
  },
};

type ResourceKeys = keyof typeof translations;

export const locales = Object.keys(translations) as ResourceKeys[];

export type Locales = (typeof locales)[number];

const t = (key: string, data?: Record<string, string | number>): string => {
  const lang = moment.locale();
  const resource = translations[lang as Locales] || translations.en;
  let text = resource[key as keyof typeof resource] || key;

  if (data) {
    for (const [key, value] of Object.entries(data)) {
      text = text.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
    }
  }

  return text;
};

export default t;
