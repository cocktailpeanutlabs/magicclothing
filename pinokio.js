const path = require('path')
module.exports = {
  version: "1.5",
  title: "MagicClothing",
  description: "",
  icon: "icon.png",
  menu: async (kernel) => {
    let installing = await kernel.running(__dirname, "install.js")
    let installed = await kernel.exists(__dirname, "app", "env")
    let running = await kernel.running(__dirname, "start.js")
    if (installing) {
      return [{
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running) {
        let local = kernel.memory.local[path.resolve(__dirname, "start.js")]
        if (local && local.url) {
          return [{
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        } else {
          return [{
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        }
      } else {
        return [{
          icon: "fa-solid fa-power-off",
          text: "Start FaceID",
          href: "start.js",
          params: {
            cmd: "python gradio_ipadapter_faceid.py --model_path checkpoints/200000.safetensors"
          }
        }, {
          icon: "fa-solid fa-power-off",
          text: "Start FaceID + Openpose",
          href: "start.js",
          params: {
            cmd: "python gradio_ipadapter_openpose.py --model_path checkpoints/200000.safetensors"
          }
        }, {
          icon: "fa-solid fa-power-off",
          text: "Start text-to-image",
          href: "start.js",
          params: {
            cmd: "python gradio_generate.py --model_path checkpoints/200000.safetensors"
          }
        }, {
          icon: "fa-solid fa-power-off",
          text: "Start Inpainting",
          href: "start.js",
          params: {
            cmd: "python gradio_sd_inpainting.py --model_path checkpoints/200000.safetensors"
          }
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "Reset",
          href: "reset.js",
        }]
      }
    } else {
      return [{
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
