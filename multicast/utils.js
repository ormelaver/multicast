const QUEUE_URL = "https://sqs.us-east-1.amazonaws.com/622578823477/eventQueue.fifo";
const AWS = require("aws-sdk");
const sqs = new AWS.SQS({region : 'us-east-1'});
const eventList = require("event_list");
const sns = new AWS.SNS();


// *** Uncomment the code below to implement pulling from the queue and also sending the data ***
// module.exports.Enqueue = function(event, context) {
// 	console.log("ENQUEUE ENQUEUE ENQUEUE ENQUEUE");
//   const params = {
//     MessageBody: JSON.stringify(event),
//     QueueUrl: QUEUE_URL
//   };
//   sqs.sendMessage(params, (err,data) => {
//     if(err) {
//       console.log('error:',"Failed to send message" + err);
//       context.done('error', "ERROR Put SQS");  // ERROR with message
//     }else{
//       console.log('data:',data.MessageId);
//       context.done(null,'');  // SUCCESS 
//     }
//   });
// }

// const sendByType = {
// 	ip: (ip, data) => {
// 		send(ip, data);
// 	},
// 	url: (url, data) => {
// 	  send(url, data);
// 	},
// 	iphone: (number, data) => {
// 		send(number, data);
// 	}
// }


// module.exports.Dequeue = () => {
//     const params = {
//                 QueueUrl : QUEUE_URL
//             }
//     const message = sqs.receiveMessage(params)
//     if (sendByType[message.type] === undefined) {
// 				console.log('this type does not exist: ' + message.type);
// 		} else {
// 				const eventName = Object.keys(message.body)[0];
//         const subscribers = eventList[eventName];
//         for (var i = 0; i < Things.length; i++) {
//         	Things[i]
//         }
//         	sendByType[subscribers[i][type]](message.body.access, data);	
// 		}
//  };

// module.exports.getElementById = function(id) {
//  var params = {
//    TableName : "events",
//    KeyConditionExpression: "id = :eventId",
//    ExpressionAttributeValues: {
//        ":eventId": id
//    }
//   };

module.exports.publish = function(eventName, data) {
 	var params = {
  Message: data, /* required */
  TopicArn: 'arn:aws:sns:us-east-1:622578823477:' + eventName
	};
		sns.publish(params, function(err, data) {
  		if (err){
  			console.log(err, err.stack);
  		} 
  		else {
  		console.log(data);
  		} 
		});
 }


   docClient.query(params, function(err, data){
    if(err){
      return err;
    }else{
      return data;
       }
   });
}

module.exports.createResponse = function(code, comment, auxiliary) {
	return response = {
      statusCode: code,
      body: {
      message: comment + " " + auxiliary,
      },  
  };
}

