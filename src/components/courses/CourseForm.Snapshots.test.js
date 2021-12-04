import React from "react";
import CourseForm from "./CourseForm";
import renderer from "react-test-renderer";
import { courses, authors } from "../../../tools/mockData";

it("Sets submit button label 'Savings...' when saving is true", () => {
    const tree = renderer.create(
        <CourseForm 
            course={courses[0]}
            authors={authors}
            onChange={jest.fn()}
            onSave={jest.fn()}
            saving
        />
    )

    expect(tree).toMatchSnapshot();
})

it("Sets submit button label 'Save' when saving is false", () => {
    const tree = renderer.create(
        <CourseForm 
            course={courses[0]}
            authors={authors}
            onChange={jest.fn()}
            onSave={jest.fn()}
            saving={false}
        />
    )

    expect(tree).toMatchSnapshot();
})