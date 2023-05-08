import { connect } from "react-redux";
import TwoColLayout from "./TwoColLayout";
import BlogList from './BlogList';
import React, { useEffect, useState } from 'react';
import "../css/Reader.css";
import Preview from "./Preview";
import AuthorCard from "./AuthorCard";
import { getAuthor } from "../api/blog";
function Reader({ id, bgColor, darkMode }) {
    const [authorId, setAuthorId] = useState('1');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const { id:authorId } = await getAuthor({ id });
            if (authorId) {
                setAuthorId(authorId);
                setLoading(false);
            }
        }
        if (!id) throw 'invalid used:Reader';
        else fetchData();
    }, [id])
    return (
        <TwoColLayout
            rightCol={6}
            LeftChild={() => (<div style={{ backgroundColor: darkMode ? 'transparent' : bgColor }}>
                <BlogList data={[{ 'id': id }]} />
                <Preview viewed borderless articleId={id} readOnly={true} />
            </div>)}
            RightChild={() => (
                loading?<></>:<AuthorCard id={authorId} />)}
        />
    );
}

const mapStateToProps = (state) => ({
    darkMode: state.app.darkMode,
    bgColor: state.theme[state.app.theme].bgColor,
});

const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(Reader);
