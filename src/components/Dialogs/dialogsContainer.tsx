import Dialogs from "./Dialogs.tsx";
import {
  actions

} from "../../redux/dialogsReduser.ts";

import { connect } from "react-redux";

import { withAuthRedirect } from "../../hoc/withAuthRedirect.tsx";
import { compose } from "redux";
import { AppStateType } from "../../redux/reduxStore.ts";

function mapStateToProps(state:AppStateType) {
  return {
    dialogsPage: state.dialogsPage,
  };
}



export default compose<React.ComponentType>(
  connect(mapStateToProps, {...actions}),
  withAuthRedirect
)(Dialogs);
