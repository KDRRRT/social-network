import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="yo" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("yo");
  });
  test("status's type should be span", async () => {
    const component = create(<ProfileStatus status="yo" />);
    const root = component.root;
    let span = await root.findByType("span");
    expect(span).not.toBeNull();
  });
  test("status's type changes", async () => {
    const component = create(<ProfileStatus status="yo" />);
    const root = component.root;
    let span = await root.findByType("span");
    span.props.onDoubleClick();
    let input = await root.findByType("input");
    expect(input.props.value).toBe("yo");
  });
});
