// Based on https://github.com/oleglviv/obsidian-custom-js/blob/master/src/i18n.ts
import { moment } from "obsidian";

const translations = {
  en: {
    CONVERT_TO_TRADITIONAL_CHINESE: "Convert selection to Traditional Chinese",
    CONVERT_TO_SIMPLIFIED_CHINESE: "Convert selection to Simplified Chinese",
  },
  'zh-cn': {
    CONVERT_TO_TRADITIONAL_CHINESE: "转换为繁体中文",
    CONVERT_TO_SIMPLIFIED_CHINESE: "转换为简体中文",
  },
  'zh-tw': {
    CONVERT_TO_TRADITIONAL_CHINESE: "轉換為繁體中文",
    CONVERT_TO_SIMPLIFIED_CHINESE: "轉換為簡體中文",
  },
  ja: {
    CONVERT_TO_TRADITIONAL_CHINESE: "選択範囲を繁体字中国語に変換",
    CONVERT_TO_SIMPLIFIED_CHINESE: "選択範囲を簡体字中国語に変換",
  },
  ko: {
    CONVERT_TO_TRADITIONAL_CHINESE: "선택 항목을 번체 중국어로 변환",
    CONVERT_TO_SIMPLIFIED_CHINESE: "선택 항목을 간체 중국어로 변환",
  },
  fr: {
    CONVERT_TO_TRADITIONAL_CHINESE: "Convertir la sélection en chinois traditionnel",
    CONVERT_TO_SIMPLIFIED_CHINESE: "Convertir la sélection en chinois simplifié",
  },
  de: {
    CONVERT_TO_TRADITIONAL_CHINESE: "Auswahl in traditionelles Chinesisch umwandeln",
    CONVERT_TO_SIMPLIFIED_CHINESE: "Auswahl in vereinfachtes Chinesisch umwandeln",
  },
  es: {
    CONVERT_TO_TRADITIONAL_CHINESE: "Convertir selección a chino tradicional",
    CONVERT_TO_SIMPLIFIED_CHINESE: "Convertir selección a chino simplificado",
  },
  ru: {
    CONVERT_TO_TRADITIONAL_CHINESE: "Преобразовать выделение в традиционный китайский",
    CONVERT_TO_SIMPLIFIED_CHINESE: "Преобразовать выделение в упрощенный китайский",
  },
  it: {
    CONVERT_TO_TRADITIONAL_CHINESE: "Converti la selezione in cinese tradizionale",
    CONVERT_TO_SIMPLIFIED_CHINESE: "Converti la selezione in cinese semplificato",
  },
  pt: {
    CONVERT_TO_TRADITIONAL_CHINESE: "Converter seleção para chinês tradicional",
    CONVERT_TO_SIMPLIFIED_CHINESE: "Converter seleção para chinês simplificado",
  },
  nl: {
    CONVERT_TO_TRADITIONAL_CHINESE: "Selectie converteren naar Traditioneel Chinees",
    CONVERT_TO_SIMPLIFIED_CHINESE: "Selectie converteren naar Vereenvoudigd Chinees",
  },
  pl: {
    CONVERT_TO_TRADITIONAL_CHINESE: "Konwertuj zaznaczenie na tradycyjny chiński",
    CONVERT_TO_SIMPLIFIED_CHINESE: "Konwertuj zaznaczenie na uproszczony chiński",
  },
  sv: {
    CONVERT_TO_TRADITIONAL_CHINESE: "Konvertera urval till traditionell kinesiska",
    CONVERT_TO_SIMPLIFIED_CHINESE: "Konvertera urval till förenklad kinesiska",
  },
  tr: {
    CONVERT_TO_TRADITIONAL_CHINESE: "Seçimi Geleneksel Çince'ye dönüştür",
    CONVERT_TO_SIMPLIFIED_CHINESE: "Seçimi Basitleştirilmiş Çince'ye dönüştür",
  },
  ar: {
    CONVERT_TO_TRADITIONAL_CHINESE: "تحويل التحديد إلى الصينية التقليدية",
    CONVERT_TO_SIMPLIFIED_CHINESE: "تحويل التحديد إلى الصينية المبسطة",
  },
  hi: {
    CONVERT_TO_TRADITIONAL_CHINESE: "चयन को पारंपरिक चीनी में बदलें",
    CONVERT_TO_SIMPLIFIED_CHINESE: "चयन को सरलीकृत चीनी में बदलें",
  },
  id: {
    CONVERT_TO_TRADITIONAL_CHINESE: "Ubah pilihan ke Bahasa Mandarin Tradisional",
    CONVERT_TO_SIMPLIFIED_CHINESE: "Ubah pilihan ke Bahasa Mandarin Sederhana",
  },
};

type ResourceKeys = keyof typeof translations;

export const locales = Object.keys(translations) as ResourceKeys[];

export type Locales = (typeof locales)[number];

const t = (key: string): string => {
  let lang = moment.locale();
  const resource = translations[lang as Locales] || translations.en;
  return resource[key as keyof typeof resource] || key;
};

export default t;
