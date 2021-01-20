const { GraphQLScalarType } = require("graphql")

const userResolvers = {
    DateTime: new GraphQLScalarType({
        name: "DateTime",
        description: "string de data e hora formato ISO-8601",
        serialize: value => value.toISOString(),
        parseValue: value => new Date(value),
        parseLiteral: ast => new Date(ast.value)
    }),
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