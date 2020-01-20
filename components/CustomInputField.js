import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import { Paper, Typography, Button, Link, TextField } from '@material-ui/core'

const styles = theme => ({
  input: {
    width: '200px',
    backgroundColor: 'white',
    fontSize: '12px'
  },
  inputLabel: {
    fontSize: '12px'
  }
})

class CustomInputField extends Component {
  render () {
    const { classes } = this.props
    const id = this.props.fieldLabel.replace(/ /g, '_').toLowerCase()
    return (
      <TextField
        InputProps={{ className: classes.input }}
        InputLabelProps={{ className: classes.inputLabel }}
        label={this.props.fieldLabel}
        id={id} // change to all lowercase and replace space with underscore
        type={this.props.type} autoFocus
        variant='filled'
        size='small'
        onChange={this.props.onChangeHandler}
        required={this.props.required}
        helperText={this.props.helperText}
      />
    )
  }
}

export default withStyles(styles)(CustomInputField)