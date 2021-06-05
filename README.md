# kafkajs-logger
A custom winston logger for KafkaJS

## Usage
```js

    const { Kafka } = require('kafkajs');

    const kafka = new Kafka({
        clientId  : 'my-app-consumer',
        brokers   : ['localhost:9092'],
        logCreator: require('kafkajs-logger')
    });

```