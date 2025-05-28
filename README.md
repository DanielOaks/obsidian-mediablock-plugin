# Mediablock Plugin

The Mediablock plugin for Obsidian lets you to embed external videos, audio, and webpages into your notes.

It's a fork of the more useful [Local Media Embedder plugin](https://github.com/seyf1elislam/obsidian-LocalMediaEmbedder-plugin), made by [seyf1elislam](https://github.com/seyf1elislam).


## Features
- Embed external videos, audio, and webpages directly into your notes.
- Supports various media formats (e.g. MP4, MP3).
- Simple and intuitive interface for embedding media.
- Lightweight and efficient, ensuring smooth performance.


## Installation
The plugin is not yet available in the Obsidian Community Plugins gallery. You can install the plugin manually by following these steps:

### Manual installation
1. Download the plugin from github released.
2. Extract the contents of the zip file to your Obsidian plugins directory: `E:/..../yourVault/.obsidian/plugins/`.
3. Enable the plugin in Obsidian by navigating to `Settings` > `Community plugins` > `Installed plugins` and toggling the Local Media Embedder plugin.

### Using BRAT
Add the current  to BRAT Plugin it will automatically download and install the plugin for you 


## Usage
Use a code block to embed media files:
```markdown
 ```media
path: https://example.com/01.Butwhatisaneuralnetwork.mp4
poster: https://example.com/01.Butwhatisaneuralnetwork-poster.jpg
type: video
width: 640
height: 360
```

You can also embed subtitles like this:
```markdown
 ```media
path: https://example.com/01.Butwhatisaneuralnetwork.mp4
poster: https://example.com/01.Butwhatisaneuralnetwork-poster.jpg
type: video
width: 640
height: 360
tracks:
  -
    label: English
    kind: subtitles
    srclang: en
    src: https://example.com/01.Butwhatisaneuralnetwork.en.vtt
```

## Acknowledgements
Thanks to seyf1elislam for creating the original plugin this is based on.

Special thanks to the Obsidian Devs & community 
