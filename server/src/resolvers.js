const { authenticated, authorized } = require('./auth');

const NEW_POST = 'NEW_POST';

/**
 * Anything Query / Mutation resolver
 * using a user for a DB query
 * requires user authenication
 */
module.exports = {
  Query: {
    me(_, __, { user }) {
      return user;
    },
    posts(_, __, { user, models }) {
      return models.Post.findMany({ author: user.id });
    },
    post(_, { id }, { user, models }) {
      return models.Post.findOne({ id, author: user.id });
    },
    userSettings(_, __, { user, models }) {
      return models.Settings.findOne({ user: user.id });
    },
    // public resolver
    feed(_, __, { models }) {
      return models.Post.findMany();
    },
    movies(_, __, { models }) {
      return models.Movie.findMany();
    },
    shows(_, __, { models }) {
      return models.Show.findMany();
    },
  },
  Mutation: {
    updateSettings(_, { input }, { user, models }) {
      return models.Settings.updateOne({ user: user.id }, input);
    },
    createPost(_, { input }, { user, models, pubSub }) {
      const post = models.Post.createOne({ ...input, author: user.id });
      pubSub.publish(NEW_POST, { newPost: post });

      return post;
    },
    updateMe(_, { input }, { user, models }) {
      return models.User.updateOne({ id: user.id }, input);
    },
    // admin role
    invite(_, { input }, { user }) {
      return {
        from: user.id,
        role: input.role,
        createdAt: Date.now(),
        email: input.email,
      };
    },
    signup(_, { input }, { models, createToken }) {
      const existing = models.User.findOne({ email: input.email });

      if (existing) {
        throw new Error('nope');
      }
      const user = models.User.createOne({
        ...input,
        verified: false,
        avatar: 'http',
        privileges: input.isAdvancedUser ? ['ADVANCED_MOVIES'] : [],
      });
      const token = createToken(user);
      return { token, user };
    },
    signin(_, { input }, { models, createToken }) {
      const user = models.User.findOne(input);

      if (!user) {
        throw new Error('nope');
      }

      const token = createToken(user);
      return { token, user };
    },
    createMovie(_, { input }, { user, models }) {
      const movie = models.Movie.createOne({
        ...input,
        createdAt: Date.now(),
        createdBy: user.id,
      });
      console.log(movie);
      return movie;
    },
  },
  User: {
    posts(root, _, { user, models }) {
      if (root.id !== user.id) {
        throw new Error('nope');
      }

      return models.Post.findMany({ author: root.id });
    },
    settings(root, __, { user, models }) {
      return models.Settings.findOne({ id: root.settings, user: user.id });
    },
  },
  Settings: {
    user(settings, _, { user, models }) {
      return models.Settings.findOne({ id: settings.id, user: user.id });
    },
  },
  Post: {
    author(post, _, { models }) {
      return models.User.findOne({ id: post.author });
    },
  },
  Movie: {
    createdBy(movie, _, { models }) {
      return models.User.findOne({ id: movie.createdBy });
    },
  },
  Subscription: {
    newPost: {
      subscribe(parent, args, { pubSub }) {
        return pubSub.asyncIterator(NEW_POST);
      },
    },
  },
};
