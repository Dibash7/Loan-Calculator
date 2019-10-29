import React from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Input from "./Input";
import { AppContext } from "../App";

const useStyles = makeStyles(theme => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
    padding: theme.spacing(3)
  },
  margin: {
    height: theme.spacing(3)
  }
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  const popperRef = React.useRef(null);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });

  return (
    <Tooltip
      PopperProps={{
        popperRef
      }}
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={value}
    >
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired
};

const PrettoSlider = withStyles({
  root: {
    color: "#4caf50",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

const CustomSlider = props => {
  const classes = useStyles();

  const inputStyle = {
    display: "flex",
    flexDirection: "row",
    margin: "0 20px"
  };

  return (
    <AppContext.Consumer>
      {context => {
        return (
          <Paper className={classes.root} style={{ margin: "5vh 5vw" }}>
            <PrettoSlider
              max={props.propName === "loan" ? 5000 : 24}
              min={props.propName === "loan" ? 500 : 6}
              step={1}
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              value={context[props.propName]}
              onChangeCommitted={(e, value) => {
                context.handleUpdateState(props.propName, value);
              }}
              onChange={(e, value) => {
                context.handleUpdateState(props.propName, value);
              }}
            />
            <div className={classes.margin} />
            <div style={inputStyle}>
              <Input
                value={context[props.propName]}
                inputLabel={props.text}
                style={{ fontWeight: "bold", fontSize: "2.5em" }}
              />
            </div>
          </Paper>
        );
      }}
    </AppContext.Consumer>
  );
};

export default CustomSlider;
