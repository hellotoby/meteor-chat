Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading',
    waitOn: function () {
        return Meteor.subscribe('allRooms');
    }
});

Router.map(function() {
    
    this.route('home', {
        path            : '/',
        template        : 'login',
        redirectOnLogin : true
    });

    this.route('loginRedirectRoute', {
        action          : function() {
            this.go('/rooms');
        }
    });

    this.route('room', {
        path            : '/room/:_id',
        template        : 'room',
        loginRequired   : 'home',
        waitOn          : function() {
            return Meteor.subscribe('roomMessages', this.params._id);
        },
        data            : function() {
            var roomMessages    = Messages.find({ room : this.params._id }, {sort : {creation_date : 'desc'}});
            return {
                messages    : roomMessages,
            }
        }, 
        action          : function() {
            // Set the SessionAmplify
            SessionAmplify.set('roomId', this.params._id);

            // Insert the current user into the room
            var username      = SessionAmplify.get('userName');
            var roomid        = this.params._id;

            roomuser = {
                user            : username,
                room            : roomid, 
                away            : false
            };
            SessionAmplify.set('roomUserId', RoomUsers.insert(roomuser));

            Meteor.subscribe('roomUsers', this.params._id);

            // Render the view
            this.render();
        },
        unload          : function() {

            // Remove the user from the list of users.
            var roomUserId = SessionAmplify.get('roomUserId');
            RoomUsers.remove({ _id : roomUserId });

            SessionAmplify.set('roomId', null);
        }
    });

    this.route('rooms', {
        path            : '/rooms',
        template        : 'roomList',
        loginRequired   : 'home',
        action          : function() {
            var username = Meteor.user().profile.name;
            SessionAmplify.set('userName', username);

            this.render();
        },
        data            : function() { 
            var roomsList = Rooms.find({}, {sort : {creation_date : 'desc'}});

            return {
                rooms : roomsList
            }
        } 
    });

});