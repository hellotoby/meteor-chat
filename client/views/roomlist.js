
Template.roomList.helpers({


});

Template.roomList.rendered = function() {

    // Note: This is not reactive (I don't think)
    $('.list-group li a').each(function() {

        var obj     = $(this);
        var roomId  = obj.data('id');

        totalUsers  = RoomUsers.find({ room : roomId }).count();

        obj.next('span').text(totalUsers + ' users');

    });

}

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