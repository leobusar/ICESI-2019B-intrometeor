import { Meteor } from  'meteor/meteor';
import { Mongo } from  'meteor/mongo';
import { check } from 'meteor/check';

export  const  TasksCollection =  new Mongo.Collection('tasks');

if(Meteor.isServer){
    console.log()
    Meteor.publish('tasks', () => {
        return TasksCollection.find({owner: Meteor.userId()});
    });
}

Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized')
        }

        TasksCollection.insert({
            text, 
            createAt: new Date(),
            status: false,
            owner: Meteor.userId(),
            username: Meteor.user().username
        })

    },
    'task.remove'(taskId){
        check(taskId, String);
        TasksCollection.remove(taskId)
    },
    'task.update'(taskId, status) {
        check(taskId, String);
        check(status, Boolean);
        TasksCollection.update(taskId, 
            {$set: {status: status}} )
    }

})