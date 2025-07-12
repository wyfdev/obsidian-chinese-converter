import { Editor, MarkdownView, Plugin, Menu, MenuItem, App, PluginSettingTab, Setting } from 'obsidian';
import * as OpenCC from 'opencc-js';
import { Locale } from 'opencc-js';
import t from './i18n';

type Converter = (text: string) => string;

interface ConversionOption {
	id: string;
	from: Locale;
	to: Locale;
	name: string;
}

interface ChineseConverterPluginSettings {
	enabledConversions: Record<string, boolean>;
}

// Type for accessing internal command structure
interface AppWithCommands extends App {
	commands: {
		commands: Record<string, unknown>;
	};
}

const DEFAULT_SETTINGS: ChineseConverterPluginSettings = {
	enabledConversions: {
		's2t': true,
		't2s': true,
		's2tw': false,
		'tw2s': false,
		's2hk': false,
		'hk2s': false,
		's2twp': false,
		'tw2sp': false,
		't2tw': false,
		't2hk': false,
	}
}

const conversionOptions: ConversionOption[] = [
	{ id: 's2t', from: 'cn', to: 't', name: 'Simplified to Traditional' },
	{ id: 't2s', from: 't', to: 'cn', name: 'Traditional to Simplified' },
	{ id: 's2tw', from: 'cn', to: 'tw', name: 'Simplified to Traditional (Taiwan)' },
	{ id: 'tw2s', from: 'tw', to: 'cn', name: 'Traditional (Taiwan) to Simplified' },
	{ id: 's2hk', from: 'cn', to: 'hk', name: 'Simplified to Traditional (Hong Kong)' },
	{ id: 'hk2s', from: 'hk', to: 'cn', name: 'Traditional (Hong Kong) to Simplified' },
	{ id: 's2twp', from: 'cn', to: 'twp', name: 'Simplified to Traditional (Taiwan, with phrases)' },
	{ id: 'tw2sp', from: 'twp', to: 'cn', name: 'Traditional (Taiwan) to Simplified (with phrases)' },
	{ id: 't2tw', from: 't', to: 'tw', name: 'Traditional to Traditional (Taiwan)' },
	{ id: 't2hk', from: 't', to: 'hk', name: 'Traditional to Traditional (Hong Kong)' },
];

export default class ChineseConverterPlugin extends Plugin {
	settings: ChineseConverterPluginSettings;

	private getConverter(from: Locale, to: Locale): Converter {
		const s2tPunctuation: readonly [string, string][] = [['“', '「'], ['”', '」'], ['‘', '『'], ['’', '』']];
		const t2sPunctuation: readonly [string, string][] = [['「', '“'], ['」', '”'], ['『', '‘'], ['』', '’']];

		const customS2TConverter = OpenCC.CustomConverter(s2tPunctuation);
		const customT2SConverter = OpenCC.CustomConverter(t2sPunctuation);

		const mainConverter = OpenCC.Converter({ from, to });

		const traditionalTargets = ['t', 'tw', 'hk', 'twp'];
		const simplifiedTargets = ['cn'];

		if (traditionalTargets.includes(to)) {
			// S -> T: Apply custom punctuation conversion after main conversion
			return (text) => customS2TConverter(mainConverter(text));
		} else if (simplifiedTargets.includes(to)) {
			// T -> S: Apply custom punctuation conversion before main conversion
			return (text) => mainConverter(customT2SConverter(text));
		} else {
			return mainConverter;
		}
	}

	private convertSelection(editor: Editor, from: Locale, to: Locale): void {
		const selection = editor.getSelection();
		if (selection) {
			const converter = this.getConverter(from, to);
			const converted = converter(selection);
			editor.replaceSelection(converted);
		}
	}

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new ChineseConverterSettingTab(this.app, this));

		this.updateCommands();

		this.app.workspace.on('editor-menu', (menu: Menu, editor: Editor) => {
			const selectedText = editor.getSelection();
			const containChinses = /[\u4e00-\u9fa5]/.test(selectedText);
			if (containChinses) {
				for (const conversion of conversionOptions) {
					if (this.settings.enabledConversions[conversion.id]) {
						menu.addItem((item: MenuItem) => {
							item
								.setTitle(t(conversion.name))
								.setIcon("arrow-up-down")
								.onClick(() => {
									this.convertSelection(editor, conversion.from, conversion.to);
								});
						});
					}
				}
			}
		});
	}

	// onunload() {
	// }

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
		this.updateCommands();
	}

	updateCommands() {
		// Clear existing commands
		const appWithCommands = this.app as AppWithCommands;
		appWithCommands.commands.commands = Object.fromEntries(
			Object.entries(appWithCommands.commands.commands).filter(
				([id, _]) => !id.startsWith('chinese-converter:')
			)
		);

		for (const conversion of conversionOptions) {
			if (this.settings.enabledConversions[conversion.id]) {
				this.addCommand({
					id: `chinese-converter:${conversion.id}`,
					name: t(conversion.name),
					editorCallback: (editor: Editor, _view: MarkdownView) => {
						this.convertSelection(editor, conversion.from, conversion.to);
					},
				});
			}
		}
	}
}

class ChineseConverterSettingTab extends PluginSettingTab {
	plugin: ChineseConverterPlugin;

	constructor(app: App, plugin: ChineseConverterPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: t('Chinese Converter Settings') });

		for (const conversion of conversionOptions) {
			new Setting(containerEl)
				.setName(t(conversion.name))
				.setDesc(t('Enable conversion', { conversion: t(conversion.name) }))
				.addToggle(toggle => toggle
					.setValue(this.plugin.settings.enabledConversions[conversion.id])
					.onChange(async (value) => {
						this.plugin.settings.enabledConversions[conversion.id] = value;
						await this.plugin.saveSettings();
					}));
		}
	}
}
