import gql from "graphql-tag";
import { db } from "../db";

export const typeDefs = gql`
  type User {
    id: String!
    name: String
    email: String
    emailVerified: String
    image: String
    bio: String
    blogs: [Blog]
    comments: [Comment]
    liked: [Comment]
    reactions: [Reaction]
    subscribers: [Subscribe]
    subscribes: [Subscribe]
    saved: [Blog]
  }

  type Subscribe {
    id: String!
    follower: User
    follow: User
    follower_id: String!
    follow_id: String!
  }

  type Blog {
    id: String!
    cover_image: Image
    title: String!
    content: String!
    tags: String!
    author_id: String!
    author: User
    is_published: Boolean!
    publishedAt: String
    createdAt: String!
    updatedAt: String!
    image_id: String!
    reactions: [Reaction]
    savers: [User]
  }

  type Comment {
    id: String!
    content: String!
    author_id: String!
    author: User
    likes: [User]
  }

  type Image {
    id: String!
    secure_url: String!
    name: String!
    alt: String
    blogs: [Blog]
  }

  type Reaction {
    id: String!
    name: String
    author: User
    blog: Blog
    userId: String!
    blogId: String!
  }


  input BookCreate {
    title: String!
    content: String!
    tags: String!
    author_id: String!
    is_published: Boolean!
    publishedAt: String
    image_id: String!
  }

  type Query {
    user(id: String!): User
    users: [User]
    blog(id: String!): Blog
    blogs(user_id: String): Blog
  }
  type Mutation {
    createBlog(book: BookCreate): Blog
  }
`;

// parent, args, contextValue, info
export const resolvers = {
  Query: {
    user: async (_parent: any, args: { id: string }) => {
      return await db.user.findFirst({
        where: {
          id: args.id,
        },
      });
    },
    users: async () => {
      return await db.user.findMany();
    },
    blog: async (_parent: any, args: { id: string }) => {
      return await db.blog.findFirst({
        where: {
          id: args.id,
        },
      });
    },
    blogs: async (parent: any, args: { user_id?: string }) => {
      const user_id = args.user_id;
      if (user_id) {
        return await db.blog.findMany({
          where: {
            author_id: user_id,
          },
        });
      } else {
        return await db.blog.findMany();
      }
    },
  },
  User: {
    blogs: async (parent: { id: string }) => {
      const blogs = await db.blog.findMany({
        where: {
          author_id: parent.id,
        },
      });
      return blogs;
    },
    comments: async (parent: { id: string }) => {
      const comments = await db.comment.findMany({
        where: {
          author_id: parent.id,
        },
      });
      return comments;
    },
    liked: async (parent: { id: string }) => {
      const likeds = await db.comment.findMany({
        where: {
          author_id: parent.id,
        },
      });
      return likeds;
    },
    reactions: async (parent: { id: string }) => {
      const reactions = await db.reaction.findMany({
        where: {
          userId: parent.id,
        },
      });
      return reactions;
    },
    subscribers: async (parent: { id: string }) => {
      const subscribers = await db.subscribe.findMany({
        where: {
          follower_id: parent.id,
        },
      });
      return subscribers;
    },
    subscribes: async (parent: { id: string }) => {
      const subscribes = await db.subscribe.findMany({
        where: {
          follow_id: parent.id,
        },
      });
      return subscribes;
    },
    saved: async (parent: { id: string }) => {
      const blogs = await db.blog.findMany({
        where: {
          savers: {
            every: {
              id: parent.id,
            },
          },
        },
      });
      return blogs;
    },
  },
  Subscribe: {},
  Blog: {},
  Comment: {},
  Image: {},
  Reaction: {},
};
