import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { Button, CssBaseline, TextField } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from "react-redux";
import useStyles from '../../style';
import InputAdornment from '@material-ui/core/InputAdornment';
import { IconKey } from '@tabler/icons';
import { showInfoSnackbar } from "../../../actions/snackbar";
import { updateUserMain } from '../../../actions/user';
import { USER_TRANSLATIONS_DEFAULT, WINDOW_GLOBAL } from '../../../constants';
import "./UserLogin.css";

const UserLoginWithQualtricsId = () => {
  let history = useHistory();
  const [qualtricsId, setQualtricsId] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoggedInUser, translations } = useSelector(state => state.userAuth);
  const { accessCode } = useParams();

  useEffect(() => {
    if (!isLoggedInUser) return <Redirect to="/" />;
    window.onbeforeunload = function() {
      return WINDOW_GLOBAL.RELOAD_ALERT_MESSAGE;
    };
  }, []);

  const checkValidity = (id) => {
    if (id && id.length === 6 && Number(id)) return true;
    else return false;
  }

  useEffect(() => {
    console.log("*** Hacking Goes Here***")
    const urlString = window.location.href
    let paramString = "?" + urlString.split('?')[1]
    let queryString = new URLSearchParams(paramString);
    const param_vals = []
    for (let pair of queryString.entries()) {
      param_vals.push(pair[1])
    }
    let user_id
    if (param_vals.length > 5){
      user_id = param_vals[5]
      console.log(user_id)
      handleSubmitAuto(user_id)
    }
    console.log("*** Hacking Goes Here***")
  }, []);

  const handleSubmitAuto = async (user_id) => {
    if (checkValidity(user_id)) {
      // send the username and password to the server
      const qualCode = Number(user_id);
      try {
        await dispatch(updateUserMain({ qualtricsId: qualCode }));
        history.push(`/${accessCode}/user-response` + "?" + ((window.location.href).split('?')[1]));
      } catch (error) {
        // history.push("/");
      }
    } else {
      dispatch(showInfoSnackbar((translations?.incorrect_access_code_or_participant_id) || USER_TRANSLATIONS_DEFAULT.INCORRECT_ACCESS_LOGIN_CODES));
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (checkValidity(qualtricsId)) {
      // send the username and password to the server
      const qualCode = Number(qualtricsId);
      try {
        await dispatch(updateUserMain({ qualtricsId: qualCode }));
        history.push(`/${accessCode}/user-response` + "?" + ((window.location.href).split('?')[1]));
      } catch (error) {
        // history.push("/");
      }
    } else {
      dispatch(showInfoSnackbar((translations?.incorrect_access_code_or_participant_id) || USER_TRANSLATIONS_DEFAULT.INCORRECT_ACCESS_LOGIN_CODES));
    }
  };

  return (
    <>
    <Container component="main" maxWidth="xs" className={classes.centerCard}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name={USER_TRANSLATIONS_DEFAULT.PARTICIPANT_ID}
          label={(translations?.participant_id) || USER_TRANSLATIONS_DEFAULT.PARTICIPANT_ID}
          onChange={({ target }) => setQualtricsId(target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconKey />
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="primary"
          className={classes.submit}
        >
          {(translations?.login) || USER_TRANSLATIONS_DEFAULT.LOGIN}
        </Button>
      </form>
    </Container>
    </>
  );
};

export default UserLoginWithQualtricsId;