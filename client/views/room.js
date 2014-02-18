
Template.room.helpers({

    username    : function() {
        return SessionAmplify.get('userName');
    }, 
    roomusers   : function() {
       return RoomUsers.find({ room : SessionAmplify.get('roomId') }, { sort : { user : 'asc' }});
    }

});

Template.room.rendered = function() {

    
}

Template.room.events = {

    'click .send-message' : function(e, tmpl) {

        e.preventDefault();

        message = {
            user            : SessionAmplify.get('userName'),
            room            : SessionAmplify.get('roomId'), 
            content         : $('.message').val(),
            creation_date   : new Date()
        };

        message._id = Messages.insert(message);

        $('.message').val('');

    },

    'click .away-toggle' : function(e, tmpl) {

        var roomUserId = SessionAmplify.get('roomUserId');

        if($('.away-toggle').is(':checked')) {
            RoomUsers.update({ _id : roomUserId }, { $set : { away : true }});
        } else {
            RoomUsers.update({ _id : roomUserId }, { $set : {away : false }});
        }

    }
 
}