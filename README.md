# serverless-local-ecr

This is a simple [Serverless Framework](https://www.serverless.com) plugin to solve the following issue, which happens when using [functions supported by ECR](https://www.serverless.com/blog/container-support-for-lambda) invoked locally:

```
Error:
Local invocation of lambdas pointing AWS ECR images is not supported
```

Important to note, this does not actually run a container locally. It simply runs functions the default serverless framework way when invoking them locally (with `serverless invoke local`)

## Install

Run `npm install` in your Serverless project.

`$ npm install --save-dev serverless-local-ecr`

Add the plugin to your serverless.yml file

```yaml
plugins:
  - serverless-local-ecr
```

Add both the handler path and the image. Instead of `image`, like it should be with vanilla serverless framework ECR, use `remoteImage` like so:

```yaml
functions:
  myFunction:
    handler: ./path-to-my-function.handler
    remoteImage:
      name: myImage
```