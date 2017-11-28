"use strict";
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});
const uuid = require("uuid/v1");
const utils = require("utils");


module.exports.postEvent = (event, context, callback) => {
  const currentId = uuid();
  try {
    const eventName = Object.keys(event)[0];
    const dataToSend = event[eventName];
    const params = {
      Item: {
          id: currentId,
          eventName: eventName,
          data: dataToSend
      },
      TableName: "events"
  };

  if (eventName == null) {
    callback(null, utils.createResponse(400, "Event name must not be empty!", ""));
  }
  docClient.put(params, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      utils.publish(eventName, dataToSend);
      callback(null, utils.createResponse(200, "Your event was logged with id", currentId));
    }
  });
  } catch(err) {
    if (err) {
      callback(err, null);  
    }
  }
};


module.exports.putEvent = (event, context, callback) => {
  const currentId = event.id;
  const newData = event.payload.data;
  const params = {
   TableName : "events",
      Key : {
        "id" : currentId
      },
    UpdateExpression : "SET #attrName = :attrValue",
    ConditionExpression : "#id = :id",
    ExpressionAttributeNames : {
        "#attrName" : "data",
        "#id" : "id"
    },
    ExpressionAttributeValues : {
        ":attrValue" : newData, 
        ":id" : currentId
    }

  };
  try {
  docClient.update(params, (err, data) => {
    if (err) {
      callback(null, utils.createResponse(404, "Item not found", ""));
    } else {
      callback(null, utils.createResponse(200, "Item was updated with new data: ", newData));
    }
  });
  } catch(err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, response);  
    }
  }


};

module.exports.getEvent = (event, context, callback) => {
  const currentId = event.id;
   var params = {
   TableName : "events",
   KeyConditionExpression: "id = :eventId",
   ExpressionAttributeValues: {
       ":eventId": currentId
   }
  };

 
 docClient.query(params, (err, data) => {
   if (err) {
      callback(err, null);
   }else {
      callback(null, data.Items); 
    }
  });
}

module.exports.deleteEvent = (event, context, callback) => {
  const currentId = event.id;
  var params = {
   TableName : "events",
   Key : {
        "id" : currentId
      },
   ConditionExpression: "id = :eventId",
   ExpressionAttributeValues: {
       ":eventId": currentId
   }
  };
  docClient.delete(params, (err, data) => {
    if (err) {
      callback(null, utils.createResponse(404, "Item was not found! deletion unsuccessful", ""));
    }
    else {
      callback(null, utils.createResponse(200, "Item was deleted successfully", ""));
    }
  });
}

   


