import { SwaggerDefinition } from 'swagger-jsdoc';
export const data : SwaggerDefinition = {
    "swagger": "2.0",
    "apis":[],
    "definition":"test",
    "info": {
        "title": "Book Store API",
        "version": "1.0.0",
        "description": "API for managing users, books, and authentication in a book store application"
    },
    "host": "localhost:5000",
    "basePath": "/api/v1",
    "schemes": ["http"],
    "paths": {
        "/auth/send_otp": {
            "post": {
                "summary": "Send OTP",
                "description": "Send OTP to the user's email address for authentication",
                "consumes": ["application/json"],
                "produces": ["application/json"],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Email of the user",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string",
                                    "example": "bhavneshperfectiongeeks@gmail.com"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OTP sent successfully"
                    }
                }
            }
        },
        "/auth/verify_otp": {
            "post": {
                "summary": "Verify OTP",
                "description": "Verify the OTP sent to the user's email address",
                "consumes": ["application/json"],
                "produces": ["application/json"],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Email and OTP for verification",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string",
                                    "example": "bhavnesharma2023@gmail.com"
                                },
                                "otp": {
                                    "type": "string",
                                    "example": "150838"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OTP verified successfully"
                    }
                }
            }
        },
        "/auth/register": {
            "post": {
                "summary": "Register",
                "description": "Register a new user",
                "consumes": ["application/json"],
                "produces": ["application/json"],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "User details for registration",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string",
                                    "example": "bhavneshperfectiongeeks@gmail.com"
                                },
                                "otp": {
                                    "type": "string",
                                    "example": "559092"
                                },
                                "first_name": {
                                    "type": "string",
                                    "example": "Bhavnesh"
                                },
                                "last_name": {
                                    "type": "string",
                                    "example": "Sharma"
                                },
                                "username": {
                                    "type": "string",
                                    "example": "bhanu00981"
                                },
                                "password": {
                                    "type": "string",
                                    "example": "Demo@123"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User registered successfully"
                    }
                }
            }
        },
        "/auth/login": {
            "post": {
                "summary": "Login",
                "description": "Authenticate user",
                "consumes": ["application/json"],
                "produces": ["application/json"],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "User credentials for authentication",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string",
                                    "example": "bhavnesharma20231@gmail.com"
                                },
                                "password": {
                                    "type": "string",
                                    "example": "Demo@123"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User authenticated successfully"
                    }
                }
            }
        },
        "/users/create_user": {
            "post": {
                "summary": "Create User",
                "description": "Create a new user",
                "consumes": ["application/json"],
                "produces": ["application/json"],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "User details for creation",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/UserInput"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User created successfully"
                    }
                }
            }
        },
        "/users/get_all_users": {
            "get": {
                "summary": "Get All Users",
                "description": "Get all users",
                "produces": ["application/json"],
                "responses": {
                    "200": {
                        "description": "List of users retrieved successfully"
                    }
                }
            }
        },
        "/users/get_user/{id}": {
            "get": {
                "summary": "Get User by ID",
                "description": "Get user by ID",
                "produces": ["application/json"],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "ID of the user",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User retrieved successfully"
                    }
                }
            }
        },
        "/users/update_user/{id}": {
            "put": {
                "summary": "Update User by ID",
                "description": "Update user details",
                "consumes": ["application/json"],
                "produces": ["application/json"],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "ID of the user",
                        "required": true,
                        "type": "string"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "User details to update",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/UserInput"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User updated successfully"
                    }
                }
            }
        },
        "/users/delete_user/{id}": {
            "delete": {
                "summary": "Delete User by ID",
                "description": "Delete user by ID",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "ID of the user",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User deleted successfully"
                    }
                }
            }
        },
        "/users/create_payment_intent": {
            "post": {
                "summary": "Create Payment Intent",
                "description": "Create a payment intent",
                "consumes": ["application/json"],
                "produces": ["application/json"],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Payment details",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "amount": {
                                    "type": "number",
                                    "example": 120
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Payment intent created successfully"
                    }
                }
            }
        },
        "/users/getPurchaseHistoryHandler": {
            "get": {
                "summary": "Get Purchase History",
                "description": "Get purchase history of the user",
                "produces": ["application/json"],
                "responses": {
                    "200": {
                        "description": "Purchase history retrieved successfully"
                    }
                }
            }
        },
        "/books": {
            "get": {
                "summary": "Get Books",
                "description": "Get all books",
                "produces": ["application/json"],
                "responses": {
                    "200": {
                        "description": "List of books retrieved successfully"
                    }
                }
            }
        },
        "/books/{id}": {
            "get": {
                "summary": "Get Book by ID",
                "description": "Get book by ID",
                "produces": ["application/json"],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "ID of the book",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Book retrieved successfully"
                    }
                }
            }
        },
        // "/books": {
        //     "post": {
        //         "summary": "Create Book",
        //         "description": "Create a new book",
        //         "consumes": ["application/json"],
        //         "produces": ["application/json"],
        //         "parameters": [
        //             {
        //                 "in": "body",
        //                 "name": "body",
        //                 "description": "Book details for creation",
        //                 "required": true,
        //                 "schema": {
        //                     "$ref": "#/definitions/BookInput"
        //                 }
        //             }
        //         ],
        //         "responses": {
        //             "200": {
        //                 "description": "Book created successfully"
        //             }
        //         }
        //     }
        // },
        // "/books/{id}": {
        //     "put": {
        //         "summary": "Update Book by ID",
        //         "description": "Update book details",
        //         "consumes": ["application/json"],
        //         "produces": ["application/json"],
        //         "parameters": [
        //             {
        //                 "name": "id",
        //                 "in": "path",
        //                 "description": "ID of the book",
        //                 "required": true,
        //                 "type": "string"
        //             },
        //             {
        //                 "in": "body",
        //                 "name": "body",
        //                 "description": "Book details to update",
        //                 "required": true,
        //                 "schema": {
        //                     "$ref": "#/definitions/BookInput"
        //                 }
        //             }
        //         ],
        //         "responses": {
        //             "200": {
        //                 "description": "Book updated successfully"
        //             }
        //         }
        //     }
        // },
        // "/books/{id}": {
        //     "delete": {
        //         "summary": "Delete Book by ID",
        //         "description": "Delete book by ID",
        //         "parameters": [
        //             {
        //                 "name": "id",
        //                 "in": "path",
        //                 "description": "ID of the book",
        //                 "required": true,
        //                 "type": "string"
        //             }
        //         ],
        //         "responses": {
        //             "200": {
        //                 "description": "Book deleted successfully"
        //             }
        //         }
        //     }
        // },
        "/books/filter-search": {
            "get": {
                "summary": "Filter and Search Books",
                "description": "Filter and search books by title",
                "produces": ["application/json"],
                "parameters": [
                    {
                        "name": "title",
                        "in": "query",
                        "description": "Title to search",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Books filtered and searched successfully"
                    }
                }
            }
        }
    },
    "definitions": {
        "UserInput": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string"
                },
                "first_name": {
                    "type": "string"
                },
                "last_name": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "role_id": {
                    "type": "string"
                }
            }
        },
        "BookInput": {
            "type": "object",
            "properties": {
                "title": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "price": {
                    "type": "number"
                }
            }
        }
    }
}
