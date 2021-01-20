
const userResolvers = {
    Query: {
        users: (root, args, { dataSources }) => dataSources.usersAPI.getUsers(),
        user: (root, { id }, { dataSources }) => dataSources.usersAPI.getUserById(id),
    },
    Mutation: {
        createUser: (root, user,  { dataSources }) => dataSources.usersAPI.createUser(user),
        updateUser: (root, newData, { dataSources }) => dataSources.usersAPI.updateUser(newData),
        deleteUser: (root, { id }, { dataSources }) => dataSources.usersAPI.deleteUserById(id)
    }
};

module.exports = userResolvers;