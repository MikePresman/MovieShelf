submit_movie_comment_schema = {
     "type" : "object",
        "properties" : {
            "movieID" : {"type" : "string"},
            "comment": {"type": "string"}
        },
        "required" : ["movieID", "comment"]
}