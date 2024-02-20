import Joi from 'joi';

export const createBookSchema = Joi.object({
    body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().integer().min(100).max(1000).required(),
        authors: Joi.object({
            create: Joi.array().items(
                Joi.object({
                    user: Joi.object({
                        connect: Joi.object({
                            id: Joi.string().guid().required()
                        }).required()
                    })
                })
            ).required()
        })
    }),
    query:{ }
});

export const updateBookByIdSchema = Joi.object({
    body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().integer().min(100).max(1000).required(),
    }),
    query: {}
});

export const filterAndSearchBooksSchema = Joi.object({
    body:{},
    query: Joi.object({
      title: Joi.string(),
      minPrice: Joi.number().integer().min(0),
      maxPrice: Joi.number().integer().min(0),
      searchTerm: Joi.string(),
    }),
  });




