import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./en/translation.json";
import vi from "./vi/translation.json";
i18next
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: true,
		fallbackLng: "en",
		resources: {
			en: {
				translation: en,
			},
			vi: {
				translation: vi,
			},
		},

		// returnNull: false,
	});
export default i18next;
