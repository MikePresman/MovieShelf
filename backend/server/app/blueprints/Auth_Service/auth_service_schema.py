register_schema = {
    "type" : "object",
        "properties" : {
            "username" : {"type" : "string"},
            "email" : {"type" : "string"},
            "password" : {"type" : "string"},
            "confirmPassword" : {"type" : "string"},
        },
        "required" : ["username", "password", "email", "confirmPassword"]
}

login_schema = {
     "type" : "object",
        "properties" : {
            "username" : {"type" : "string"},
            "password" : {"type" : "string"},
        },
        "required" : ["username", "password"]
}
