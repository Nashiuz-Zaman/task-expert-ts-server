const baseUser = {
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      select: false,
      default: undefined,
   },
};

export default baseUser;
