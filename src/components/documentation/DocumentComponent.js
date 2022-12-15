import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 20px 0px;
  padding: 20px;
`;

const Container = styled.div`
  border: 2px ridge #194E41;
  border-radius: 10px;
  background-color: #e3e4e6;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  padding-top: 20px;
  font-size: 1.3rem;
  flex-grow: 1;
`;

const RenderComponent = styled.div`
  padding: 25px;
  display: flex;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  align-content: center;
  flex-grow: 1;
`;

const Documentation = styled.table``;

const DocumentComponent = ({ title, component, propDocs }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Container>
        <RenderComponent>{component}</RenderComponent>
        <Documentation>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Description</th>
              <th>Type</th>
              <th>Default value</th>
            </tr>
          </thead>
          <tbody>
            {propDocs.map((doc, index) => {
              return (
                <tr key={index}>
                  <td>{doc.prop}</td>
                  <td>{doc.description}</td>
                  <td>{doc.type}</td>
                  <td>
                    <code>{doc.defaultValue}</code>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Documentation>
      </Container>
    </Wrapper>
  );
};

export default DocumentComponent;
