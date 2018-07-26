const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id:'1',
            name:'Greg',
            room: 'Node'
        }, {
            id:'2',
            name:'Jim',
            room: 'Node' 
        },
        {
            id:'3',
            name:'Clay',
            room: 'React' 
        }];
    });


    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: 123,
            name: 'Greg',
            room: 'Node Users'
        }
        let responseUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);

    });

    it('should remove a user', () => {
        let user = users.removeUser('1');
        expect(user.id).toBe('1');
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        let user = users.removeUser('4');
        expect(user).toBe(undefined);
    });

    it('should find user', () => {
        let user = users.getUser('3');
        expect(user.id).toBe('3');
    });

    it('should not find user', () => {
        let user = users.getUser('45');
        expect(user).toBe(undefined);
    });

    it('should return names for node course', () => {
        let userList = users.getUserList('Node');
        expect(userList).toEqual(['Greg', 'Jim']);
    })
});