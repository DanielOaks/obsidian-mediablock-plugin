export type MediaType = "video" | "iframe" | "audio" | "auto";

export type MediaTrack = {
	label: string;
	kind: string;
	srclang?: string;
	src: string;
	default?: boolean;
}

export type MediaBlockType = {
	path: string;
	poster?: string;
	type?: MediaType;
	width?: number;
	height?: number;
	aspectRatio?: number;
	tracks?: MediaTrack[];
};