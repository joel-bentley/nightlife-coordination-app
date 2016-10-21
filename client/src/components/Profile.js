import React from 'react'
import { Col, Table } from 'react-bootstrap'

const Profile = ({ id, username, displayName, publicRepos }) => (
  <Col md={6} mdOffset={3} sm={8} smOffset={2}>
    <img src="/img/gh-mark-32px.png" alt="github logo"/>
    <div className="text-left">
      <Table striped bordered hover responsive>
        <tbody>
          <tr>
            <td>ID:</td>
            <td>{id}</td>
          </tr>
          <tr>
            <td>Username:</td>
            <td>{username}</td>
          </tr>
          <tr>
            <td>Display Name:</td>
            <td>{displayName}</td>
          </tr>
          <tr>
            <td>Repositories:</td>
            <td>{publicRepos}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </Col>
)

export default Profile
