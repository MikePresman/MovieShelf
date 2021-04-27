register_schema = {
    "type" : "object",
        "properties" : {
            "username" : {"type" : "string"},
            "email" : {"type" : "string"},
            "password" : {"type" : "string"},
            "confirmPassword" : {"type" : "string"},
        },
}

login_schema = {
     "type" : "object",
        "properties" : {
            "username" : {"type" : "string"},
            "password" : {"type" : "string"},
        },
}


#jsonschema is an absolute joke lol. Doesn't do anything. fuck off