import { connect } from "react-redux";
import TwoColLayout from "./TwoColLayout";
import BlogList from './BlogList';
import React from 'react';
import "../css/Reader.css";
import Preview from "./Preview";
import AuthorCard from "./AuthorCard";

function Reader({id,bgColor, darkMode }) {
    if(!id)throw 'invalid used:Reader';
    return (
        <TwoColLayout
            rightCol={6}
            LeftChild={() => (<div style={{backgroundColor: darkMode ? 'transparent' : bgColor }}>
                <BlogList data={[{ 'id': id }]} />
                <Preview viewed borderless articleId={id} readOnly={true} />
            </div>)}
            RightChild={() => (
            <AuthorCard id={1}/>)}
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
