new_favourite_schema = {
     "type" : "object",
        "properties" : {
            "movieID" : {"type" : "string"},
            
        },
        "required" : ["movieID"]
}


remove_to_watch_schema = {
        "type" : "object",
        "properties" : {
            "movieID" : {"type" : "number"},
            
        },
        "required" : ["movieID"]
}


set_avatar_schema = { 
    "type" : "object",
        "properties" : {
            "seed" : {"type" : "string"},
            
        },
        "required" : ["seed"]
}