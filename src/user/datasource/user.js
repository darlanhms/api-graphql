const { RESTDataSource } = require('apollo-datasource-rest');

class UsersAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3000';
    }

    async getUsers() {
        const users = await this.get('/users');

        for(const user of users) {
            const role = await this.get(`/roles/${user.role}`);

            user.role = role
        }

        return users;
    }

    async getUserById(id) {
        const user = await this.get(`/users/${id}`);
        user.role = await this.get(`/roles/${user.role}`);

        return user;
    }

    async createUser(user) {
        const { length } = await this.get('/users');
        const role = await this.get(`/roles?type=${user.role}`);
        const userId = length + 1

        await this.post('/users', {
            ...user,
            role: role[0].id,
            id: userId,
        });

        return {
            ...user,
            role: role[0],
            id: userId,
        }
    }

    async updateUser(newData) {
        const role = await this.get(`/roles?type=${newData.role}`);

        await this.put(`/users/${newData.id}`, { ...newData, role: role[0].id });

        return {
            ...newData,
            role: role[0],
        }
    }

    async deleteUserById(id) {
        await this.delete(`/users/${id}`);

        return id;
    }
}

module.exports = UsersAPI;