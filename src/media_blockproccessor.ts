import { App, parseYaml } from "obsidian";
import { MediaType, MediaBlockType } from "types";
import { LocalMediaPluginSettings } from "settings";
import { generateMediaView } from "functions";

export class MediaBlockProcessor {
	app: App;
	settings: LocalMediaPluginSettings;

	constructor(app: App, settings: LocalMediaPluginSettings) {
		this.app = app;
		this.settings = settings;
	}

	
	async run(source: string, el: HTMLElement) {
		try {
			const data: MediaBlockType = this.parseMediaInfo(source);
			// const type = data.type ? (data.type as MediaType) : "auto";
			generateMediaView(el, data, this.settings);
		} catch (error) {
			el.createEl("p", { cls: 'mediablock-error', text: `Error parsing YAML: ${error.message}` });
		}
	}

	private parseMediaInfo(source: string): MediaBlockType {
		const parsed = parseYaml(source);

		if (!parsed.path || parsed.path.length < 3) {
			throw new Error("Invalid path provided.");
		}

		return {
			path: parsed.path,
			poster: parsed.poster,
			type: parsed.type as MediaType,
			width: parsed.width,
			height: parsed.height,
			tracks: parsed.tracks,
		};
	}
}
