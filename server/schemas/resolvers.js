const { AuthenticationError } = require("apollo-server-express");
//import modesl
const { User, Book } = require("../models");
//import auth tolem
const { signToken } = require("../utils/auth");

const resolvers = {
    //i dont think this is right. 
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).select();
          //this is now saving everything in the save array. 
        }
        throw new AuthenticationError('You need to be logged in!');
      },
  },

  Mutation: {
    login: async (parent, {email, password }) => {
        const user = await User.findOne( {email });
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    }, 
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
      //accept the 2nd argument as book which is an array, {book is an inpt type} 
      saveBook: async (parent, { input }, context) => {
        console.log("inside Save Book", context.user._id, input)
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                //match user ID 
                { _id: context.user._id },
                //add to set new book
                { $addToSet: {savedBooks: input} },
                //update new info new: true (NOT MAPPING)
                { new: true }
            )
            console.log("updatedUser", updatedUser);
            return updatedUser;
        }
        throw new AuthenticationError('You need to be logged in!')
    },
    //needs to return all bookId and return User type. 
    removeBook:  async (parent, { bookId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
              //match the USerId
            { _id: context.user._id },
            //pull the matched bookId from saveBook 
            { $pull: { savedBooks: { bookId: bookId } } },
            //update newInfo newL true, i.e. userId will have 1 less book
            { new: true }
          );
          //return updatedUser 
          return updatedUser;
        }
        //threow authentication Error if not logged in .
        throw new AuthenticationError("You need to be logged in!");
      },
    },
};
module.exports = resolvers;
