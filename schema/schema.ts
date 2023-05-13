import TodoModal from "../modal/Todo.modal";

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
  } = require('graphql');


//  creating shema here 
const TodoType = new GraphQLObjectType({
    name:"Todo",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLSchema},
        description:{type:GraphQLSchema},
        image:{type:GraphQLSchema},
    })
})

// 
const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        todos:{
            type:new GraphQLList(TodoType),
            resolve(parent,args){
                return TodoModal.find();
            }
        },
        todo:{
            type:"TodoType",
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return TodoModal.findById(args.id)
            }
        }
    }
})

// const mutation

const mutation  = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        // add todo
        addTodo:{
            type:TodoType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString )},
                description:{type:GraphQLNonNull(GraphQLString )},
                image:{type:GraphQLNonNull(GraphQLString )}
            },
            resolve(parent,args){
                const {name , description , image} = args
                const todo = new TodoModal({
                    name , description , image
                });
                 return todo.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
  });