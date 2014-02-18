
Meteor.publish('allRooms', function() {
    return Rooms.find();
});

Rooms.allow({
    'insert' : function() {
        return true;
    }
});

Meteor.publish('roomMessages', function(roomId) {
    return Messages.find({ room : roomId });
});

Messages.allow({
    'insert' : function() {
        return true;
    }
})

Meteor.publish('roomUsers', function(roomId) {
    return RoomUsers.find({ room : roomId });
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
})