
Template.room.helpers({

    username    : function() {
        return Session.get('userName');
    }, 
    roomusers   : function() {
       return RoomUsers.find({ room : Session.get('roomId') }, { sort : { user : 'asc' }});
    }

});

Template.room.rendered = function() {

    
}

Template.room.events = {

    'click .send-message' : function(e, tmpl) {

        e.preventDefault();

        if( $('.message').val() === '' ) {
            
            return false;
        
        }

        message = {
            user            : Session.get('userName'),
            room            : Session.get('roomId'), 
            content         : $('.message').val(),
            creation_date   : new Date()
        };

        message._id = Messages.insert(message);

        $('.message').val('');

    },

    'keyup .message' : function(e, tmpl) {

        if( e.keyCode === 13 ) {

            message = {
                user            : Session.get('userName'),
                room            : Session.get('roomId'), 
                content         : $('.message').val(),
                creation_date   : new Date()
            };

            message._id = Messages.insert(message);

            $('.message').val('');

        }

    },

    'click .away-toggle' : function(e, tmpl) {

        var roomUserId = Session.get('userRoomId');

        if($('.away-toggle').is(':checked')) {
            RoomUsers.update({ _id : roomUserId }, { $set : { away : true }});
        } else {
            RoomUsers.update({ _id : roomUserId }, { $set : {away : false }});
        }

    }
 
}