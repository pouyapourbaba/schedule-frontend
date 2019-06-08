import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../services/userService";
import styles from "../styles/sidebar.module.css";

class SideBar extends Component {
  state = { user: { first_name: "", last_name: "", email: "" } };

  async componentDidMount() {
    // if (this.props.match.params.user_id === undefined) return;
    let user_id;
    if (this.props.user_id === undefined) return null;
    else user_id = this.props.user_id;

    try {
      let user = await getUser(user_id);
      user = user.data;
      this.setState({ user });
    } catch (ex) {
      console.log(ex.message);
    }
  }
  render() {
    return (
      <nav className={styles["sidebar"]}>
        <NavLink
          className={styles["sidebar-item"]}
          activeClassName={styles["active-item"]}
          to="/"
          exact={true}
        >
          <i className="fa fa-home" aria-hidden="true" />{" "}
          <span className={styles["nav-title"]}>Home</span>
        </NavLink>
        <NavLink
          className={styles["sidebar-item"]}
          activeClassName={styles["active-item"]}
          to={`/dashboard/${this.props.user_id}`}
        >
          <i className="fa fa-tachometer" aria-hidden="true" />{" "}
          <span className={styles["nav-title"]}>Dashboard</span>
        </NavLink>
        <NavLink
          className={styles["sidebar-item"]}
          activeClassName={styles["active-item"]}
          to={`/timetracker/${this.props.user_id}`}
        >
          <i className="fa fa-hourglass-start" aria-hidden="true" />{" "}
          <span className={styles["nav-title"]}>TimeTracker</span>
        </NavLink>
        <NavLink
          className={styles["sidebar-item"]}
          activeClassName={styles["active-item"]}
          to={`/todos/${this.props.user_id}`}
        >
          <i className="fa fa-tasks" aria-hidden="true" />{" "}
          <span className={styles["nav-title"]}>Objectives</span>
        </NavLink>
        <NavLink
          className={styles["sidebar-item"]}
          activeClassName={styles["active-item"]}
          to={`/profile/${this.props.user_id}`}
        >
          <i className="fa fa-user-circle-o" aria-hidden="true" />{" "}
          <span className={styles["nav-title"]}>Profile</span>
        </NavLink>
      </nav>
    );
  }

  // render() {
  //   return (
  //     <nav className={styles["sidebar"]}>
  //       <ul>
  //         <li>
  //           <NavLink className={styles["sidebar-item"]} activeClassName={styles["active-item"]} to="/" exact={true}>
  //             <i className="fa fa-home" aria-hidden="true" /> Home
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink
  //             className={styles["sidebar-item"]}
  //             to={`/dashboard/${this.props.user_id}`}
  //           >
  //             <i className="fa fa-tachometer" aria-hidden="true" /> Dashboard
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink
  //             className={styles["sidebar-item"]}
  //             to={`/timetracker/${this.props.user_id}`}
  //           >
  //             <i className="fa fa-hourglass-start" aria-hidden="true" />{" "}
  //             TimeTracker
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink className={styles["sidebar-item"]}  to={`/todos/${this.props.user_id}`}>
  //             <i className="fa fa-tasks" aria-hidden="true" /> Objectives
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink
  //             className={styles["sidebar-item"]}
  //             to={`/profile/${this.props.user_id}`}
  //           >
  //             <i className="fa fa-user-circle-o" aria-hidden="true" /> Profile
  //           </NavLink>
  //         </li>
  //       </ul>
  //       {/* </div> */}
  //     </nav>
  //   );
  // }
}

export default SideBar;
