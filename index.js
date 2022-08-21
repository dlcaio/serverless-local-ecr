"use strict";

class ServerlessLocalECR {
  constructor(serverless) {
    this.serverless = serverless;
    this.hooks = {
      "before:package:initialize": () => this.addImageToFunctions(),
    };
  }

  addImageToFunctions() {
    const functions = Object.keys(this.serverless.service.functions);
    functions.forEach((func) => {
      const hasImage = !!this.serverless.service.functions[func].remoteImage;
      const hasHandler = !!this.serverless.service.functions[func].handler;
      if (hasImage && hasHandler) {
        const image = this.serverless.service.functions[func].remoteImage;
        delete this.serverless.service.functions[func].handler;
        delete this.serverless.service.initialServerlessConfig.functions[func].handler;
        this.serverless.service.functions[func].image = image;
        this.serverless.service.initialServerlessConfig.functions[func].image = image;
      }
    });
   
  }
}

module.exports = ServerlessLocalECR;
