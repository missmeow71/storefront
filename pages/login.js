
import Router from 'next/router'
import {Header, Form, Input, Button, Segment} from 'semantic-ui-react'
import Layout from '../components/layout'
import {login} from '../lib/moltin'


export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    loading: false
  }

  _handleSubmit = async e => {
    e.preventDefault()

    const {email, password} = this.state

    this.setState({
      loading: true
    })

      try {
        const {token} = await login({email, password})

        localStorage.setItem('customerToken', token)

        Router.push('/myaccount')
      } catch (e) {
        console.log(e);

        this.setState({
          loading: false
        })
      }
    }

  _handleChange = ({target: {name, value} }) =>
    this.setState({
      [name]: value
    })

  render () {
    const {loading} = this.state

    return (
      <Layout title="Login">
        <Header as='h1'>Please log in to your account</Header>

        <Form onSubmit={this._handleSubmit} loading={loading}>
          <Segment>

            <Form.Field>
              <label>Email</label>
              <Input
                fluid
                name='email'
                type="email"
                autoFocus
                onChange={e => this._handleChange(e)}
                />
            </Form.Field>

            <Form.Field>
              <label>Password</label>
              <Input
                fluid
                name='password'
                type='password'
                onChange={e => this._handleChange(e)}
                />
            </Form.Field>
            <Button type='submit' color='black'>
              Login
            </Button>

          </Segment>
        </Form>
      </Layout>
    )
  }
}