import React from 'react'
import { Row, Col } from 'react-bootstrap'

const Title = props =>
  <Row>
    <Col className={"mt-3 mb-4 " + props.className} xs={props.xs} sm={props.sm} md={props.md} lg={props.lg}>
      <h1 className="title">{props.children}</h1>
    </Col>
  </Row>

export default Title;