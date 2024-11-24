import { embedMediaAsCodeBlock, onEditorMenu } from "functions";
import { Plugin, Editor, Menu } from "obsidian";
import {
	LocalMediaPluginSettings,
	DEFAULT_SETTINGS,
	MyPluginSettingsTab,
} from "settings";
import { MediaBlockProcessor } from "media_blockproccessor";

export default class EmbedMediaPlugin extends Plugin {
	settings: LocalMediaPluginSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new MyPluginSettingsTab(this));

		//?====== new
		this.addCommand({
			id: "embed-in-codeblock-localMedia",
			name: "Embed as code block",
			editorCallback(editor: Editor, ctx) {
				embedMediaAsCodeBlock(editor);
			},
		});

		//?======
		this.registerEvent(
			this.app.workspace.on(
				"editor-menu",
				(menu: Menu, editor: Editor) => {
					onEditorMenu(menu, editor, this.settings.showInMenuItem);
				}
			)
		);

		this.registerMarkdownCodeBlockProcessor("media", (source, el, ctx) => {
			const obj = new MediaBlockProcessor(this.app, this.settings);
			obj.run(source, el);
		});
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
	async unload() {
		await this.saveSettings();
	}
}
