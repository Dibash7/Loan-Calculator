import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { fontSize } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

const Input = props => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: 0
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  // const inputStyle = {
  //   display: "flex",
  //   flexDirection: "row"
  // };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="standard-name"
        label={props.inputLabel}
        className={classes.textField}
        value={props.value}
        onChange={handleChange("name")}
        margin="normal"
      />
    </form>
  );
};

export default Input;
