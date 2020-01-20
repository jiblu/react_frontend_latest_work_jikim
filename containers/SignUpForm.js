import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Typography, Button, Link, TextField } from '@material-ui/core'
import CustomInputField from '../components/CustomInputField'
import validateFields from '../components/validateFields'
import createAdvertiserPostObject from '../components/createAdvertiserPostObject'
import { connect } from 'react-redux'
import { newAdvertiser } from '../../actions/advertiserActions'

const margin = 100

const styles = theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: '100px auto',
      width: '400px',
      // width: `calc(100vw - ${margin * 2}px)`,
      backgroundColor: '#e3e3e3',
      borderRadius: '2px'
    }
  },
  content: {
    margin: '20px auto',
    maxWidth: '200px'
  },
  title: {
    textAlign: 'left',
    margin: '40px 0 0 0 '
  },
  button: {
    margin: '20px 0 0 0'
  }
})

const txtFieldState = {
  value: null,
  valid: false,
  errMsg: null,
  type: null
}

class SignUpForm extends Component {
  state = {
    enableSubmit: false,
    username: {
      ...txtFieldState,
      fieldName: 'Username',
      required: true,
      type: 'email',
      dbKey: 'contact_email'
    },
    password: {
      ...txtFieldState,
      fieldName: 'Password',
      required: true,
      type: 'password',
      // storing to firebase
    },
    confirm_password: {
      ...txtFieldState,
      fieldName: 'Confirm Password',
      required: true,
      type: 'password2',
      // storing to firebase
    },
    first_name: {
      ...txtFieldState,
      fieldName: 'First Name',
      required: true,
      // generated later
    },
    last_name: {
      ...txtFieldState,
      fieldName: 'Last Name',
      required: true,
      // generated later
    },
    phone_number: {
      ...txtFieldState,
      fieldName: 'Phone Number',
      required: true,
      type: 'phone',
      dbKey: 'phone1'
    },
    business_name: {
      ...txtFieldState,
      fieldName: 'Business Name',
      required: true,
      dbKey: 'name'
    },
    business_address: {
      ...txtFieldState,
      fieldName: 'Business Address',
      required: true,
      dbKey: 'address1'
    },
    business_suite_number: {
      ...txtFieldState,
      fieldName: 'Business Suite Number',
      required: false,
      dbKey: 'address2'
    },
    business_city: {
      ...txtFieldState,
      fieldName: 'Business City',
      required: false,
      dbKey: 'city'
    },
    business_state: {
      ...txtFieldState,
      fieldName: 'Business State',
      required: false,
      dbKey: 'state'
    },
    business_zip: {
      ...txtFieldState,
      fieldName: 'Business Zip',
      required: false,
      dbKey: 'zip'
    },
    business_category: {
      ...txtFieldState,
      fieldName: 'Business Category',
      required: true,
      dbKey: 'business_category'
    }
  }

  handleChange(e) {
    const { id, value } = e.target
    const prevState = this.state[id]
    const validation = validateField(id, value, prevState)
    this.setState({
      [id]: {
        ...prevState,
        value: value,
        valid: validation.valid,
        errMsg: validation.errMsg
      }
    }, () => this.checkAllFields(id))
  }

  checkAllFields(id) {
    let fields = Object.keys(this.state).filter(k => k!== 'enableSubmit')
    let invalidCount = 0
    for (let k in fields){
      let field = fields[k]
      let { valid, required } = this.state[field]
      if (required && !valid) {
        invalidCount++
      }
    }
    if(invalidCount === 0) {
      this.setState({
        enableSubmit: true
      })
    }
  }

  handleSubmit(e) {
    const postData = createAdvertiserPostObject(this.state)
    this.props.newAdvertiser(postData)
  }
        
  render () {
    const { classes } = this.props
    const generateFields = (fieldGroupName, fieldNames) => {
      const fields = fieldNames.map((id, i) => {
        const { fieldName, required, valid, errMsg } = this.state[id]
        return (
          <CustomInputField
            fieldLabel={fieldName}
            required={required}
            helperText={this.state[id].errMsg}
            onChangeHandler={this.handleChange.bind(this)}
          />
          )
        })
        return (
          <div>
          <Typography
            variant='subtitle1'
            className={classes.title}
            >
            {fieldGroupName}
          </Typography>
          {fields}
        </div>
      )
    }
    const accountInfo = ['username', 'password', 'confirm_password']
    const AccountInfoFields = generateFields('Account Info', accountInfo)
    const personalInfo = ['first_name', 'last_name', 'phone_number']
    const PersonalInfoFields = generateFields('Personal Info', personalInfo)
    const businessInfo = ['business_name', 'business_address', 'business_suite_number','business_city',
    'business_state','business_zip','business_category']
    const BusinessInfoFields = generateFields('Business Info', businessInfo)

    return (
      <div className={classes.root}>
        <Paper elevation={1}>
          <div className={classes.content}>
            {AccountInfoFields}
            {PersonalInfoFields}
            {BusinessInfoFields}
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              disabled={!this.state.enableSubmit}
              onClick={this.handleSubmit.bind(this)}
            >
              SIGN UP
            </Button>
            <Typography variant='subtitle1'>
              Already a member?
            </Typography>
            <Link>
              Sign in now
            </Link>
          </div>
        </Paper>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({ advertiser: state.r_advertiser.advertiser })
const mapDispatchToProps = { newAdvertiser }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUpForm))