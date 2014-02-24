
Meteor.publish('allRooms', function() {
    return Rooms.find();
});

Meteor.publish('roomMessages', function(roomId) {
    return Messages.find({ room : roomId });
});

Meteor.publish('roomUsers', function(roomId) {
    return RoomUsers.find({ room : roomId });
});

Messages.allow({
    'insert' : function() {
        return true;
    }
});

Rooms.allow({
    'insert' : function() {
        return true;
    }
});

RoomUsers.allow({
    'insert' : function() {
        return true;
    },
    'remove' : function() {
        return true;
    },
    'update' : function() {
        return true;
    }
});

Meteor.publish('userPresence', function(id) {
  // Setup some filter to find the users your user
  // cares about. It's unlikely that you want to publish the 
  // presences of _all_ the users in the system.
  var filter = {
    userId : {
        $exists : true
    }
  }; 

  return Presences.find(filter, {fields: {state: true, userId: true}});
});