import { defineConfig } from 'vitepress'
import { shared } from './shared'
import { en } from './en'
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(defineConfig({
  ...shared,
  locales: {
    root: { label: 'English', ...en },
  },
  mermaid: {
    // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
  },
  // optionally set additional config for plugin itself with MermaidPluginConfig
  mermaidPlugin: {
    class: "mermaid my-class", // set additional css classes for parent container 
  }
}));
