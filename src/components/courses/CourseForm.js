import React from "react";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import PropTypes from "prop-types";

function CourseForm({
    onSave,
    onChange,
    course,
    errors,
    authors,
    saving
}) {
    return (
        <div className="container">
            <h2>{course.id ? "Edit" : "Add"} Course</h2>
            <form onSubmit={onSave}>
                <TextInput
                    id="title"
                    name="title"
                    label="Title"
                    onChange={onChange}
                    value={course.title}
                    error={errors.title}
                />
                <SelectInput 
                    id="authorId"
                    name="authorId"
                    label="Author"
                    onChange={onChange}
                    value={course.authorId || ""}
                    defaultOption="Select Author"
                    options={authors.map(author => ({
                        value: author.id,
                        text: author.name
                    }))}
                    error={errors.author}
                />
                <TextInput
                    id="category"
                    name="category"
                    label="Category"
                    onChange={onChange}
                    value={course.category}
                    error={errors.category}
                />
                <button type="submit" disabled={saving} className="btn btn-primary">
                    {saving ? "Saving..." : "Save"}
                </button>
            </form>
        </div>
    )
}

CourseForm.propTypes = {
    authors: PropTypes.array.isRequired,
    saving: PropTypes.bool,
    course: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object
}

CourseForm.defaultProps = {
    errors: {}
}

export default CourseForm;