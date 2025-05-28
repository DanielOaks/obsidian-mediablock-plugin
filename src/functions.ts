import { Notice, Editor, Menu, MenuItem } from "obsidian";
import { DEFAULT_SETTINGS } from "settings";
import { MediaBlockType, MediaType } from "types";

export function embedMediaAsCodeBlock(editor: Editor): void {
	try {
		const filePath = editor.getSelection();
		if (!filePath) {
			new Notice("File path not provided");
			return;
		}

		const embedType = determineEmbedType(filePath);

		let codeBlock = `\`\`\`media
path: ${filePath}
type: ${embedType}
`;
		if (embedType === "video" || embedType === "iframe") {
			codeBlock += `width: ${640}
height: ${360}
`;
		}

		codeBlock += `\`\`\``;

		editor.replaceSelection(codeBlock);
	} catch (error) {
		console.log("Error:", error);
	}
}

export function onEditorMenu(
	menu: Menu,
	editor: Editor,
	showInMenuItem: boolean = true
) {
	if (!showInMenuItem) return;
	try {
		menu.addItem((item: MenuItem) => {
			item.setTitle("Embed selected media path")
				.setIcon("link")
				.onClick(async () => {
					if (!editor) return;
					//TODO replace tihs default with the actual settings
					// embedMediOld(editor, DEFAULT_SETTINGS, "auto");
					embedMediaAsCodeBlock(editor);
				});
		});
	} catch (error) {
		console.log("Error :", error);
	}
	return;
}
export function generateMediaView(
	el: HTMLElement,
	mediainfo: MediaBlockType,
	settings: typeof DEFAULT_SETTINGS = DEFAULT_SETTINGS
): void {
	try {
		const url: string = mediainfo.path;

		if (!url) {
			new Notice("File path not provided");
			el.createEl("p", { cls: 'mediablock-error', text: `File path not provided` });
			return
		}

		if (!isValidPath(url)) {
			new Notice("The provided file path or link is not valid");
			el.createEl("p", { cls: 'mediablock-error', text: `The provided file path or link is not valid` });
			return;
		}

		const embedType: MediaType =
			mediainfo.type || determineEmbedType(url);

		const width = mediainfo.width ?? 640;
		const height = mediainfo.height ?? 360;

		if (embedType === "video") {
			const video = el.createEl("video", { attr: { width, height, controls: '', poster: mediainfo.poster || null, crossorigin: 'anonymous' }})
			video.innerText = "Your browser does not support the video tag."
			video.createEl("source", { attr: { src: url }})
			mediainfo.tracks?.forEach(trinfo => {
				const track = video.createEl("track", { attr: {
					label: trinfo.label,
					kind: trinfo.kind,
					srclang: trinfo.srclang || '',
					src: trinfo.src
				}})
				if (trinfo.default || mediainfo.tracks?.length === 1) {
					track.setAttr("default", "")
				}
			});
			return;
		} else if (embedType === "audio") {
			const audio = el.createEl("audio", { attr: { controls: '' }})
			audio.innerText = "Your browser does not support the audio tag."
			audio.createEl("source", { attr: { src: url }})
			return;
		} else {
			el.createEl("iframe", { attr: { src: url, width, height, frameborder: "0", allowfullscreen: "" }})
			return;
		}
	} catch (error) {
		console.log("Error:", error);
		el.createEl("p", { cls: 'mediablock-error', text: `Could not create mediablock embed: ${error}` });
		return;
	}
}

function isValidPath(filePath: string): boolean {
	const isWindowsPath = filePath.match(/^[A-Za-z]:(\\|\/)/) !== null;
	const isUnixPath = filePath.match(/^\//) !== null;
	const isLink = filePath.match(/^https?:\/\//) !== null;
	return isWindowsPath || isUnixPath || isLink;
}

export function determineEmbedType(filePath: string): MediaType {
	filePath = filePath.replace("file:///", "");
	if (filePath.match(/\.(mp4|webm|ogg)$/)) {
		return "video";
	} else if (filePath.match(/\.(mp3|wav|ogg)$/)) {
		return "audio";
	} else {
		return "iframe";
	}
}
