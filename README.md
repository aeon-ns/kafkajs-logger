# kafkajs-logger
A custom winston console logger for KafkaJS

## Usage
```js

    const { Kafka }         = require('kafkajs');
    const KafkaJSLogCreator = require('kafkajs-logger');

    const kafka = new Kafka({
        clientId  : 'my-app',
        brokers   : ['localhost:9092'],
        logCreator: KafkaJSLogCreator
    });

```

## Console Output 
![alt text](https://raw.githubusercontent.com/aeon-ns/kafkajs-logger/master/kafkajs-logger-screenshot.png)