
Template.roomList.helpers({

    

});

Template.roomList.events = {

    'click .create-room' : function(e, tmpl) {

        e.preventDefault();

        var room = {
            roomId          : Random.id(),
            name            : $('.room-name').val(),
            creation_date   : new Date()
        }

        room._id = Rooms.insert(room);

        Router.go('room', room);

    }

}