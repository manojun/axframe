import * as React from "react";
import styled from "@emotion/styled";
import { useProjectController } from "@controller/pages/ProjectController";
import { mergeProps } from "utils/object";

interface Props {}

function PageProject(props: Props) {
  const { pageModel } = mergeProps(props, useProjectController());

  return (
    <ProjectPageContainer>
      <h1>ProjectPage</h1>
      <p>{pageModel.path}</p>
      <b>{pageModel.label}</b>
    </ProjectPageContainer>
  );
}

const ProjectPageContainer = styled.div``;

export default PageProject;
