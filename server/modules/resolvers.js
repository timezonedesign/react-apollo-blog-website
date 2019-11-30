const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var generator = require('generate-password');
const axios = require('axios');
const Post = require('./models/post');
const User = require('./models/user');
const Comment = require('./models/comment');

const jwtPrivateKey = "Xn4X8vchcTHKcjFR";

const createToken = (user, secret, expiresIn) => {

    const { firstName, email } = user;

    return jwt.sign({
        firstName, email
    }, secret, { expiresIn })

}

const resolvers = {
    Query: {
        posts: () => Post.find({}),
        post: (parent, _id) => Post.findById(_id),

        getCurrentUser: async ( parent, currentUser ) => {
            if (!currentUser) {
                return null;
            }
            const user = await User.findOne({ userName: currentUser.userName });
            return user;
        },
        
        getUserProfile: async (root, args, { currentUser, User }) => {
            if (!currentUser) {
                return null
            }
            const user = await User.findOne({ email: currentUser.email })
            return user;
        },
    
        getAllUsers: async (parent) => {
            const users = await User.find().sort({
                joinDate: "desc"
            });
        
            return users;
        },
    
        profilePage: async (root, { userName }, { User }) => {
            const profile = await User.findOne({ userName });
            return profile;
        }
    },
    Mutation: {
        addComment: (parent, comment) => {
            const newComment = new Comment({ author: comment.author, content: comment.content, post_id: comment.post_id });
            return newComment.save();
        },
        addPost: (parent, post) => {
            const newPost = new Post({ title: post.title, content: post.content });
            return newPost.save();
        },
        updatePost: (parent, params) => {
            return Post.findByIdAndUpdate( params._id, { $set: { title: params.title, content: params.content } }, { new: true })
            .catch(err => new Error(err));
        },
        deletePost: (parent, params) => {
            return Post.findByIdAndDelete( params._id )
            .catch(err => new Error(err));
        },

        // signupUser: (parent, user) => {
        //   const newUser = new User({ firstName: user.firstName, lastName: user.lastName, email: user.email, userName: user.userName, password: user.password });
        //   return { token: createToken(newUser.save(), jwtPrivateKey, "1hr") };
        // },
        signupUser: async (parent, user) => {

            const findUser = await User.findOne({ email: user.email, userName: user.userName });
      
            if (findUser) {
              throw new Error('User already exits');
            }
      
            const newUser = await new User({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              userName: user.userName,
              password: user.password,
              role: user.role
            }).save();
      
            return { token: createToken(newUser, jwtPrivateKey, "1hr") };
          },
      
        signinUser: async (parent, user) => {
            const findUser = await User.findOne({ userName: user.userName });
      
            if (!findUser) {
              throw new Error('User Not Found');
            }
            const isValidPassword = await bcrypt.compare(user.password, findUser.password);
      
            if (!isValidPassword) {
              throw new Error('inValid password');
            }
      
            return { token: createToken(findUser, jwtPrivateKey, "1hr") };
      
          },
      
          editProfile: async (root, { email, bio }, { User }) => {
      
            const user = await User.findOneAndUpdate({ email }, { $set: { bio } }, { new: true });
      
            if (!user) {
              throw new Error('User Not Found');
            }
      
            return user;
          },
      
          setProfileIMG: async (root, { email, profileImage }, { User }) => {
            const user = await User.findOneAndUpdate({ email }, { $set: { profileImage } }, { new: true });
      
            if (!user) {
              throw new Error('User Not Found');
            }
      
            return user;
      
          },
      
          changeEmail: async (root, { currentEmail, newEmail }, { User }) => {
      
            const user = await User.findOneAndUpdate({ email: currentEmail }, { $set: { email: newEmail } }, { new: true });
      
            if (!user) {
              throw new Error('User Not Found');
            }
      
            return user;
      
          },
      
          changePassword: (root, { email, password }, { User }) => {
      
            const saltRounds = 10;
      
            return bcrypt.hash(password, saltRounds).then(async function (hash) {
      
              const user = await User.findOneAndUpdate({ email }, { $set: { password: hash } }, { new: true });
      
              if (!user) {
                throw new Error('User Not Found');
              }
      
              return user;
      
            });
      
          },
      
          passwordReset: async (root, { email }, { User }) => {
      
            const saltRounds = 10;
            const generatedPassword = generator.generate({ length: 10, numbers: true });
      
            return bcrypt.hash(generatedPassword, saltRounds).then(async function (hash) {
      
              const user = await User.findOneAndUpdate({ email }, { $set: { password: hash } }, { new: true });
      
              if (!user) {
                throw new Error('User Not Found');
              } else {
      
                const data = {
                  email,
                  generatedPassword
                }
      
                /* eslint-disable */
                axios.post(`${config.siteURL}/password-reset`, data)
                  .then(function (response) {
                    // console.log('Email sent!');
                  })
                  .catch(function (error) {
                    // console.log(error);
                  });
                /* eslint-enable */
      
              }
      
              return user;
      
            });
      
      
      
          }
      
    }
};

module.exports = resolvers;

// setProfileIMG: async (root, { email, profileImage }, { User }) => {
//     const user = await User.findOneAndUpdate({ email }, { $set: { profileImage } }, { new: true });
