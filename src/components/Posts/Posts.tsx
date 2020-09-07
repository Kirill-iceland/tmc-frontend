//TODO add pagnation
import React, {memo, useCallback, useEffect, useMemo, useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";

const Posts = () => {
    const [metadata, setMetadata] = useState([])
    //default state of the fetch getPost is loading
    const [fetchState, setFetchState] = useState("loading")
    useEffect(() => {
        getPost()
            //If the fetch got the data make the state a success
            .then(() => {
                setFetchState("success")
            })
            //If the fetch was bad set the state of the fecth to failed
            .catch(() => {
                setFetchState("failed")
            })
    }, []);
    const getPost = async () => {
        const response = await fetch('/api/__allposts__?')
        const data = await response.json()
        await setMetadata(data);
    };
    const postLink = useMemo(() => metadata.map(
        ({title, desc, tags, last_edited, body, _id}) => (
            <div className={"post-link slide"}>
                <div className={"post-link-title"}><a href={"/render-post/" + _id}><h1 className={"link"}>{title}</h1>
                </a></div>
                <div>About: {desc}</div>
                <div>Tags: {tags}</div>
                <div>Last updated: {last_edited}</div>
            </div>
        )
        ),
        [metadata]);
    // if the post is still loading just render a loading bar
    if (fetchState === "loading") {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
    //if we caught a error send a failed message
    else if (fetchState === "failed") {
        return (
            <div className="alert alert-danger" role="alert">Sorry Looks like something is going wrong. Is the API down? Check with Jakku on the Discord.</div>
        )
    } else return (
        <div>
            {postLink}
        </div>
    );
}
export default memo(Posts)
