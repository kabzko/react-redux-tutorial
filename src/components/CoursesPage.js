import React, { useState, useEffect } from "react";
import CourseList from "../components/CourseList";
import courseStore from "../stores/courseStore";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";
import * as ReduxcourseActions from "../redux/actions/courseActions";
import * as ReduxauthorActions from "../redux/actions/authorActions";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

function CoursePage(props) {

    useEffect(() => {
        if (props.courses.length === 0) {
            props.actions.loadCourses().catch(() => {
                alert("Something went wrong. Please try again");
            })
        }
        if (props.authors.length === 0) {
            props.actions.loadAuthors().catch(() => {
                alert("Something went wrong. Please try again");
            })
        }
    }, [])

    function deleteSpecificCourse(id) {
        deleteCourse(id).then(() => {
            toast.success("Course deleted.");
        })
    }

    return (
        <div className="container">
            <h2>Course Page</h2>
            <Link className="btn btn-primary" to="/course">
                Add Course
            </Link>
            <CourseList courses={props.courses} deleteCourse={deleteSpecificCourse} />
        </div>
    )
}

CourseList.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return { 
        courses: 
            state.authors.length === 0 
            ? [] 
            : state.courses.map(course => {
                return {
                    ...course,
                    authorName: state.authors.find(author => author.id === course.authorId).name
                }
            }),
        authors: state.authors,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(ReduxcourseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(ReduxauthorActions.loadAuthors, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);