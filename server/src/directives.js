const {
  SchemaDirectiveVisitor,
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server");
const { defaultFieldResolver, GraphQLString } = require("graphql");
const { formatDate } = require("./utils");

class DateFormatDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { defaultFormat } = this.args;

    field.args.push({
      name: "format",
      type: GraphQLString,
    });

    field.resolve = async function (
      source,
      { format, ...otherArgs },
      context,
      info,
    ) {
      const date = await resolve.call(this, source, otherArgs, context, info);
      return formatDate(date, format || defaultFormat);
    };

    field.type = GraphQLString;
  }
}

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { role, privilege } = this.args;

    field.resolve = async function (source, args, context, info) {
      if (!context.user) throw new AuthenticationError("must authenticate");
      if (
        (role && role !== context.user.role) ||
        (privilege && !context.user.privileges.includes(privilege))
      )
        throw new ForbiddenError("not authorized");

      return resolve.call(this, source, args, context, info);
    };
  }
}

module.exports = { DateFormatDirective, AuthDirective };
