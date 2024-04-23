module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/peanutcocktail/MagicClothing app",
        ]
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          // xformers: true   // uncomment this line if your project requires xformers
        }
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "pip install gradio devicetorch",
          "pip install numpy==1.25.1 diffusers==0.25.1 opencv-python==4.9.0.80 transformers==4.31.0 gradio==4.16.0 safetensors==0.3.1 controlnet-aux==0.0.6 accelerate==0.21.0 insightface",
          "pip install {{gpu === 'nvidia' ? 'onnxruntime-gpu' : 'onnxruntime'}}"
        ]
      }
    },
    //  Uncomment this step to add automatic venv deduplication (Experimental)
    //  {
    //    method: "fs.link",
    //    params: {
    //      venv: "env"
    //    }
    //  },
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/ShineChen1024/MagicClothing/resolve/main/cloth_segm.pth?download=true",
        dir: "app/checkpoints"
      }
    },
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/ShineChen1024/MagicClothing/resolve/main/OMS_1024_VTHD%2BDressCode_200000.safetensors?download=true",
        path: "app/checkpoints/200000.safetensors",
      }
    },
    {
      method: "fs.rm",
      params: {
        path: "app/checkpoints/ipadapter_faceid"
      }
    },
    {
      method: "shell.run",
      params: {
        message: [
          "git lfs install",
          "git clone --depth 1 https://huggingface.co/h94/IP-Adapter-FaceID ipadapter_faceid",
        ],
        path: "app/checkpoints"
      }
    },
    {
      method: "notify",
      params: {
        html: "Click the 'start' tab to get started!"
      }
    }
  ]
}
